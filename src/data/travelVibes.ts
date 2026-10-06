import type { TravelProfile } from '../app/store';

export interface TravelVibeOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  vibeWeight: string;
}

export const TRAVEL_VIBE_OPTIONS: TravelVibeOption[] = [
  {
    id: 'cafe_culture',
    emoji: '☕',
    title: '弘大＆聖水洞漫步',
    description: '設計選物、潮牌快閃、咖啡街拍',
    tags: ['重度地圖導航', '高畫質社群分享', '弘大聖水選物'],
    vibeWeight: '質感街拍與咖啡探索',
  },
  {
    id: 'history_culture',
    emoji: '🏯',
    title: '景福宮與韓屋村',
    description: '穿韓服拍照、傳統宮闕、古韻漫步',
    tags: ['景福宮古蹟巡禮', '北村韓屋古韻', '傳統文化體驗'],
    vibeWeight: '深度宮闕歷史與人文古蹟',
  },
  {
    id: 'foodie_market',
    emoji: '🍲',
    title: '在地美食與夜市探索',
    description: '廣藏市場小吃、道地韓食、暖心宵夜',
    tags: ['在地市場探索', '道地韓食巡禮', '首爾夜市打卡'],
    vibeWeight: '道地街頭美食與市場尋味',
  },
  {
    id: 'kpop_shopping',
    emoji: '🛍️',
    title: '潮流購物與商圈穿梭',
    description: '明洞商圈、現代百貨、K-Pop 潮流',
    tags: ['明洞流行購物', '首爾地鐵穿梭', 'K-Pop 潮流特蒐'],
    vibeWeight: '旗艦店購物與商圈穿梭',
  },
];

/**
 * 遷移舊資料：
 * 舊資料若是單一值，轉為單元素陣列；空值轉為空陣列。
 */
export function migrateSelectedVibes(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter(
      (item): item is string => typeof item === 'string' && item.trim().length > 0
    );
  }
  if (typeof raw === 'string' && raw.trim().length > 0) {
    return [raw.trim()];
  }
  return [];
}

/**
 * 依據所有選取的期待旅遊方案（複選）綜合產出旅行者畫像與 eSIM 推薦依據
 * 確保下游行程生成、摘要與推薦邏輯完整使用所有選項，而非僅取第一個。
 */
export function buildProfileFromVibes(selectedIds: string[]): TravelProfile {
  const safeIds = selectedIds.length > 0 ? selectedIds : ['cafe_culture'];
  const matchedVibes = TRAVEL_VIBE_OPTIONS.filter((v) => safeIds.includes(v.id));
  const fallbackVibes = matchedVibes.length > 0 ? matchedVibes : [TRAVEL_VIBE_OPTIONS[0]];

  // 匯總所有標籤並去重
  const allTags = new Set<string>();
  fallbackVibes.forEach((v) => v.tags.forEach((t) => allTags.add(t)));

  const titles = fallbackVibes.map((v) => v.title).join(' ✕ ');
  const descriptions = fallbackVibes.map((v) => v.description).join('；');

  let typeName = '城市探險型旅人 (Urban Explorer)';
  let badgeName = '熱愛街拍・深度咖啡・無懼漫步';
  let tagline = '穿梭弘大與聖水洞的感性探索者，用影像與腳步寫下首爾記憶';

  if (safeIds.includes('cafe_culture') && safeIds.includes('history_culture')) {
    typeName = '感性漫遊・文化探索型旅人';
    badgeName = '潮流選物・宮闕古韻・感性街拍';
    tagline = '漫步於聖水洞當代快閃店與景福宮百年石牆之間，用鏡頭捕捉首爾新舊交融之美';
  } else if (safeIds.includes('foodie_market') && safeIds.includes('kpop_shopping')) {
    typeName = '都會享樂・美食購物型旅人';
    badgeName = '市場尋味・明洞潮流・熱鬧穿梭';
    tagline = '一邊品嚐廣藏市場的道地綠豆煎餅，一邊掃貨最新美妝流行，享受極致首爾日常';
  } else if (safeIds.includes('history_culture')) {
    typeName = '歷史人文・古韻沉浸型旅人';
    badgeName = '傳統韓屋・宮闕歷史・文化深度';
    tagline = '穿上一襲韓服走進景福宮與北村，沉浸在朝鮮王朝的安寧與石階光影之中';
  } else if (safeIds.includes('foodie_market')) {
    typeName = '舌尖尋味・美食品鑑型旅人';
    badgeName = '街頭小吃・市場巡禮・深夜暖胃';
    tagline = '以一口道地滋味認識一座城市，讓首爾的香氣填滿每一趟漫遊時光';
  } else if (safeIds.includes('kpop_shopping')) {
    typeName = '流行潮流・城市採購型旅人';
    badgeName = '潮流旗艦・美妝快閃・地鐵穿梭';
    tagline = '精準鎖定最新潮牌與快閃空間，在首爾的繁華商圈中尋找專屬風格靈感';
  }

  return {
    type: typeName,
    badge: badgeName,
    tagline,
    description: `您在首爾期待的重點包含【${titles}】（${descriptions}）。行程緊湊且極度依賴地圖定位與即時拍照打卡，特別適合搭配高覆蓋率的去趣 eSIM 與離線守護包。`,
    matched_tags: Array.from(allTags),
    recommended_plan_id: 'kr-5d-daily2gb',
  };
}
