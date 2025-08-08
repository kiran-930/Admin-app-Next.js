'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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

// Reset password schema with all three fields
const resetPasswordSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
  confirmPassword: z.string().min(1, 'パスワード確認を入力してください'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
});

type ResetPasswordFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
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

      console.log('Password is valid, proceeding with reset');

      // Call the resetPassword function from AuthContext
      const result = await resetPassword(data);

      if (result.success) {
        toast.success('アカウントが設定されました');
        router.push(ROUTES.LOGIN);
      } else {
        toast.error(result.message || 'アカウントの設定に失敗しました');
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
      toast.error('パスワードのリセットに失敗しました');
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
            アカウント設定
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            メールアドレスとパスワードを入力してください。<br />
            新規登録またはパスワードリセットができます。
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
                  新しいパスワード
                </label>
                <input
                  type="password"
                  placeholder="新しいパスワードを入力"
                  {...register('password')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  パスワード確認 (confirm password)
                </label>
                <input
                  type="password"
                  placeholder="パスワードを再入力"
                  {...register('confirmPassword')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              設定
            </Button>
          </form>


        </div>
      </div>
    </div>
  );
}
