'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES, TOAST_MESSAGES } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    // Perform logout
    logout();
    toast.success(TOAST_MESSAGES.LOGOUT_SUCCESS);
    
    // Redirect to login after a short delay
    const timer = setTimeout(() => {
      router.push(ROUTES.LOGIN);
    }, 1000);

    return () => clearTimeout(timer);
  }, [logout, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">ログアウト中...</p>
      </div>
    </div>
  );
}
