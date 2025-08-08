'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { ROUTES, TOAST_MESSAGES } from '@/lib/constants';
import { validatePassword } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Set password schema
const setPasswordSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

type SetPasswordFormData = {
  email: string;
  password: string;
};

export default function SetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register: registerUser, hasRegisteredUsers, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
  });

  // Redirect existing users to login while keeping set-password in history
  useEffect(() => {
    // Check if user just logged out
    const justLoggedOut = sessionStorage.getItem('just_logged_out');

    if (justLoggedOut) {
      // Clear the flag and stay on set-password page
      sessionStorage.removeItem('just_logged_out');
      return;
    }

    // Check if user is coming from registration link
    const isRegistering = searchParams.get('register') === 'true';

    if (isRegistering) {
      // User wants to register, stay on set-password page
      return;
    }

    if (!authLoading && hasRegisteredUsers()) {
      // Add a small delay to ensure this page is in browser history
      setTimeout(() => {
        router.push(ROUTES.LOGIN);
      }, 100);
    }
  }, [authLoading, hasRegisteredUsers, router, searchParams]);

  const onSubmit = async (data: SetPasswordFormData) => {
    setIsSubmitting(true);

    try {
      console.log('Password being validated:', data.password);

      // Show password requirement alert
      const validation = validatePassword(data.password);
      console.log('Validation result:', validation);

      if (!validation.isValid) {
        console.log('Password is invalid, showing toast');
        toast.error('Password must be at least 8 characters long and contain uppercase letters, lowercase letters, and numbers');
        // Also show browser alert as backup
        alert('Password must be at least 8 characters long and contain uppercase letters, lowercase letters, and numbers');
        setIsSubmitting(false);
        return;
      }

      console.log('Password is valid, proceeding with registration');

      // Call the register function from AuthContext
      const result = await registerUser(data);

      if (result.success) {
        toast.success('アカウントが作成されました');
        router.push(ROUTES.LOGIN);
      } else {
        toast.error(result.message || 'アカウントの作成に失敗しました');
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
      toast.error('アカウントの作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <Logo size="md" />
      </header>

      {/* Main Content - Full Screen */}
      <div className="flex flex-col justify-center items-center px-6 min-h-[calc(100vh-80px)] bg-gray-50">
        <div className="w-full max-w-md text-center">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            パスワード設定
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            メールアドレスとパスワードを入力してください。<br />
            新しいアカウントを作成できます。
          </p>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  メールアドレス
                </label>
                <input
                  type="email"
                  placeholder="メールアドレスを入力"
                  {...register('email')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  パスワード
                </label>
                <input
                  type="password"
                  placeholder="パスワードを入力"
                  {...register('password')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              アカウント作成
            </Button>
          </form>

          {/* Back to Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              既にアカウントをお持ちの場合は{' '}
              <Link
                href={ROUTES.LOGIN}
                className="text-orange-600 hover:text-orange-500 font-medium"
              >
                ログインページへ戻る
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
