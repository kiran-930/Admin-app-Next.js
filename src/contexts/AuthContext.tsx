'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, LoginCredentials, SetPasswordData, RegisteredUser } from '@/types';
import { STORAGE_KEYS, ROUTES } from '@/lib/constants';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  register: (data: SetPasswordData) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (data: { email: string; password: string; confirmPassword: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isUserRegistered: (email: string) => boolean;
  hasRegisteredUsers: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored authentication on mount
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      }
    }
    
    setIsLoading(false);
  }, []);

  // Helper functions for localStorage operations
  const getRegisteredUsers = (): RegisteredUser[] => {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error parsing registered users:', error);
      return [];
    }
  };

  const saveRegisteredUsers = (users: RegisteredUser[]) => {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
  };

  const isUserRegistered = (email: string): boolean => {
    const users = getRegisteredUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  };

  const hasRegisteredUsers = (): boolean => {
    const users = getRegisteredUsers();
    return users.length > 0;
  };



  const register = async (data: SetPasswordData): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      if (isUserRegistered(data.email)) {
        setIsLoading(false);
        return { success: false, message: 'このメールアドレスは既に登録されています' };
      }

      // Create new user
      const newUser: RegisteredUser = {
        email: data.email,
        password: data.password,
        registeredAt: new Date().toISOString()
      };

      // Save to localStorage
      const users = getRegisteredUsers();
      users.push(newUser);
      saveRegisteredUsers(users);

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'アカウントの作成に失敗しました' };
    }
  };

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user is registered
      const users = getRegisteredUsers();
      const user = users.find(u =>
        u.email.toLowerCase() === credentials.email.toLowerCase() &&
        u.password === credentials.password
      );

      if (user) {
        const authToken = 'mock-jwt-token';
        const authUser: AuthUser = {
          id: '1',
          email: user.email,
          name: user.email.split('@')[0],
          role: '管理者'
        };

        // Store authentication data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(authUser));

        setUser(authUser);
        setIsLoading(false);

        return { success: true };
      } else {
        setIsLoading(false);
        if (!isUserRegistered(credentials.email)) {
          return { success: false, message: 'このメールアドレスは登録されていません' };
        } else {
          return { success: false, message: 'パスワードが正しくありません' };
        }
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'ログインに失敗しました' };
    }
  };

  const resetPassword = async (data: { email: string; password: string; confirmPassword: string }): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists
      const users = getRegisteredUsers();
      const userIndex = users.findIndex(u => u.email.toLowerCase() === data.email.toLowerCase());

      if (userIndex === -1) {
        // User doesn't exist, create new user (registration)
        const newUser: RegisteredUser = {
          email: data.email,
          password: data.password,
          registeredAt: new Date().toISOString()
        };

        users.push(newUser);
        saveRegisteredUsers(users);

        setIsLoading(false);
        return { success: true };
      }

      const existingUser = users[userIndex];

      // Check if new password is same as old password
      if (existingUser.password === data.password) {
        setIsLoading(false);
        return { success: false, message: 'try new password' };
      }

      // Update user's password
      users[userIndex] = {
        ...existingUser,
        password: data.password,
        passwordResetAt: new Date().toISOString()
      };

      // Save updated users
      saveRegisteredUsers(users);

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'パスワードのリセットに失敗しました' };
    }
  };

  const logout = () => {
    // Clear stored authentication data
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);

    setUser(null);
    // Add a flag to indicate user just logged out
    sessionStorage.setItem('just_logged_out', 'true');
    router.push(ROUTES.SET_PASSWORD);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    resetPassword,
    logout,
    isAuthenticated: !!user,
    isUserRegistered,
    hasRegisteredUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
