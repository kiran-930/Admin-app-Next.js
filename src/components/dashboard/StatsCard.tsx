import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  period?: string;
}

export function StatsCard({ title, value, subtitle, trend, period }: StatsCardProps) {
  return (
    <Card className="p-6">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {period && (
            <div className="text-right">
              <p className="text-xs text-gray-500">{period}</p>
              {trend && (
                <div className="flex items-center mt-1">
                  <span
                    className={`text-sm font-medium ${
                      trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {trend.isPositive ? '+' : ''}{trend.value}%
                  </span>
                  <svg
                    className={`ml-1 h-3 w-3 ${
                      trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {trend.isPositive ? (
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
