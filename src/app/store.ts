import { create } from 'zustand';
import type { ConnectionState, PendingQuery } from '../domain/query';
import type { PackDownloadState } from '../domain/pack';
import { localPackStore } from '../services/localPackStore';
import { analytics } from '../services/analytics';
import {
  migrateSelectedVibes,
  buildProfileFromVibes,
} from '../data/travelVibes';

export interface TravelProfile {
  type: string;
  badge: string;
  tagline: string;
  description: string;
  matched_tags: string[];
  recommended_plan_id: string;
  usage_habits?: string[];
}

const STORAGE_KEY_CONNECTION = 'chic_connection_state';
const STORAGE_KEY_SELECTED_VIBES = 'chic_selected_vibes';
const STORAGE_KEY_USAGE_HABITS = 'chic_usage_habits';

function getInitialConnectionState(): ConnectionState {
  if (typeof window === 'undefined') return 'online';
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONNECTION);
    if (saved === 'offline') return 'offline';
    if (saved === 'online') return 'online';
    if (saved === 'poor_connection') {
      // 弱網遷移原則：若持久化資料保存了弱網狀態，遷移為依目前實際連線狀態判斷
      const migrated = window.navigator?.onLine ? 'online' : 'offline';
      localStorage.setItem(STORAGE_KEY_CONNECTION, migrated);
      return migrated;
    }
  } catch (e) {
    console.warn('Failed to read connection state from localStorage', e);
  }
  return 'online';
}

function getInitialSelectedVibes(): string[] {
  if (typeof window === 'undefined') return ['cafe_culture'];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SELECTED_VIBES);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const migrated = migrateSelectedVibes(parsed);
        if (migrated.length > 0) return migrated;
      } catch {
        const migrated = migrateSelectedVibes(raw);
        if (migrated.length > 0) return migrated;
      }
    }
  } catch (e) {
    console.warn('Failed to read selected vibes from localStorage', e);
  }
  return ['cafe_culture'];
}

function getInitialUsageHabits(): string[] {
  if (typeof window === 'undefined') return ['photo_map'];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USAGE_HABITS);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        if (typeof parsed === 'string') return [parsed];
      } catch {
        return [raw];
      }
    }
  } catch (e) {
    console.warn('Failed to read usage habits from localStorage', e);
  }
  return ['photo_map'];
}

interface AppState {
  // Connection state simulator (online or offline)
  connectionState: ConnectionState;
  setConnectionState: (state: ConnectionState) => void;

  // Travel Pack state
  packState: PackDownloadState;
  downloadPack: () => Promise<void>;
  resetPack: () => void;

  // Selected eSIM Plan
  selectedPlanId: string;
  setSelectedPlanId: (planId: string) => void;

  // Real-time Pending Queries for reconnect
  pendingQueries: PendingQuery[];
  addPendingQuery: (pending: PendingQuery) => void;
  removePendingQuery: (queryId: string) => void;
  clearPendingQueries: () => void;

  // Selected Travel Vibes (期待旅遊方案 - 複選陣列)
  selectedVibes: string[];
  setSelectedVibes: (vibes: string[] | string) => void;
  toggleVibe: (vibeId: string) => void;

  // Selected Usage Habits (海外上網的使用習慣 - 複選陣列)
  usageHabits: string[];
  setUsageHabits: (habits: string[]) => void;
  toggleUsageHabit: (habitId: string) => void;

  // Travel DNA Profile
  travelProfile: TravelProfile;
  setTravelProfile: (profile: TravelProfile) => void;

