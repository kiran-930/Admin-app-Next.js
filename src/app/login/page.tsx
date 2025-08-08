'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES, TOAST_MESSAGES } from '@/lib/constants';
import { LoginCredentials } from '@/types';

const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, authLoading, router]);

  const onSubmit = async (data: LoginCredentials) => {
    setIsSubmitting(true);
    
    try {
      const result = await login(data);
      
      if (result.success) {
        toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
        router.push(ROUTES.DASHBOARD);
      } else {
        toast.error(result.message || TOAST_MESSAGES.LOGIN_ERROR);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.LOGIN_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

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
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            ログイン
          </h1>
          {/* Form Fields */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  メールアドレス
                </label>
                <input
                  type="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
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
              ログイン
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href={ROUTES.RESET_PASSWORD}
              className="text-sm text-orange-600 hover:text-orange-500"
            >
              パスワードをお忘れの場合 (reset password)
            </Link>
          </div>

          {/* Registration link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              アカウントをお持ちでない場合は{' '}
              <Link
                href={`${ROUTES.SET_PASSWORD}?register=true`}
                className="text-orange-600 hover:text-orange-500 font-medium"
              >
                こちらから登録
              </Link>
              {' '}(register now)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
