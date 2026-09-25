import { describe, it, expect, vi } from 'vitest';
import { queryRouter } from '../services/queryRouter';
import type { PendingQuery } from '../domain/query';

describe('QueryRouter and Offline Freshness Gateway', () => {
  it('should intercept real-time queries in offline mode without calling network', async () => {
    const queueCallback = vi.fn();
    const result = await queryRouter.route(
      'AREX 現在有沒有延誤？',
      'offline',
      queueCallback
    );

    expect(result.category).toBe('real_time');
    expect(result.mode).toBe('queued');
    expect(result.queued).toBe(true);
    expect(result.requires_network).toBe(true);
    expect(result.sources.length).toBe(0);
    expect(result.answer).toContain('待連線清單');
    expect(queueCallback).toHaveBeenCalledTimes(1);
    const pendingArg: PendingQuery = queueCallback.mock.calls[0][0];
    expect(pendingArg.raw_query).toBe('AREX 現在有沒有延誤？');
  });

  it('should resolve real-time queries when online', async () => {
    const result = await queryRouter.route(
      '現在首爾幾度？',
      'online'
    );

    expect(result.category).toBe('real_time');
    expect(result.mode).toBe('online_live');
    expect(result.answer).toContain('18°C');
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it('should resolve stable travel questions offline without network', async () => {
    const result = await queryRouter.route(
      '我要怎麼從仁川機場到弘大的住宿？',
      'offline'
    );

    expect(result.mode).toBe('offline_local');
    expect(result.requires_network).toBe(false);
    expect(result.answer).toContain('AREX');
  });

  it('should give honest fallback offline for out-of-scope queries', async () => {
    const result = await queryRouter.route(
      '幫我買 BTS 演唱會門票',
      'offline'
    );

    expect(result.mode).toBe('not_found');
    expect(result.answer).toContain('範圍提醒');
  });
});
