import React from 'react';
import { APP_NAME } from '@/lib/constants';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: {
      container: 'text-base',
      iconSize: 'w-6 h-6',
      textSize: 'text-base',
      dotSize: 'w-0.5 h-0.5'
    },
    md: {
      container: 'text-lg',
      iconSize: 'w-7 h-7',
      textSize: 'text-lg',
      dotSize: 'w-1 h-1'
    },
    lg: {
      container: 'text-xl',
      iconSize: 'w-8 h-8',
      textSize: 'text-xl',
      dotSize: 'w-1 h-1'
    }
  };

  const currentSize = sizes[size];

  const imageSizes = {
    sm: 'h-6',
    md: 'h-7',
    lg: 'h-10'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt={APP_NAME}
        className={`${imageSizes[size]} w-auto`}
      />
    </div>
  );
}
