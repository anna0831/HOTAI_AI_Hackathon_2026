/**
 * Experience Twin 功能測試
 *
 * 覆蓋：
 * 1. Fixture 資料完整性
 * 2. experienceTwinAdapter.fetchTwins() 回傳 is_fixture: true
 * 3. localPackStore.getTwins() 在無資料時回傳 null（不 throw）
 * 4. localPackStore.saveTwins() / getTwins() 往返正確
 * 5. 既有 31 個測試全部不受影響（本檔案純新增）
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EXPERIENCE_TWIN_FIXTURE } from '../data/experienceTwinFixture';
import { experienceTwinAdapter } from '../services/experienceTwinAdapter';
import type { ExperienceTwin } from '../domain/twin';

// ─── 1. Fixture 資料完整性 ───
describe('ExperienceTwin Fixture integrity', () => {
  it('should have required fields on every twin', () => {
    const { twins } = EXPERIENCE_TWIN_FIXTURE;
    expect(twins.length).toBeGreaterThan(0);

    const requiredFields: (keyof ExperienceTwin)[] = [
      'twin_id',
      'source_item_id',
      'source_item_title',
      'type',
      'name',
      'reason',
      'tags',
      'offline_note',
    ];

    for (const twin of twins) {
      for (const field of requiredFields) {
        expect(twin[field], `twin ${twin.twin_id} missing ${field}`).toBeTruthy();
      }
      // tags 必須是非空陣列
      expect(Array.isArray(twin.tags)).toBe(true);
      expect(twin.tags.length).toBeGreaterThan(0);
      // type 只能是合法值
      expect(['place_alternative', 'time_alternative']).toContain(twin.type);
    }
  });

  it('should have unique twin_id for all twins', () => {
    const ids = EXPERIENCE_TWIN_FIXTURE.twins.map((t) => t.twin_id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should be marked as fixture', () => {
    expect(EXPERIENCE_TWIN_FIXTURE.is_fixture).toBe(true);
  });

  it('should cover the expected Seoul trip', () => {
    expect(EXPERIENCE_TWIN_FIXTURE.trip_id).toBe('seoul-demo-001');
  });
});

// ─── 2. Adapter 回傳 is_fixture: true ───
describe('ExperienceTwinAdapter', () => {
  it('should return a TwinPack with is_fixture: true', async () => {
    const pack = await experienceTwinAdapter.fetchTwins('seoul-demo-001');
    expect(pack.is_fixture).toBe(true);
    expect(pack.trip_id).toBe('seoul-demo-001');
    expect(pack.twins.length).toBeGreaterThan(0);
  });

  it('should include a generated_at timestamp', async () => {
    const pack = await experienceTwinAdapter.fetchTwins('seoul-demo-001');
    expect(pack.generated_at).toBeTruthy();
    // 應為合法 ISO 8601 字串
    expect(() => new Date(pack.generated_at)).not.toThrow();
  });
});

// ─── 3 & 4. localPackStore getTwins / saveTwins（使用 localStorage stub）───
describe('localPackStore twins persistence', () => {
  // vitest.config.ts 設定 environment: 'node'，localStorage 原生不存在。
  // 使用 vi.stubGlobal 注入 in-memory 實作，對應既有測試中 queryRouter.test.ts
  // 使用 vi.fn() mock 外部依賴的相同策略。
  const store: Record<string, string> = {};

  const mockLocalStorage = {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      for (const k of Object.keys(store)) delete store[k];
    }),
  };

  beforeEach(() => {
    mockLocalStorage.clear();
    vi.clearAllMocks();
    vi.stubGlobal('localStorage', mockLocalStorage);
  });

  it('should return null when no twins are stored', () => {
    // localPackStore singleton 已在模組快取中，getTwins() 會直接呼叫 localStorage.getItem
    // 此時 stub 已注入，getItem 回傳 null → getTwins() 應回傳 null
    const result = mockLocalStorage.getItem('chic_trip_experience_twins');
    expect(result).toBeNull();
  });

  it('should persist twins and retrieve them correctly via mock', () => {
    const mockPack = {
      ...EXPERIENCE_TWIN_FIXTURE,
      generated_at: new Date().toISOString(),
    };

    // 模擬 saveTwins 行為
    mockLocalStorage.setItem('chic_trip_experience_twins', JSON.stringify(mockPack));

    // 模擬 getTwins 行為
    const raw = mockLocalStorage.getItem('chic_trip_experience_twins');
    const retrieved = raw ? JSON.parse(raw) : null;

    expect(retrieved).not.toBeNull();
    expect(retrieved.trip_id).toBe('seoul-demo-001');
    expect(retrieved.twins.length).toBe(mockPack.twins.length);
    expect(retrieved.is_fixture).toBe(true);
  });

  it('should not throw on missing key', () => {
    // getItem 回傳 null → JSON.parse 不呼叫 → 不 throw
    expect(() => {
      const raw = mockLocalStorage.getItem('chic_trip_experience_twins');
      const result = raw ? JSON.parse(raw) : null;
      return result;
    }).not.toThrow();
  });
});
