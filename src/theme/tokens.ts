// 去趣 chicTrip Design Tokens
// 依據官方視覺規範定義色系、間距與圓角標準

export const CHIC_TOKENS = {
  colors: {
    chicBlue: '#00AEEF',      // 品牌天藍：主操作、品牌焦點、高亮
    chicYellow: '#FFC400',    // 活力亮黃：角色感、特色徽章、星星評分
    promoOrange: '#FF8614',   // 促銷亮橘：優惠價格、倒數、轉換按鈕
    ink: '#171B28',           // 深墨黑：主要標題、高對比內文
    navy: '#143D5C',          // 輔助深藍：重要說明、導航底色
    surface: '#F4F7FB',       // 淺灰藍背景：全站頁面底色、輕量容器
    white: '#FFFFFF',         // 純白：卡片背景、輸入框底色
    success: '#18B46B',       // 成功綠：線上狀態、即時連線、已下載
    warning: '#F59E0B',       // 警示黃：排隊佇列、時效性保護提醒
    border: '#E2E8F0',        // 柔和邊框
    subtle: '#64748B',        // 次要輔助文字
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },
  shadows: {
    soft: '0 4px 20px -2px rgba(23, 27, 40, 0.06)',
    card: '0 8px 30px -4px rgba(20, 61, 92, 0.08)',
    pop: '0 12px 36px -6px rgba(0, 174, 239, 0.25)',
  }
} as const;

export type ChicColors = typeof CHIC_TOKENS.colors;
