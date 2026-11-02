import { AppProgress, UserAnswerState } from '../types';

const STORAGE_KEY = 'fikibima_polinomial_masterclass_v1';

export const DEFAULT_PROGRESS: AppProgress = {
  currentQuestionIndex: 0,
  answers: {},
  lastActiveTab: 'beranda',
  totalTimeSpentSeconds: 0,
  lastUpdated: new Date().toISOString(),
};

export function loadProgress(): AppProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      answers: parsed.answers || {},
    };
  } catch (err) {
    console.error('Failed to load progress from localStorage', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: AppProgress): void {
  try {
    const updated = {
      ...progress,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

export function updateAnswerInStorage(
  questionId: number,
  updater: (prev?: UserAnswerState) => UserAnswerState
): AppProgress {
  const current = loadProgress();
  const prev = current.answers[questionId];
  current.answers[questionId] = updater(prev);
  saveProgress(current);
  return current;
}

export function resetAllProgress(): AppProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear localStorage', err);
  }
  return { ...DEFAULT_PROGRESS };
}
