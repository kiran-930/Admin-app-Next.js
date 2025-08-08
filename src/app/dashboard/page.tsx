'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { UserChart } from '@/components/dashboard/UserChart';
import { mockDashboardStats, mockChartData } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const currentDate = formatDate(new Date());

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col min-h-0">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-4 flex-shrink-0">
          <StatsCard
            title="ユーザー登録者数"
            value="450人"
            subtitle="400人（前月比較）"
            trend={{
              value: 12.5,
              isPositive: true
            }}
            period="2024年12月 • 2024年01月"
          />

          <StatsCard
            title="アクティブユーザー"
            value="50人/月"
            subtitle="45人（前月比較）"
            trend={{
              value: 11.1,
              isPositive: true
            }}
            period="2024年12月 • 2024年01月"
          />

          <StatsCard
            title="新規登録"
            value="10人/月"
            subtitle="12人（前月比較）"
            trend={{
              value: -16.7,
              isPositive: false
            }}
            period="2024年12月 • 2024年01月"
          />

          <StatsCard
            title="平均成長率"
            value="4人/月"
            subtitle="2人（前月比較）"
            trend={{
              value: 100,
              isPositive: true
            }}
            period="2024年12月 • 2024年01月"
          />
        </div>

        {/* Chart and Additional Stats */}
        <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
          {/* Chart - spans 2 columns */}
          <div className="col-span-2">
            <UserChart data={mockChartData} />
          </div>

          {/* Additional Stats - Right column */}
          <div className="space-y-4">
            {/* 総利用回数 */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">総利用回数</h3>
              <div className="text-xs text-gray-500 mb-2">2024年01月 • 2024年04月</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">125<span className="text-sm font-normal">回/月</span></div>
              <div className="text-xs text-gray-500">63回（前月比の合計数）</div>
              <div className="text-xs text-green-600 font-medium">+47%</div>
            </div>

            {/* アカウント新規数 */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">アカウント新規数</h3>
              <div className="text-xs text-gray-500 mb-2">2024年01月 • 2024年04月</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">10<span className="text-sm font-normal">人/月</span></div>
              <div className="text-xs text-gray-500">8人（前月比の合計数）</div>
              <div className="text-xs text-green-600 font-medium">+25%</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
