export interface DemoStepItem {
  path: string;
  label: string;
  time: string;
  title: string;
}

export const DEMO_STEPS: DemoStepItem[] = [
  { path: '/', label: '01 測驗入口', time: '0-10s', title: 'GenAI 互動創造話題' },
  { path: '/result', label: '02 旅人畫像', time: '10-23s', title: '個人化 DNA 與社群卡' },
  { path: '/trip', label: '03 行程洞察', time: '23s', title: '首爾五日需求分析' },
  { path: '/esim', label: '04 eSIM 導購', time: '23-35s', title: '情境推薦與促購理由' },
  { path: '/pack', label: '05 守護包解鎖', time: '35-45s', title: '購買後解鎖 Killer Benefit' },
  { path: '/companion', label: '06 離線 AI 旅伴', time: '45-82s', title: '離線可用・時效閘道' },
  { path: '/share', label: '07 旅後分享', time: '82-90s', title: '社群裂變 Referral Loop' },
  { path: '/evidence', label: '08 決策儀表板', time: '90s', title: 'Funnel 數據與架構評分' },
];
