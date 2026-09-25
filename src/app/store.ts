import { create } from 'zustand';
import type { ConnectionState, PendingQuery } from '../domain/query';
import type { PackDownloadState } from '../domain/pack';
import { localPackStore } from '../services/localPackStore';
import { analytics } from '../services/analytics';

export interface TravelProfile {
  type: string;
  badge: string;
  tagline: string;
  description: string;
  matched_tags: string[];
  recommended_plan_id: string;
}

interface AppState {
  // Connection state simulator
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

  // Travel DNA Profile
  travelProfile: TravelProfile;
  setTravelProfile: (profile: TravelProfile) => void;

  // Demo step controller
  demoStep: number;
  setDemoStep: (step: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
}

export const defaultProfile: TravelProfile = {
  type: '城市探險型旅人 (Urban Explorer)',
  badge: '熱愛街拍・深度咖啡・無懼漫步',
  tagline: '穿梭弘大與聖水洞的感性探索者，用影像與腳步寫下首爾記憶',
  description: '重視巷弄人文氛圍、當紅快閃店與韓屋設計美感，行程緊湊且極度依賴地圖定位與即時拍照打卡分享。',
  matched_tags: ['重度地圖導航', '高畫質社群分享', '首爾地鐵穿梭', '弘大聖水選物'],
  recommended_plan_id: 'kr-5d-daily2gb',
};

export const useAppStore = create<AppState>((set, get) => ({
  // Default to online initially, demo script switches to offline
  connectionState: 'online',
  setConnectionState: (state) => {
    const prev = get().connectionState;
    set({ connectionState: state });
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

  travelProfile: defaultProfile,
  setTravelProfile: (profile) => set({ travelProfile: profile }),

  demoStep: 0,
  setDemoStep: (step) => set({ demoStep: step }),
  nextDemoStep: () => set((s) => ({ demoStep: Math.min(7, s.demoStep + 1) })),
  prevDemoStep: () => set((s) => ({ demoStep: Math.max(0, s.demoStep - 1) })),
}));
