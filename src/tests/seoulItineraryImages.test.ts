import { describe, it, expect } from 'vitest';
import {
  getSeoulDayImages,
  getAllSeoulAttractionImagePaths,
  getAllSeoulRouteImagePaths,
  getAllSeoulItineraryImagePaths,
} from '../data/seoulImageManifest';

describe('Seoul 5-Day Image Manifest', () => {
  it('should have all 5 days configured', () => {
    for (let day = 1; day <= 5; day++) {
      const config = getSeoulDayImages(day);
      expect(config).toBeDefined();
      expect(config.day).toBe(day);
      expect(config.coverImage.imagePath).toMatch(/^\/images\/seoul\/attractions\/[a-z0-9-]+\.webp$/);
      expect(config.coverImage.altText).toBeTruthy();
      expect(config.attractions.length).toBeGreaterThan(0);
      expect(config.routeImage.imagePath).toBe(`/images/seoul/routes/day${day}.webp`);
    }
  });

  it('should have exactly 9 unique attraction images reused across 5 days', () => {
    const attractionPaths = getAllSeoulAttractionImagePaths();
    expect(attractionPaths).toHaveLength(9);

    const expectedFilenames = [
      'airport.webp',
      'hongdae.webp',
      'gyeongbokgung.webp',
      'bukchon.webp',
      'ikseondong.webp',
      'seongsu.webp',
      'seoul-forest.webp',
      'myeongdong.webp',
      'n-seoul-tower.webp',
    ];

    expectedFilenames.forEach((filename) => {
      expect(attractionPaths).toContain(`/images/seoul/attractions/${filename}`);
    });
  });

  it('should correctly configure day-specific attractions', () => {
    // Day 1: airport, hongdae
    const day1 = getSeoulDayImages(1);
    expect(day1.attractions.map((a) => a.imagePath)).toEqual([
      '/images/seoul/attractions/airport.webp',
      '/images/seoul/attractions/hongdae.webp',
    ]);
    expect(day1.coverImage.imagePath).toBe('/images/seoul/attractions/hongdae.webp');

    // Day 2: gyeongbokgung, bukchon, ikseondong
    const day2 = getSeoulDayImages(2);
    expect(day2.attractions.map((a) => a.imagePath)).toEqual([
      '/images/seoul/attractions/gyeongbokgung.webp',
      '/images/seoul/attractions/bukchon.webp',
      '/images/seoul/attractions/ikseondong.webp',
    ]);
    expect(day2.coverImage.imagePath).toBe('/images/seoul/attractions/gyeongbokgung.webp');

    // Day 3: seongsu, seoul-forest
    const day3 = getSeoulDayImages(3);
    expect(day3.attractions.map((a) => a.imagePath)).toEqual([
      '/images/seoul/attractions/seongsu.webp',
      '/images/seoul/attractions/seoul-forest.webp',
    ]);
    expect(day3.coverImage.imagePath).toBe('/images/seoul/attractions/seongsu.webp');

    // Day 4: myeongdong, n-seoul-tower
    const day4 = getSeoulDayImages(4);
    expect(day4.attractions.map((a) => a.imagePath)).toEqual([
      '/images/seoul/attractions/myeongdong.webp',
      '/images/seoul/attractions/n-seoul-tower.webp',
    ]);
    expect(day4.coverImage.imagePath).toBe('/images/seoul/attractions/n-seoul-tower.webp');

    // Day 5: hongdae, airport
    const day5 = getSeoulDayImages(5);
    expect(day5.attractions.map((a) => a.imagePath)).toEqual([
      '/images/seoul/attractions/hongdae.webp',
      '/images/seoul/attractions/airport.webp',
    ]);
    expect(day5.coverImage.imagePath).toBe('/images/seoul/attractions/airport.webp');
  });

  it('should configure 5 route image paths correctly', () => {
    const routePaths = getAllSeoulRouteImagePaths();
    expect(routePaths).toEqual([
      '/images/seoul/routes/day1.webp',
      '/images/seoul/routes/day2.webp',
      '/images/seoul/routes/day3.webp',
      '/images/seoul/routes/day4.webp',
      '/images/seoul/routes/day5.webp',
    ]);
  });

  it('should return total 14 paths in getAllSeoulItineraryImagePaths (9 attractions + 5 routes)', () => {
    const allPaths = getAllSeoulItineraryImagePaths();
    expect(allPaths).toHaveLength(14);
  });
});
