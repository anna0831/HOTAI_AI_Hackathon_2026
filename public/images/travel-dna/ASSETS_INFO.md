# Travel DNA Background Assets Documentation

標示：**Prototype Generated Assets**

本專案使用 Antigravity AI 內建圖片生成工具預先生成之 9:16 本地背景圖，提供旅後「Travel DNA 限動分享卡」作為示範情境背景。背景圖純淨無字、無商標與假介面，所有文字與品牌資訊皆由前端 HTML / CSS / Canvas 動態疊加。

## 資產明細

### 1. urban-seoul.webp
- **示範方案**：A. 城市探險型｜首爾
- **檔案路徑**：`/images/travel-dna/urban-seoul.webp`
- **生成工具**：Antigravity `generate_image` Tool
- **標註資訊**：Prototype Generated Assets
- **提示詞 (Prompt)**：
  > `Vibrant and aesthetic vertical travel photography of Seoul South Korea, charming trendy Seongsu-dong cafe street with modern architecture, brick facade, stylish boutique coffee shop in warm afternoon sunlight, bright and clean cityscape, photorealistic, no people in close-up, no text, no letters, no logos, 9:16 vertical orientation`
- **視覺方向**：首爾街景、咖啡店與現代建築，活潑明亮。

### 2. food-osaka.webp
- **示範方案**：B. 美食療癒型｜大阪
- **檔案路徑**：`/images/travel-dna/food-osaka.webp`
- **生成工具**：Antigravity `generate_image` Tool
- **標註資訊**：Prototype Generated Assets
- **提示詞 (Prompt)**：
  > `Warm and appetizing vertical travel photography of Osaka Japan street food scene, cozy traditional Japanese food stall and retro lantern alley, warm wooden market shop atmosphere, glowing bokeh lights, delicious Japanese dining ambiance, soft warm tones, photorealistic, no text, no letters, no logos, 9:16 vertical orientation`
- **視覺方向**：大阪市場、料理與溫暖店鋪，柔和暖色。

### 3. nature-hokkaido.webp
- **示範方案**：C. 自然慢遊型｜北海道
- **檔案路徑**：`/images/travel-dna/nature-hokkaido.webp`
- **生成工具**：Antigravity `generate_image` Tool
- **標註資訊**：Prototype Generated Assets
- **提示詞 (Prompt)**：
  > `Serene and scenic vertical travel photography of Hokkaido Japan nature landscape, lush green pine forest rolling into tranquil coastal hills and mountains, calm blue sky with soft clouds, crisp peaceful and refreshing atmosphere, photorealistic, no text, no letters, no logos, 9:16 vertical orientation`
- **視覺方向**：北海道山景、森林與海岸，清爽安靜。

## 備援機制 (Fallback)
若背景圖片遺失或載入失敗，系統將自動啟動 CSS 漸層備援，並顯示「背景圖待補」標籤，確保卡片依然可以完整預覽及下載 1080 × 1920 高解析度 PNG。
