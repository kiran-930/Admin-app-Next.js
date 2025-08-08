// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  registrationDate: string;
  lastLogin?: string;
  gender?: string;
  prefecture?: string;
}

// Authentication types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SetPasswordData {
  email: string;
  password: string;
}



export interface RegisteredUser {
  email: string;
  password: string;
  registeredAt: string;
  passwordResetAt?: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface NewPasswordData {
  password: string;
  confirmPassword: string;
  token: string;
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newRegistrations: number;
  monthlyGrowth: number;
  userGrowthPercentage: number;
  activeUserPercentage: number;
  registrationPercentage: number;
  growthPercentage: number;
}

export interface ChartData {
  month: string;
  users: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
}
