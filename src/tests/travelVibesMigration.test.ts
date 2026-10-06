import { describe, it, expect } from 'vitest';
import {
  migrateSelectedVibes,
  buildProfileFromVibes,
  TRAVEL_VIBE_OPTIONS,
} from '../data/travelVibes';

describe('Travel Vibes Multi-selection and Data Migration', () => {
  describe('Data Migration', () => {
    it('should migrate single legacy string value into single-element array', () => {
      const migrated = migrateSelectedVibes('cafe_culture');
      expect(migrated).toEqual(['cafe_culture']);
    });

    it('should migrate empty string or whitespace into empty array', () => {
      expect(migrateSelectedVibes('')).toEqual([]);
      expect(migrateSelectedVibes('   ')).toEqual([]);
    });

    it('should migrate null or undefined into empty array', () => {
      expect(migrateSelectedVibes(null)).toEqual([]);
      expect(migrateSelectedVibes(undefined)).toEqual([]);
    });

    it('should preserve and filter valid arrays', () => {
      const input = ['cafe_culture', '', 'history_culture', '   '];
      expect(migrateSelectedVibes(input)).toEqual(['cafe_culture', 'history_culture']);
    });
  });

  describe('Multi-selection and Profile Generation', () => {
    it('should aggregate tags from all selected vibes without dropping any', () => {
      const selected = ['cafe_culture', 'history_culture'];
      const profile = buildProfileFromVibes(selected);

      // Check tags from both options are included
      expect(profile.matched_tags).toContain('重度地圖導航');
      expect(profile.matched_tags).toContain('景福宮古蹟巡禮');
      expect(profile.matched_tags).toContain('北村韓屋古韻');
      expect(profile.matched_tags.length).toBeGreaterThanOrEqual(5);
    });

    it('should reflect multiple selections in profile description and title', () => {
      const selected = ['cafe_culture', 'history_culture'];
      const profile = buildProfileFromVibes(selected);

      expect(profile.description).toContain('弘大＆聖水洞漫步');
      expect(profile.description).toContain('景福宮與韓屋村');
      expect(profile.type).toContain('文化探索型旅人');
    });

    it('should handle single selection correctly', () => {
      const selected = ['foodie_market'];
      const profile = buildProfileFromVibes(selected);

      expect(profile.matched_tags).toContain('在地市場探索');
      expect(profile.type).toContain('美食品鑑型旅人');
    });

    it('should fallback gracefully when empty array is provided', () => {
      const profile = buildProfileFromVibes([]);
      expect(profile.matched_tags.length).toBeGreaterThan(0);
      expect(profile.recommended_plan_id).toBe('kr-5d-daily2gb');
    });

    it('should provide at least 4 available vibe options with emojis and tags', () => {
      expect(TRAVEL_VIBE_OPTIONS.length).toBeGreaterThanOrEqual(4);
      for (const opt of TRAVEL_VIBE_OPTIONS) {
        expect(opt.id).toBeTruthy();
        expect(opt.title).toBeTruthy();
        expect(opt.tags.length).toBeGreaterThan(0);
      }
    });
  });
});
