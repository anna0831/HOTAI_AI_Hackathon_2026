/**
 * Experience Twin 靜態 Fixture 資料
 *
 * 覆蓋首爾 5 日示範行程（trip.json）中 7 個主要景點的備案。
 * Demo 階段完全不呼叫外部服務，所有備案為預先規劃的靜態資料。
 *
 * 對應 trip.json itinerary item ID：
 *   item-1-3, item-2-1, item-2-2, item-3-1, item-3-2, item-4-1, item-5-2
 */

import type { TwinPack } from '../domain/twin';

const OFFLINE_NOTE_PLACE =
  '此備案為行前預算靜態結果，離線狀態不保證最新營業時間、即時人潮或交通資訊，建議出發前連線確認。';

const OFFLINE_NOTE_TIME =
  '此時段建議為行前靜態評估，離線不保證最新排隊狀況，實際情形請現場確認。';

export const EXPERIENCE_TWIN_FIXTURE: TwinPack = {
  trip_id: 'seoul-demo-001',
  generated_at: '2026-10-08T00:00:00Z',
  is_fixture: true,
  twins: [
    // ─── Day 1：弘大入住（時段替代）───
    {
      twin_id: 'twin-1-1',
      source_item_id: 'item-1-3',
      source_item_title: '入住弘大舒適文旅',
      type: 'time_alternative',
      name: '提早至 14:00 辦理入住（Early Check-in）',
      reason: 'AREX 12:30 班次人潮較少，抵達後可提早辦理入住，避免 16:00 前後旺峰排隊。',
      suggested_time: '14:00',
      tags: ['人潮較少', '節省等待時間', '彈性安排'],
      offline_note: OFFLINE_NOTE_TIME,
    },

    // ─── Day 2：景福宮（地點替代）───
    {
      twin_id: 'twin-2-1',
      source_item_id: 'item-2-1',
      source_item_title: '景福宮與衛兵交接儀式',
      type: 'place_alternative',
      name: '昌德宮（世界遺產・秘苑有林蔭古道）',
      reason: '景福宮假日人潮可達數千人，昌德宮列為 UNESCO 世界遺產，體驗相近但人潮僅三分之一，秘苑導覽尤具特色。',
      location: '昌德宮（安國站 3 號出口步行 10 分鐘）',
      tags: ['人潮較少', 'UNESCO 世界遺產', '秘苑導覽', '相似朝鮮王朝體驗'],
      offline_note: OFFLINE_NOTE_PLACE,
    },

    // ─── Day 2：北村韓屋村（時段替代）───
    {
      twin_id: 'twin-2-2',
      source_item_id: 'item-2-2',
      source_item_title: '北村韓屋村八景攝影',
      type: 'time_alternative',
      name: '建議 08:00 前早起參觀（黃金晨光時段）',
      reason: '北村為現住宅區，日間觀光客眾多易造成居民困擾。清晨 08:00 前幾乎無人，晨光打在韓屋屋瓦上效果絕佳，是攝影最佳時段。',
      suggested_time: '08:00',
      tags: ['早鳥限定', '人潮最少', '攝影黃金光', '尊重居民'],
      offline_note: OFFLINE_NOTE_TIME,
    },

    // ─── Day 3：聖水洞（地點替代）───
    {
      twin_id: 'twin-3-1',
      source_item_id: 'item-3-1',
      source_item_title: '聖水洞潮流工廠與香氛選品',
      type: 'place_alternative',
      name: '益善洞韓屋咖啡街（文青韓屋聚落）',
      reason: '聖水洞 IG 熱度高峰時段排隊長達 1 小時，益善洞同具韓屋文青氛圍、咖啡廳密度高，人潮分散且步行範圍更集中。',
      location: '益善洞（鐘路 3 街站 4 號出口步行 3 分鐘）',
      tags: ['人潮較少', '韓屋咖啡', '相似文青氛圍', 'IG 打卡'],
      offline_note: OFFLINE_NOTE_PLACE,
    },

    // ─── Day 3：首爾林（時段替代）───
    {
      twin_id: 'twin-3-2',
      source_item_id: 'item-3-2',
      source_item_title: '首爾林漫步野餐',
      type: 'time_alternative',
      name: '建議傍晚 17:30 後入園（銀杏夕陽時段）',
      reason: '10 月首爾日間日照仍強，首爾林 17:30 後逆光拍銀杏效果最佳，且人潮明顯減少，秋意更濃。',
      suggested_time: '17:30',
      tags: ['秋季銀杏', '夕陽金光', '舒適涼爽', '人潮分散'],
      offline_note: OFFLINE_NOTE_TIME,
    },

    // ─── Day 4：明洞（地點替代）───
    {
      twin_id: 'twin-4-1',
      source_item_id: 'item-4-1',
      source_item_title: '明洞商圈購物與退稅',
      type: 'place_alternative',
      name: '廣藏市場（最在地的傳統市場美食體驗）',
      reason: '明洞商圈人潮擁擠且以觀光客為主，廣藏市場保留傳統市場氛圍、在地感更強，綠豆煎餅與生拌牛肉為首爾必食，人流分散於各攤位間。',
      location: '廣藏市場（乙支路 4 街站 4 號出口步行 5 分鐘）',
      tags: ['在地感', '傳統市場', '特色美食', '人潮較分散'],
      offline_note: OFFLINE_NOTE_PLACE,
    },

    // ─── Day 5：AREX 回程（時段替代）───
    {
      twin_id: 'twin-5-1',
      source_item_id: 'item-5-2',
      source_item_title: '弘大入口搭乘 AREX 直達仁川機場',
      type: 'time_alternative',
      name: '建議 12:00 前搭乘 AREX（避開午間尖峰）',
      reason: '弘大入口站 13:00 前後為返程旅客高峰，行李寄放車廂擁擠，建議 12:00 前搭乘可確保行李空間，並留有充足的登機前緩衝時間。',
      suggested_time: '12:00',
      tags: ['行李空間充足', '避開返程尖峰', '充裕緩衝時間'],
      offline_note: OFFLINE_NOTE_TIME,
    },
  ],
};
