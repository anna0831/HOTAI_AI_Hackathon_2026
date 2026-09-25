import type { QueryClassification } from '../domain/query';

// Real-time keyword triggers based on SPEC Section 6 (FR-06)
const REAL_TIME_TRIGGERS = [
  '現在', '今天', '即時', '延誤', '塞車', '下雨', '溫度',
  '幾度', '天氣', '匯率', '營業中', '排隊', '事故', '取消',
  '今日', '匯價', '人潮', '即刻', '當前', '即時狀況', '即時路況'
];

// Personal context triggers based on Anna's trip
const PERSONAL_TRIGGERS = [
  '我的', '我住', '我的住宿', '我的行程', '我明天', '我後天', '明天',
  '住宿地址', '飯店地址', '預訂代號', '入住', '我的旅館', '我的飯店', '住宿'
];

// Out-of-scope / unattainable triggers (Fallbacks)
const OUT_OF_SCOPE_TRIGGERS = [
  '幫我買', '搶票', '演唱會門票', '訂位', '訂房', '代購', '刷卡', '付款'
];

export interface IQueryClassifier {
  classify(query: string): QueryClassification;
}

export class QueryClassifier implements IQueryClassifier {
  classify(query: string): QueryClassification {
    const trimmed = query.trim().toLowerCase();

    // 1. Check out of scope fallback first
    for (const trigger of OUT_OF_SCOPE_TRIGGERS) {
      if (trimmed.includes(trigger.toLowerCase())) {
        return {
          category: 'unknown',
          reason: `超出離線旅程守護包與即時資訊服務範圍（偵測到代辦/購票意圖）`,
          detected_triggers: [trigger],
        };
      }
    }

    // 2. Check real-time triggers (Highest priority for safety & freshness)
    const detectedRealtime: string[] = [];
    for (const trigger of REAL_TIME_TRIGGERS) {
      if (trimmed.includes(trigger.toLowerCase())) {
        detectedRealtime.push(trigger);
      }
    }

    if (detectedRealtime.length > 0) {
      return {
        category: 'real_time',
        reason: `偵測到高度時效性關鍵詞（${detectedRealtime.join('、')}），需線上即時數據以保證準確性`,
        detected_triggers: detectedRealtime,
      };
    }

    // 3. Check personal triggers
    const detectedPersonal: string[] = [];
    for (const trigger of PERSONAL_TRIGGERS) {
      if (trimmed.includes(trigger.toLowerCase())) {
        detectedPersonal.push(trigger);
      }
    }

    if (detectedPersonal.length > 0) {
      return {
        category: 'personal',
        reason: `偵測到個人化行程／預訂查詢（${detectedPersonal.join('、')}），可由本機離線守護包直接檢索`,
        detected_triggers: detectedPersonal,
      };
    }

    // 4. Stable reference information (culture, subway routes, emergency hotlines, esim troubleshooting, language)
    const STABLE_TOPICS = [
      '交通', '怎麼去', '搭車', '地鐵', '出口', '哪一站', 'arex',
      '仁川', '機場', '弘大', '前往', '怎麼',
      '景福宮', '歷史', '由來', '北村', '益善洞', '聖水洞', '明洞',
      'esim', '排錯', '沒訊號', '連不上', '啟用', '設定', '漫遊',
      '緊急', '電話', '報警', '救護車', '112', '119', '1330',
      '韓文', '怎麼說', '洗手間', '廁所', '發音'
    ];

    const detectedStable = STABLE_TOPICS.filter((topic) => trimmed.includes(topic));
    if (detectedStable.length > 0) {
      return {
        category: 'stable',
        reason: `屬於靜態知識或常備手冊內容（${detectedStable.join('、')}），支援離線安全回答`,
        detected_triggers: detectedStable,
      };
    }

    // 5. Default fallback to unknown / conservative
    return {
      category: 'unknown',
      reason: `未明確比對到離線守護包核心主題或即時訊號，採保守策略提示`,
      detected_triggers: [],
    };
  }
}

export const queryClassifier = new QueryClassifier();
