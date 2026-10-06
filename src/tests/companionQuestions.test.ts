import { describe, it, expect } from 'vitest';
import {
  COMPANION_QUESTIONS,
  getPackBuiltinQuestions,
  getPackBuiltinQuestionsCount,
  getQuestionCardState,
} from '../data/companionQuestions';

describe('Companion Questions Registry and Connection State Rules', () => {
  const packId = 'seoul-demo-001-v1';

  it('should map and deduplicate built-in questions for the pack by unique ID', () => {
    const builtinQuestions = getPackBuiltinQuestions(packId);
    const count = getPackBuiltinQuestionsCount(packId);

    expect(count).toBe(8);
    expect(builtinQuestions.length).toBe(8);

    const ids = builtinQuestions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should mark downloaded pack questions as 離線可用 when pack is downloaded', () => {
    const offlineQuestion = COMPANION_QUESTIONS.find(
      (q) => q.requirement === 'offline_pack'
    )!;

    // Both online and offline should allow querying local pack if downloaded
    const stateOffline = getQuestionCardState(offlineQuestion, 'offline', true);
    expect(stateOffline.badgeLabel).toBe('離線可用');
    expect(stateOffline.canClick).toBe(true);
    expect(stateOffline.cardStyle).toContain('bg-[#E6F9F0]');
    expect(stateOffline.cardStyle).toContain('text-[#065F46]');

    const stateOnline = getQuestionCardState(offlineQuestion, 'online', true);
    expect(stateOnline.badgeLabel).toBe('離線可用');
    expect(stateOnline.canClick).toBe(true);
  });

  it('should require pack download when pack is NOT downloaded for offline questions', () => {
    const offlineQuestion = COMPANION_QUESTIONS.find(
      (q) => q.requirement === 'offline_pack'
    )!;

    const stateNotDownloaded = getQuestionCardState(offlineQuestion, 'offline', false);
    expect(stateNotDownloaded.badgeLabel).toBe('請先下載守護包');
    expect(stateNotDownloaded.canClick).toBe(false);
    expect(stateNotDownloaded.disabledReason).toContain('請先前往下載守護包');
  });

  it('should mark realtime questions as 需要網路 when online', () => {
    const realtimeQuestion = COMPANION_QUESTIONS.find(
      (q) => q.requirement === 'network_required'
    )!;

    const stateOnline = getQuestionCardState(realtimeQuestion, 'online', true);
    expect(stateOnline.badgeLabel).toBe('需要網路');
    expect(stateOnline.canClick).toBe(true);
    expect(stateOnline.cardStyle).toContain('bg-[#FFF7ED]');
    expect(stateOnline.cardStyle).toContain('text-[#7C2D12]');
  });

  it('should disable realtime questions and show 連線後可查詢 when offline', () => {
    const realtimeQuestion = COMPANION_QUESTIONS.find(
      (q) => q.requirement === 'network_required'
    )!;

    const stateOffline = getQuestionCardState(realtimeQuestion, 'offline', true);
    expect(stateOffline.badgeLabel).toBe('連線後可查詢');
    expect(stateOffline.canClick).toBe(false);
    expect(stateOffline.disabledReason).toContain('連線後開放查詢');
  });
});
