import { describe, it, expect } from 'vitest';
import { queryClassifier } from '../services/queryClassifier';

describe('QueryClassifier', () => {
  it('should classify real-time queries correctly', () => {
    const realtimeQueries = [
      '現在首爾幾度？',
      'AREX 現在有沒有延誤？',
      '今天景福宮有沒有臨時休館？',
      '現在台幣換韓元匯率多少？',
      '這家餐廳現在排隊多久？',
      '首爾今天會下雨嗎？',
    ];

    for (const q of realtimeQueries) {
      const result = queryClassifier.classify(q);
      expect(result.category).toBe('real_time');
      expect(result.detected_triggers.length).toBeGreaterThan(0);
    }
  });

  it('should classify personal trip queries correctly', () => {
    const personalQueries = [
      '我的住宿地址是什麼？',
      '明天行程有哪些景點？',
      '我明天要去哪裡？',
    ];

    for (const q of personalQueries) {
      const result = queryClassifier.classify(q);
      expect(result.category).toBe('personal');
    }
  });

  it('should classify stable reference queries correctly', () => {
    const stableQueries = [
      '我要怎麼從仁川機場到弘大的住宿？',
      '景福宮有什麼歷史？',
      '去聖水洞要在哪一站下車？',
      'eSIM 沒有連上要先檢查什麼？',
      '韓國緊急電話是多少？',
      '「請問洗手間在哪裡」韓文怎麼說？',
    ];

    for (const q of stableQueries) {
      const result = queryClassifier.classify(q);
      // Either stable or personal
      expect(['stable', 'personal']).toContain(result.category);
    }
  });

  it('should classify out-of-scope queries as unknown', () => {
    const outOfScope = [
      '幫我買 BTS 演唱會門票',
      '幫我刷卡訂房',
    ];

    for (const q of outOfScope) {
      const result = queryClassifier.classify(q);
      expect(result.category).toBe('unknown');
    }
  });
});
