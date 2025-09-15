
// Local storage utility functions for Aptitude Genie game

// Keys used for storing data
const STORAGE_KEYS = {
  THEME: 'aptitude-genie-theme',
  USER: 'aptitude-genie-user',
  RESULTS_PREFIX: 'aptitude-genie-results-',
};

// Type definitions
export interface StoredUser {
  id: string;
  email: string;
  name: string;
  points: number;
  level: number;
  streakDays: number;
  lastPlayed: string | null;
}

export interface StoredGameResult {
  date: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  accuracy: number;
}

// Theme functions
export function getStoredTheme(): 'light' | 'dark' | null {
  return localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark' | null;
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

// User functions
export function getStoredUser(): StoredUser | null {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
}

export function setStoredUser(user: StoredUser): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function removeStoredUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

// Game results functions
export function getStoredResults(userId: string): StoredGameResult[] {
  const resultsKey = `${STORAGE_KEYS.RESULTS_PREFIX}${userId}`;
  const resultsData = localStorage.getItem(resultsKey);
  return resultsData ? JSON.parse(resultsData) : [];
}

export function setStoredResults(userId: string, results: StoredGameResult[]): void {
  const resultsKey = `${STORAGE_KEYS.RESULTS_PREFIX}${userId}`;
  localStorage.setItem(resultsKey, JSON.stringify(results));
}

// Helper functions
export function updateUserStreak(user: StoredUser): StoredUser {
  const today = new Date().toISOString().split('T')[0];
  const lastPlayed = user.lastPlayed;
  
  // If they've already played today, don't update
  if (lastPlayed === today) {
    return user;
  }
  
  // Check if they played yesterday for continuing streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDate = yesterday.toISOString().split('T')[0];
  
  const newStreakDays = lastPlayed === yesterdayDate ? user.streakDays + 1 : 1;
  
  return {
    ...user,
    lastPlayed: today,
    streakDays: newStreakDays
  };
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    if (key.includes('PREFIX')) {
      // For prefixed keys, we need to find all matching keys
      const keysToRemove = Object.keys(localStorage).filter(
        storageKey => storageKey.startsWith(key.replace('PREFIX', ''))
      );
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } else {
      localStorage.removeItem(key);
    }
  });
}
