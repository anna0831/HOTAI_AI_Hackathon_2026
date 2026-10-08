import type { ConnectionState } from '../domain/query';

export type QuestionRequirement = 'offline_pack' | 'network_required';

export interface CompanionQuestion {
  id: string;
  label: string;
  query: string;
  requirement: QuestionRequirement;
  packId?: string;
  targetKnowledgeId?: string;
  description?: string;
}

export const COMPANION_QUESTIONS: CompanionQuestion[] = [
  {
    id: 'q-transport-incheon-hongdae',
    label: '✈️ 機場到弘大交通',
    query: '我要怎麼從仁川機場到弘大的住宿？',
    requirement: 'offline_pack',
    packId: 'seoul-demo-001-v1',
    targetKnowledgeId: 'transport-incheon-hongdae',
    description: 'AREX 快線車程、月台與出口指示',
  },
  {
    id: 'q-hotel-hongdae-address',
    label: '🏨 住宿地址與門牌',
    query: '我的住宿地址是什麼？',
    requirement: 'offline_pack',
    packId: 'seoul-demo-001-v1',
    targetKnowledgeId: 'hotel-hongdae-address',
    description: '弘大舒適文旅地址與訂房確認號',
  },
  {
    id: 'q-itinerary-tomorrow-day2',
    label: '🏯 明天 Day2 行程',
    query: '明天行程有哪些景點？',
    requirement: 'offline_pack',
    packId: 'seoul-demo-001-v1',
    targetKnowledgeId: 'itinerary-tomorrow-day2',
    description: '景福宮、北村韓屋村與益善洞安排',
  },
  {
    id: 'q-attraction-gyeongbokgung',
    label: '🏛️ 景福宮歷史由來',
    query: '景福宮有什麼歷史？',
    requirement: 'offline_pack',
    packId: 'seoul-demo-001-v1',
    targetKnowledgeId: 'attraction-gyeongbokgung-history',
    description: '1395 年太祖建宮與換崗儀式背景',
  },
  {
    id: 'q-transport-seongsu-station',
    label: '☕ 聖水洞哪一站下車',
    query: '去聖水洞要在哪一站下車？',
    requirement: 'offline_pack',
    packId: 'seoul-demo-001-v1',
    targetKnowledgeId: 'transport-seongsu-station',
    description: '首爾地鐵 2 號線聖水站出口導引',
  },
  {
    id: 'q-esim-troubleshooting',
    label: '📶 eSIM 沒訊號排錯',
    query: 'eSIM 沒有連上要先檢查什麼？',
    requirement: 'offline_pack',
    packId: 'seoul-demo-001-v1',
    targetKnowledgeId: 'esim-troubleshooting-guide',
    description: '數據漫遊、APN 與重開機 4 步排錯',
  },
  {
    id: 'q-emergency-hotlines',
    label: '🚨 韓國緊急電話',
    query: '韓國緊急電話是多少？',
    requirement: 'offline_pack',
    packId: 'seoul-demo-001-v1',
    targetKnowledgeId: 'emergency-hotlines-korea',
    description: '112、119 與 1330 中文求助專線',
  },
  {
    id: 'q-korean-phrase-toilet',
    label: '🗣️ 洗手間韓文怎麼說',
    query: '「請問洗手間在哪裡」韓文怎麼說？',
    requirement: 'offline_pack',
    packId: 'seoul-demo-001-v1',
    targetKnowledgeId: 'korean-phrase-toilet',
    description: '韓文原文字卡、發音諧音與羅馬拼音',
  },
  // Network required questions (Real-time dynamic info)
  {
    id: 'q-arex-realtime-delay',
    label: '🔸 AREX 即時延誤？',
    query: 'AREX 現在有沒有延誤？',
    requirement: 'network_required',
    description: '即時列車運行狀態與事故通報',
  },
  {
    id: 'q-weather-current-temp',
    label: '🌤️ 現在首爾幾度？',
    query: '現在首爾幾度？',
    requirement: 'network_required',
    description: '氣象廳即時觀測溫度與降雨機率',
  },
];

/**
 * 取得特定守護包對應的所有內建問題清單（以唯一 ID 去重）
 */
export function getPackBuiltinQuestions(packId: string): CompanionQuestion[] {
  const seenIds = new Set<string>();
  return COMPANION_QUESTIONS.filter((q) => {
    if (q.packId !== packId) return false;
    if (seenIds.has(q.id)) return false;
    seenIds.add(q.id);
    return true;
  });
}

/**
 * 取得特定守護包的實際內建問題數
 */
export function getPackBuiltinQuestionsCount(packId: string): number {
  return getPackBuiltinQuestions(packId).length;
}

export interface QuestionCardState {
  badgeLabel: '離線可用' | '需要網路' | '請先下載守護包' | '連線後可查詢';
  badgeStyle: string;
  cardStyle: string;
  canClick: boolean;
  disabledReason?: string;
}

/**
 * 統一管理問題卡片的連線需求、配色標籤與可操作性
 */
export function getQuestionCardState(
  question: CompanionQuestion,
  connectionState: ConnectionState,
  isPackDownloaded: boolean
): QuestionCardState {
  if (question.requirement === 'offline_pack') {
    if (isPackDownloaded) {
      return {
        badgeLabel: '離線可用',
        badgeStyle: 'bg-[#A7F3D0]/80 text-[#065F46] font-bold',
        cardStyle:
          'bg-[#E6F9F0] text-[#065F46] border-[#A7F3D0] hover:bg-[#D1FAE5] cursor-pointer shadow-2xs',
        canClick: true,
      };
    } else {
      return {
        badgeLabel: '請先下載守護包',
        badgeStyle: 'bg-slate-200 text-slate-700 font-bold',
        cardStyle:
          'bg-slate-50 text-slate-500 border-slate-200 opacity-80 cursor-not-allowed',
        canClick: false,
        disabledReason: '此問題需使用離線旅程守護包，請先前往下載守護包至本機。',
      };
    }
  }

  // question.requirement === 'network_required'
  if (connectionState === 'online') {
    return {
      badgeLabel: '需要網路',
      badgeStyle: 'bg-[#FED7AA] text-[#7C2D12] font-bold',
      cardStyle:
        'bg-[#FFF7ED] text-[#7C2D12] border-[#FDBA74] hover:bg-[#FFEDD5] cursor-pointer shadow-2xs',
      canClick: true,
    };
  } else {
    // Offline mode with network-required question
    return {
      badgeLabel: '連線後可查詢',
      badgeStyle: 'bg-[#FED7AA]/60 text-[#9A3412] font-bold',
      cardStyle:
        'bg-[#FFF7ED]/60 text-[#9A3412]/80 border-[#FED7AA] opacity-75 cursor-not-allowed',
      canClick: false,
      disabledReason: '目前處於離線保護模式，即時問題（最新天氣／延誤）將於連線後開放查詢。',
    };
  }
}
