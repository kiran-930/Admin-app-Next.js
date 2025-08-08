'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChartData } from '@/types';

interface UserChartProps {
  data: ChartData[];
}

export function UserChart({ data }: UserChartProps) {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">登録・利用状況</CardTitle>
        <p className="text-xs text-gray-600">2024年 • 12月 ▼</p>
      </CardHeader>
      <CardContent className="p-4">
        <div style={{ height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 30, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#666' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#666' }}
                domain={[0, 500]}
                ticks={[0, 100, 200, 300, 400, 500]}
              />
              <Bar
                dataKey="users"
                fill="#FF9500"
                radius={[2, 2, 0, 0]}
                maxBarSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center justify-start space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-sm"></div>
            <span className="text-gray-600">新規</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-400 rounded-sm"></div>
            <span className="text-gray-600">既存</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-300 rounded-sm"></div>
            <span className="text-gray-600">その他</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-200 rounded-sm"></div>
            <span className="text-gray-600">非アクティブ</span>
          </div>
        </div>
        <div className="mt-2 text-center">
          <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">530 × 237</span>
        </div>
      </CardContent>
    </Card>
  );
}
