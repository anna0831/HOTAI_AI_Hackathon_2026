export interface TravelDnaCardSample {
  id: 'urban-seoul' | 'food-osaka' | 'nature-hokkaido';
  name: string;
  destination: string;
  dnaType: string;
  title: string;
  quote: string;
  tags: string[];
  referralCode: string;
  imageSrc: string;
  fallbackGradient: string;
  badgeDirection: string;
  themeColor: string;
}

export const TRAVEL_DNA_SAMPLES: TravelDnaCardSample[] = [
  {
    id: 'urban-seoul',
    name: 'Anna',
    destination: '首爾 (Seoul)',
    dnaType: '城市探險型',
    title: '我的旅行 DNA｜城市探險型',
    quote: '轉進巷弄，找到屬於我的首爾。',
    tags: ['巷弄探索', '特色咖啡', '城市散步'],
    referralCode: 'DEMO-SEOUL',
    imageSrc: '/images/travel-dna/urban-seoul.webp',
    fallbackGradient: 'linear-gradient(135deg, #0284C7 0%, #0369A1 50%, #0F172A 100%)',
    badgeDirection: '首爾街景・咖啡店・現代建築',
    themeColor: '#00AEEF',
  },
  {
    id: 'food-osaka',
    name: 'Anna',
    destination: '大阪 (Osaka)',
    dnaType: '美食療癒型',
    title: '我的旅行 DNA｜美食療癒型',
    quote: '用一口美味，收藏大阪的日常。',
    tags: ['在地美食', '市場探索', '暖心小店'],
    referralCode: 'DEMO-OSAKA',
    imageSrc: '/images/travel-dna/food-osaka.webp',
    fallbackGradient: 'linear-gradient(135deg, #EA580C 0%, #C2410C 50%, #1C1917 100%)',
    badgeDirection: '大阪市場・料理・溫暖店鋪',
    themeColor: '#FF8614',
  },
  {
    id: 'nature-hokkaido',
    name: 'Anna',
    destination: '北海道 (Hokkaido)',
    dnaType: '自然慢遊型',
    title: '我的旅行 DNA｜自然慢遊型',
    quote: '把步調放慢，讓北海道帶我深呼吸。',
    tags: ['森林漫步', '山海風景', '放鬆慢遊'],
    referralCode: 'DEMO-HOKKAIDO',
    imageSrc: '/images/travel-dna/nature-hokkaido.webp',
    fallbackGradient: 'linear-gradient(135deg, #059669 0%, #047857 50%, #064E3B 100%)',
    badgeDirection: '北海道山景・森林・海岸',
    themeColor: '#18B46B',
  },
];
