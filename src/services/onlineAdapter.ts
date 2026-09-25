import type { SourcePassage } from '../domain/query';

export interface OnlineLiveResponse {
  answer: string;
  source: SourcePassage;
  mock: true;
}

export interface IOnlineAdapter {
  fetchLiveInfo(query: string): Promise<OnlineLiveResponse>;
}

export class OnlineAdapter implements IOnlineAdapter {
  async fetchLiveInfo(query: string): Promise<OnlineLiveResponse> {
    // Simulate real-time API latency (300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));

    const q = query.toLowerCase();

    if (q.includes('幾度') || q.includes('溫度') || q.includes('天氣') || q.includes('下雨')) {
      return {
        answer: '【即時天氣動態・首爾鐘路區】目前氣溫 18°C，多雲轉晴，體感舒適偏涼。降雨機率 10%，入夜後氣溫預計降至 13°C，外出請攜帶薄外套防風。',
        source: {
          id: 'live-weather-kma',
          title: '韓國氣象廳 (KMA) 即時觀測站',
          source_label: '線上即時數據串流 (Live API Mock)',
          updated_at: new Date().toISOString(),
          snippet: '首爾地區即時觀測：氣溫 18°C，濕度 48%，風速 2.1 m/s。',
          score: 1.0,
        },
        mock: true,
      };
    }

    if (q.includes('arex') || q.includes('延誤') || q.includes('機場快線') || q.includes('地鐵')) {
      return {
        answer: '【AREX 機場快線即時營運通報】全線（仁川國際機場 1/2 航廈 ⇋ 首爾站／弘大入口站）目前各班次正常發車行駛，無事故或異常延誤回報，平均發車班距約 10~12 分鐘。',
        source: {
          id: 'live-arex-status',
          title: 'AREX 機場鐵路即時營運監控中心',
          source_label: '線上即時數據串流 (Live API Mock)',
          updated_at: new Date().toISOString(),
          snippet: 'AREX 營運正常，仁川 T1 首爾方向普通列車準點率 100%。',
          score: 1.0,
        },
        mock: true,
      };
    }

    if (q.includes('景福宮') && (q.includes('休館') || q.includes('今天') || q.includes('開放'))) {
      return {
        answer: '【景福宮即時開放資訊】今日景福宮正常對外開放（開放時間 09:00 - 18:00，最後入場 17:00）。光化門守門將換崗儀式將於 10:00 及 14:00 如期舉行。',
        source: {
          id: 'live-cultural-heritage',
          title: '韓國國家遺產廳古宮即時公告',
          source_label: '線上即時數據串流 (Live API Mock)',
          updated_at: new Date().toISOString(),
          snippet: '景福宮正常開放，無臨時施工或閉館維護通知。',
          score: 1.0,
        },
        mock: true,
      };
    }

    if (q.includes('匯率') || q.includes('換韓元') || q.includes('台幣')) {
      return {
        answer: '【即時匯率行情・明洞民間換錢所參考】目前即時參考匯率：新台幣 (TWD) 兌韓元 (KRW) 約為 1 : 42.85（明洞一品香／大使館換錢所即時報價牌）。建議使用現金面額千元新台幣現場兌換最划算。',
        source: {
          id: 'live-fx-myeongdong',
          title: '明洞匯率即時牌價監控',
          source_label: '線上即時數據串流 (Live API Mock)',
          updated_at: new Date().toISOString(),
          snippet: 'TWD/KRW 現鈔買入 42.85，韓亞銀行即時牌價 42.10。',
          score: 1.0,
        },
        mock: true,
      };
    }

    if (q.includes('排隊') || q.includes('餐廳') || q.includes('營業中')) {
      return {
        answer: '【熱門名店即時候位狀況】弘大周邊熱門烤肉店目前平均候位時間約 15~25 分鐘；如欲節省時間，可避開 18:30~19:30 用餐尖峰時段。',
        source: {
          id: 'live-dining-queue',
          title: 'CatchTable 即時候位動態系統',
          source_label: '線上即時數據串流 (Live API Mock)',
          updated_at: new Date().toISOString(),
          snippet: '商圈熱門餐飲排隊指數：中等偏忙碌。',
          score: 1.0,
        },
        mock: true,
      };
    }

    // Default online answer
    return {
      answer: `【線上即時查詢結果】已為您連線檢索首爾最新即時動態：「${query}」。目前相關景點與大眾運輸秩序良好，請安心前往。`,
      source: {
        id: 'live-general-agent',
        title: '去趣 Cloud Live Adapter',
        source_label: '線上即時數據串流 (Live API Mock)',
        updated_at: new Date().toISOString(),
        snippet: '雲端即時聚合檢索回傳正常。',
        score: 1.0,
      },
      mock: true,
    };
  }
}

export const onlineAdapter = new OnlineAdapter();
