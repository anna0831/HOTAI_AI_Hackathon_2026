/**
 * 去趣 eSIM × Offline AI Travel Companion
 * 首爾 5 日行程專屬 Image Manifest
 *
 * 集中管理五日封面照片、景點照片與每日路線圖路徑。
 * 統一資產位置：
 * - 景點照片：/images/seoul/attractions/{name}.webp
 * - 路線圖片：/images/seoul/routes/day{N}.webp
 */

export interface AttractionImage {
  id: string;
  attractionName: string;
  imagePath: string;
  altText: string;
  imageCredit?: string;
}

export interface DayImageConfig {
  day: number;
  coverImage: {
    imagePath: string;
    altText: string;
    title: string;
  };
  attractions: AttractionImage[];
  routeImage: {
    imagePath: string;
    altText: string;
    title: string;
  };
}

export const SEOUL_IMAGE_MANIFEST: Record<number, DayImageConfig> = {
  1: {
    day: 1,
    coverImage: {
      imagePath: '/images/seoul/attractions/hongdae.webp',
      altText: '首爾 Day 1 封面：弘大步行街熱鬧夜景與街頭表演聚落',
      title: '弘大探索與抵達首爾',
    },
    attractions: [
      {
        id: 'day1-airport',
        attractionName: '仁川國際機場 (ICN)',
        imagePath: '/images/seoul/attractions/airport.webp',
        altText: '仁川國際機場第一航廈入境大廳，AREX 快線起點',
        imageCredit: 'chicTrip Official Demo Collection',
      },
      {
        id: 'day1-hongdae',
        attractionName: '弘大商圈街區',
        imagePath: '/images/seoul/attractions/hongdae.webp',
        altText: '弘大步行街街景與年輕潮流文化街區',
        imageCredit: 'chicTrip Official Demo Collection',
      },
    ],
    routeImage: {
      imagePath: '/images/seoul/routes/day1.webp',
      altText: '首爾 Day 1 行程路線預覽圖：仁川國際機場 → AREX 快線 → 弘大住宿',
      title: 'Day 1 路線預覽：仁川機場至弘大',
    },
  },
  2: {
    day: 2,
    coverImage: {
      imagePath: '/images/seoul/attractions/gyeongbokgung.webp',
      altText: '首爾 Day 2 封面：景福宮白雪覆蓋的傳統宮闕殿堂',
      title: '朝鮮王朝古韻與文青韓屋聚落',
    },
    attractions: [
      {
        id: 'day2-gyeongbokgung',
        attractionName: '景福宮 (光化門)',
        imagePath: '/images/seoul/attractions/gyeongbokgung.webp',
        altText: '景福宮傳統韓式宮闕大殿與白雪景致',
        imageCredit: 'chicTrip Official Demo Collection',
      },
      {
        id: 'day2-bukchon',
        attractionName: '北村韓屋村',
        imagePath: '/images/seoul/attractions/bukchon.webp',
        altText: '北村韓屋村經典瓦舍坡道與遠山景致',
        imageCredit: 'chicTrip Official Demo Collection',
      },
      {
        id: 'day2-ikseondong',
        attractionName: '益善洞韓屋村',
        imagePath: '/images/seoul/attractions/ikseondong.webp',
        altText: '益善洞傳統韓屋結合復古文創小店的漫步街景',
        imageCredit: 'chicTrip Official Demo Collection',
      },
    ],
    routeImage: {
      imagePath: '/images/seoul/routes/day2.webp',
      altText: '首爾 Day 2 行程路線預覽圖：景福宮 → 北村韓屋村 → 益善洞茶室',
      title: 'Day 2 路線預覽：宮闕與韓屋聚落',
    },
  },
  3: {
    day: 3,
    coverImage: {
      imagePath: '/images/seoul/attractions/seongsu.webp',
      altText: '首爾 Day 3 封面：聖水洞紅磚工廠與流行快閃店街景',
      title: '潮流工業風咖啡聚落與綠意森呼吸',
    },
    attractions: [
      {
        id: 'day3-seongsu',
        attractionName: '聖水洞潮流聚落',
        imagePath: '/images/seoul/attractions/seongsu.webp',
        altText: '聖水洞紅磚廠房改造之咖啡選物店與設計快閃聚落',
        imageCredit: 'chicTrip Official Demo Collection',
      },
      {
        id: 'day3-seoul-forest',
        attractionName: '首爾林綠意步道',
        imagePath: '/images/seoul/attractions/seoul-forest.webp',
        altText: '首爾林廣闊林蔭草坪與秋季金黃樹影',
        imageCredit: 'chicTrip Official Demo Collection',
      },
    ],
    routeImage: {
      imagePath: '/images/seoul/routes/day3.webp',
      altText: '首爾 Day 3 行程路線預覽圖：地鐵 2 號線聖水站 → 咖啡快閃街 → 首爾林',
      title: 'Day 3 路線預覽：聖水洞至首爾林',
    },
  },
  4: {
    day: 4,
    coverImage: {
      imagePath: '/images/seoul/attractions/n-seoul-tower.webp',
      altText: '首爾 Day 4 封面：南山首爾塔標誌性塔身與秋日藍天',
      title: '經典購物繁華與南山浪漫夜景',
    },
    attractions: [
      {
        id: 'day4-myeongdong',
        attractionName: '明洞商圈購物街',
        imagePath: '/images/seoul/attractions/myeongdong.webp',
        altText: '明洞繁榮熱鬧的彩妝名品步行街與退稅商場',
        imageCredit: 'chicTrip Official Demo Collection',
      },
      {
        id: 'day4-n-seoul-tower',
        attractionName: '南山首爾塔 (N Seoul Tower)',
        imagePath: '/images/seoul/attractions/n-seoul-tower.webp',
        altText: '南山首爾塔觀景台與首爾全景鳥瞰起點',
        imageCredit: 'chicTrip Official Demo Collection',
      },
    ],
    routeImage: {
      imagePath: '/images/seoul/routes/day4.webp',
      altText: '首爾 Day 4 行程路線預覽圖：明洞商圈退稅 → 南山纜車 → 首爾塔觀景',
      title: 'Day 4 路線預覽：明洞至南山首爾塔',
    },
  },
  5: {
    day: 5,
    coverImage: {
      imagePath: '/images/seoul/attractions/airport.webp',
      altText: '首爾 Day 5 封面：仁川國際機場啟程返台航廈景致',
      title: '最後巡禮與溫馨返程',
    },
    attractions: [
      {
        id: 'day5-hongdae',
        attractionName: '弘大延南洞林蔭道',
        imagePath: '/images/seoul/attractions/hongdae.webp',
        altText: '弘大京義線林蔭道清新早午餐散策街區',
        imageCredit: 'chicTrip Official Demo Collection',
      },
      {
        id: 'day5-airport',
        attractionName: '仁川國際機場 (返程)',
        imagePath: '/images/seoul/attractions/airport.webp',
        altText: '仁川國際機場報到櫃檯與免稅提領區',
        imageCredit: 'chicTrip Official Demo Collection',
      },
    ],
    routeImage: {
      imagePath: '/images/seoul/routes/day5.webp',
      altText: '首爾 Day 5 行程路線預覽圖：弘大住宿 → AREX 快線 → 仁川機場登機',
      title: 'Day 5 路線預覽：弘大至仁川機場返程',
    },
  },
};

/**
 * 取得指定天數的圖片設定
 */
export function getSeoulDayImages(dayNumber: number): DayImageConfig {
  return SEOUL_IMAGE_MANIFEST[dayNumber] || SEOUL_IMAGE_MANIFEST[1];
}

/**
 * 取得所有不重複的 9 張景點圖片路徑（用於離線快取預載）
 */
export function getAllSeoulAttractionImagePaths(): string[] {
  const paths = new Set<string>();
  Object.values(SEOUL_IMAGE_MANIFEST).forEach((dayConfig) => {
    paths.add(dayConfig.coverImage.imagePath);
    dayConfig.attractions.forEach((attraction) => {
      paths.add(attraction.imagePath);
    });
  });
  return Array.from(paths);
}

/**
 * 取得所有 5 天的路線圖片路徑
 */
export function getAllSeoulRouteImagePaths(): string[] {
  return Object.values(SEOUL_IMAGE_MANIFEST).map((dayConfig) => dayConfig.routeImage.imagePath);
}

/**
 * 取得全部應納入離線檢查之所有首爾圖片路徑
 */
export function getAllSeoulItineraryImagePaths(): string[] {
  return [...getAllSeoulAttractionImagePaths(), ...getAllSeoulRouteImagePaths()];
}
