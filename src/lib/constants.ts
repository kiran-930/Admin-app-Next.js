// App constants
export const APP_NAME = 'ルックミール';
export const APP_LOGO = '🍽️';
export const APP_LOGO_NEW = '🍽️';

// Routes
export const ROUTES = {
  LOGIN: '/login',
  SET_PASSWORD: '/set-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  LOGOUT: '/logout'
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REGISTERED_USERS: 'registered_users'
} as const;

// API endpoints (mock)
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  SET_PASSWORD: '/api/auth/set-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  USERS: '/api/users',
  DASHBOARD_STATS: '/api/dashboard/stats'
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
} as const;

// Toast messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'ログインしました',
  LOGIN_ERROR: 'ログインに失敗しました',
  LOGIN_ERROR_NOT_REGISTERED: 'このメールアドレスは登録されていません',
  LOGOUT_SUCCESS: 'ログアウトしました',
  PASSWORD_SET_SUCCESS: 'パスワードが設定されました',
  PASSWORD_SET_ERROR: 'パスワードの設定に失敗しました',
  REGISTRATION_SUCCESS: 'アカウントが作成されました',
  REGISTRATION_ERROR: 'アカウントの作成に失敗しました',
  PASSWORD_RESET_SUCCESS: 'パスワードリセットメールを送信しました',
  PASSWORD_RESET_ERROR: 'パスワードリセットに失敗しました',
  GENERIC_ERROR: 'エラーが発生しました'
} as const;
