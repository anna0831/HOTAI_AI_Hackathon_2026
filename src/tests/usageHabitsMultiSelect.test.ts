import { describe, it, expect } from 'vitest';
import { buildProfileFromVibes } from '../data/travelVibes';

describe('Overseas Usage Habits Multi-selection and Profile Integration', () => {
  it('should support selecting only the first habit (photo_map)', () => {
    const habits = ['photo_map'];
    const profile = buildProfileFromVibes(['cafe_culture'], habits);

    expect(profile.usage_habits).toEqual(['photo_map']);
    expect(profile.matched_tags).toContain('重度地圖導航');
    expect(profile.description).toContain('極度依賴地圖定位與即時拍照打卡');
    expect(profile.recommended_plan_id).toBe('kr-5d-daily2gb');
  });

  it('should support selecting only the second habit (safety_offline)', () => {
    const habits = ['safety_offline'];
    const profile = buildProfileFromVibes(['cafe_culture'], habits);

    expect(profile.usage_habits).toEqual(['safety_offline']);
    expect(profile.matched_tags).toContain('落地安心守護');
    expect(profile.description).toContain('首重抵達仁川機場後離線查住宿交通與緊急排錯');
    expect(profile.recommended_plan_id).toBe('kr-5d-daily2gb');
  });

  it('should support simultaneously selecting both habits (photo_map + safety_offline)', () => {
    const habits = ['photo_map', 'safety_offline'];
    const profile = buildProfileFromVibes(['cafe_culture'], habits);

    expect(profile.usage_habits).toEqual(['photo_map', 'safety_offline']);
    // Both tags included
    expect(profile.matched_tags).toContain('重度地圖導航');
    expect(profile.matched_tags).toContain('落地安心守護');
    // Description accommodates both preferences seamlessly
    expect(profile.description).toContain('兼顧地圖導航、即時打卡與落地離線守護');
    expect(profile.recommended_plan_id).toBe('kr-5d-daily2gb');
  });

  it('should support unselecting options and fallback gracefully to default', () => {
    const habits: string[] = [];
    const profile = buildProfileFromVibes(['cafe_culture'], habits);

    expect(profile.usage_habits).toBeDefined();
    expect(profile.recommended_plan_id).toBe('kr-5d-daily2gb');
  });

  it('should support alias identifiers (map and offline)', () => {
    const habits = ['map', 'offline'];
    const profile = buildProfileFromVibes(['cafe_culture'], habits);

    expect(profile.usage_habits).toEqual(['map', 'offline']);
    expect(profile.matched_tags).toContain('重度地圖導航');
    expect(profile.matched_tags).toContain('落地安心守護');
    expect(profile.recommended_plan_id).toBe('kr-5d-daily2gb');
  });
});
