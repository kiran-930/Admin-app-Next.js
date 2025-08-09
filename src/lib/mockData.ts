import { User, DashboardStats, ChartData } from '@/types';

// Generate mock user data (5000 users to match your image)
const generateMockUsers = (): User[] => {
  const users: User[] = [];
  const names = ['ゆうと', 'ニックネーム太郎1文字', 'わんこ好き', 'はるかぜ', 'あおい', 'ポンたろう', 'まさやん', 'なっこ', 'ひなたぽん', 'ひまわりさん'];
  const domains = ['@example.com', '@example.net', '@gmail.com', '@yahoo.co.jp', '@outlook.com', '@example.org', '@example.jp'];
  const roles = ['管理者', '会員'];
  const statuses = ['active', 'inactive'] as const;
  const genders = ['男性', '女性', 'その他'];
  const prefectures = ['東京都', '大阪府', '愛知県', '神奈川県', '埼玉県', '千葉県', '兵庫県', '北海道', '福岡県', '静岡県'];

  for (let i = 1; i <= 5000; i++) {
    const nameIndex = (i - 1) % names.length;
    const domainIndex = (i - 1) % domains.length;
    const roleIndex = Math.floor(Math.random() * roles.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const genderIndex = Math.floor(Math.random() * genders.length);
    const prefIndex = Math.floor(Math.random() * prefectures.length);

    // Generate registration date (1992-2024)
    const year = 1992 + Math.floor(Math.random() * 33);
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;

    users.push({
      id: i.toString().padStart(2, '0'),
      name: `${names[nameIndex]}${i > 10 ? i : ''}`,
      email: `${names[nameIndex].toLowerCase()}${i}${domains[domainIndex]}`,
      role: roles[roleIndex],
      status: statuses[statusIndex],
      registrationDate: `${year}年 ${month}月`,
      lastLogin: Math.random() > 0.3 ? '2024年 01月 12日' : undefined,
      gender: genders[genderIndex],
      prefecture: prefectures[prefIndex]
    });
  }

  return users;
};

export const mockUsers: User[] = generateMockUsers();

// Mock dashboard statistics
export const mockDashboardStats: DashboardStats = {
  totalUsers: 450,
  activeUsers: 50,
  newRegistrations: 10,
  monthlyGrowth: 4,
  userGrowthPercentage: 12.5,
  activeUserPercentage: 11.1,
  registrationPercentage: -5.6,
  growthPercentage: 12.5
};

// Mock chart data
export const mockChartData: ChartData[] = [
  { month: '1月', users: 120 },
  { month: '2月', users: 180 },
  { month: '3月', users: 250 },
  { month: '4月', users: 320 },
  { month: '5月', users: 380 },
  { month: '6月', users: 420 },
  { month: '7月', users: 450 },
  { month: '8月', users: 380 },
  { month: '9月', users: 320 },
  { month: '10月', users: 280 },
  { month: '11月', users: 240 },
  { month: '12月', users: 200 }
];

// Mock authentication
export const mockAuthUser = {
  id: '1',
  email: 'admin@example.com',
  name: '管理者',
  role: '管理者'
};