  // Step controller
  demoStep: number;
  setDemoStep: (step: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
}

const initialVibes = getInitialSelectedVibes();
const initialHabits = getInitialUsageHabits();
export const defaultProfile: TravelProfile = buildProfileFromVibes(initialVibes, initialHabits);

export const useAppStore = create<AppState>((set, get) => ({
  connectionState: getInitialConnectionState(),
  setConnectionState: (state) => {
    const prev = get().connectionState;
    set({ connectionState: state });
    try {
      localStorage.setItem(STORAGE_KEY_CONNECTION, state);
    } catch {
      // Ignore localStorage write error
    }
    analytics.track('connection_changed', { from: prev, to: state });
  },

  packState: localPackStore.getDownloadState(),
  downloadPack: async () => {
    set((s) => ({ packState: { ...s.packState, downloadProgress: 20 } }));
    analytics.track('pack_build_started', { trip_id: 'seoul-demo-001' });

    await new Promise((r) => setTimeout(r, 200));
    set((s) => ({ packState: { ...s.packState, downloadProgress: 60 } }));

    await new Promise((r) => setTimeout(r, 250));
    localPackStore.ensureDefaultPack();
    const updated = localPackStore.getDownloadState();
    set({ packState: updated });

    analytics.track('pack_downloaded', {
      pack_id: 'seoul-demo-001-v1',
      version: '1.0.0',
      size_kb: 680,
    });
  },
  resetPack: () => {
    localPackStore.clearPack();
    set({ packState: localPackStore.getDownloadState() });
  },

  selectedPlanId: 'kr-5d-daily2gb',
  setSelectedPlanId: (planId) => {
    set({ selectedPlanId: planId });
    analytics.track('esim_plan_selected', { plan_id: planId });
  },

  pendingQueries: [],
  addPendingQuery: (pending) => {
    set((state) => {
      if (state.pendingQueries.some((q) => q.query_id === pending.query_id)) {
        return state;
      }
      analytics.track('query_queued', { query_id: pending.query_id, query: pending.raw_query });
      return { pendingQueries: [...state.pendingQueries, pending] };
    });
  },
  removePendingQuery: (queryId) => {
    set((state) => ({
      pendingQueries: state.pendingQueries.filter((q) => q.query_id !== queryId),
    }));
  },
  clearPendingQueries: () => {
    set({ pendingQueries: [] });
  },

  selectedVibes: initialVibes,
  setSelectedVibes: (input) => {
    const migrated = migrateSelectedVibes(input);
    const updatedProfile = buildProfileFromVibes(migrated, get().usageHabits);
    set({ selectedVibes: migrated, travelProfile: updatedProfile });
    try {
      localStorage.setItem(STORAGE_KEY_SELECTED_VIBES, JSON.stringify(migrated));
    } catch {
      // Ignore
    }
  },
  toggleVibe: (vibeId) => {
    const current = get().selectedVibes;
    let next: string[];
    if (current.includes(vibeId)) {
      next = current.filter((id) => id !== vibeId);
    } else {
      next = [...current, vibeId];
    }
    const updatedProfile = buildProfileFromVibes(next, get().usageHabits);
    set({ selectedVibes: next, travelProfile: updatedProfile });
    try {
      localStorage.setItem(STORAGE_KEY_SELECTED_VIBES, JSON.stringify(next));
    } catch {
      // Ignore
    }
    analytics.track('travel_vibe_toggled', { vibe_id: vibeId, total_selected: next.length });
  },

  usageHabits: initialHabits,
  setUsageHabits: (habits) => {
    set({ usageHabits: habits });
    try {
      localStorage.setItem(STORAGE_KEY_USAGE_HABITS, JSON.stringify(habits));
    } catch {
      // Ignore
    }
    const updatedProfile = buildProfileFromVibes(get().selectedVibes, habits);
    set({ travelProfile: updatedProfile });
  },
  toggleUsageHabit: (habitId) => {
    const current = get().usageHabits;
    const normalizedTarget =
      habitId === 'map' ? 'photo_map' : habitId === 'offline' ? 'safety_offline' : habitId;

    let next: string[];
    const isAlreadySelected = current.some(
      (h) =>
        h === normalizedTarget ||
        (normalizedTarget === 'photo_map' && h === 'map') ||
        (normalizedTarget === 'safety_offline' && h === 'offline')
    );

    if (isAlreadySelected) {
      next = current.filter(
        (h) =>
          h !== normalizedTarget &&
          !(normalizedTarget === 'photo_map' && h === 'map') &&
          !(normalizedTarget === 'safety_offline' && h === 'offline')
      );
    } else {
      next = [...current, normalizedTarget];
    }

    set({ usageHabits: next });
    try {
      localStorage.setItem(STORAGE_KEY_USAGE_HABITS, JSON.stringify(next));
    } catch {
      // Ignore
    }
    const updatedProfile = buildProfileFromVibes(get().selectedVibes, next);
    set({ travelProfile: updatedProfile });
    analytics.track('usage_habit_toggled', { habit_id: habitId, total_selected: next.length });
  },

  travelProfile: defaultProfile,
  setTravelProfile: (profile) => set({ travelProfile: profile }),

  demoStep: 0,
  setDemoStep: (step) => set({ demoStep: step }),
  nextDemoStep: () => set((s) => ({ demoStep: Math.min(7, s.demoStep + 1) })),
  prevDemoStep: () => set((s) => ({ demoStep: Math.max(0, s.demoStep - 1) })),
}));
