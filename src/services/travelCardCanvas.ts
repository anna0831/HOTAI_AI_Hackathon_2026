import type { TravelDnaCardSample } from '../data/travelDnaCards';
import { getCachedImageUrl } from './offlineAssetCache';

/**
 * 繪製 1080 × 1920 高解析度 Travel DNA 限動分享卡 PNG
 */
export async function renderTravelDnaCardToBlob(
  card: TravelDnaCardSample,
  forceFallbackGradient = false
): Promise<{ blob: Blob; isFallback: boolean }> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // Ensure system & web fonts are ready for sharp text rendering
  try {
    await document.fonts?.ready;
  } catch {
    // Ignore font loading errors if unsupported
  }

  let isFallback = forceFallbackGradient;

  // 1. Draw Background (Image or Gradient Fallback)
  if (!forceFallbackGradient && card.imageSrc) {
    try {
      const resolvedSrc = await getCachedImageUrl(card.imageSrc);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Image failed to load'));
        img.src = resolvedSrc;
      });

      if (resolvedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(resolvedSrc);
      }

      // Draw image object-fit: cover into 1080 x 1920
      const imgAspect = img.width / img.height;
      const targetAspect = 1080 / 1920;

      let sx = 0;
      let sy = 0;
      let sWidth = img.width;
      let sHeight = img.height;

      if (imgAspect > targetAspect) {
        // Image is wider, crop horizontal sides
        sWidth = img.height * targetAspect;
        sx = (img.width - sWidth) / 2;
      } else {
        // Image is taller, crop vertical top/bottom
        sHeight = img.width / targetAspect;
        sy = (img.height - sHeight) / 2;
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, 1080, 1920);

      // Dark gradient overlay for extreme readability (keeping safe zones)
      const overlayGrad = ctx.createLinearGradient(0, 0, 0, 1920);
      overlayGrad.addColorStop(0, 'rgba(15, 23, 42, 0.45)'); // Top status area
      overlayGrad.addColorStop(0.35, 'rgba(15, 23, 42, 0.15)'); // Center photo view
      overlayGrad.addColorStop(0.55, 'rgba(15, 23, 42, 0.55)');
      overlayGrad.addColorStop(0.82, 'rgba(15, 23, 42, 0.92)'); // Text background
      overlayGrad.addColorStop(1, 'rgba(15, 23, 42, 0.98)'); // Bottom bar safe area
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, 0, 1080, 1920);
    } catch {
      isFallback = true;
    }
  } else {
    isFallback = true;
  }

  if (isFallback) {
    // CSS gradient fallback
    const grad = ctx.createLinearGradient(0, 0, 1080, 1920);
    if (card.id === 'urban-seoul') {
      grad.addColorStop(0, '#00AEEF');
      grad.addColorStop(0.5, '#143D5C');
      grad.addColorStop(1, '#0B1E2E');
    } else if (card.id === 'food-osaka') {
      grad.addColorStop(0, '#FF8614');
      grad.addColorStop(0.5, '#C2410C');
      grad.addColorStop(1, '#1C1917');
    } else {
      grad.addColorStop(0, '#18B46B');
      grad.addColorStop(0.5, '#047857');
      grad.addColorStop(1, '#064E3B');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Badge indicating "背景圖待補"
    drawPill(ctx, 540, 240, '背景圖待補', {
      bg: 'rgba(255, 196, 0, 0.25)',
      text: '#FFC400',
      border: '#FFC400',
      fontSize: 26,
      paddingX: 28,
      paddingY: 12,
      center: true,
    });
  } else {
    // Badge indicating "Prototype Generated Assets"
    drawPill(ctx, 540, 240, 'Prototype Generated Assets', {
      bg: 'rgba(15, 23, 42, 0.65)',
      text: '#F8FAFC',
      border: 'rgba(255, 255, 255, 0.35)',
      fontSize: 24,
      paddingX: 26,
      paddingY: 10,
      center: true,
    });
  }

  // 2. Safe Area Top Branding (around Y: 330px, 避開最上方狀態與關閉鈕)
  const headerY = 330;

  // Draw ChicTrip Brand Mark
  ctx.save();
  ctx.font = '900 46px "PingFang TC", "Microsoft JhengHei", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('去趣', 90, headerY);

  const brandWidth = ctx.measureText('去趣').width;
  ctx.font = '800 46px "Outfit", "PingFang TC", sans-serif';
  ctx.fillStyle = '#00AEEF';
  ctx.fillText('chicTrip', 90 + brandWidth + 14, headerY);
  ctx.restore();

  // Destination Pill on the right
  drawPill(ctx, 990, headerY - 14, `📍 ${card.destination}`, {
    bg: 'rgba(255, 255, 255, 0.15)',
    text: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.3)',
    fontSize: 28,
    paddingX: 28,
    paddingY: 12,
    alignRight: true,
  });

  // 3. Central Content Card (Y: 940px to 1700px, 避開底部回覆列與上緣)
  const cardBoxX = 80;
  const cardBoxY = 940;
  const cardBoxW = 920;
  const cardBoxH = 760;

  // Frosted White Card Container
  drawRoundedRect(ctx, cardBoxX, cardBoxY, cardBoxW, cardBoxH, 44, 'rgba(255, 255, 255, 0.95)');
  // Top Chic accent line
  drawRoundedTopBar(ctx, cardBoxX, cardBoxY, cardBoxW, 14, 44, card.themeColor);

  // Content Inside Card
  const innerX = cardBoxX + 60;
  let currentY = cardBoxY + 80;

  // Traveler Badge + DNA Type Pill
  drawPill(ctx, innerX, currentY, `★ 旅人：${card.name}・Travel DNA`, {
    bg: 'rgba(0, 174, 239, 0.12)',
    text: '#00AEEF',
    border: 'rgba(0, 174, 239, 0.3)',
    fontSize: 26,
    paddingX: 24,
    paddingY: 10,
  });

  currentY += 80;

  // Title: 我的旅行 DNA｜城市探險型
  ctx.save();
  ctx.font = '900 52px "PingFang TC", "Microsoft JhengHei", sans-serif';
  ctx.fillStyle = '#171B28';
  ctx.fillText(card.title, innerX, currentY);
  ctx.restore();

  currentY += 85;

  // Quote Box
  drawRoundedRect(ctx, innerX, currentY - 35, cardBoxW - 120, 110, 24, '#F4F7FB');
  // Left border accent
  ctx.fillStyle = card.themeColor;
  ctx.fillRect(innerX, currentY - 35, 8, 110);

  ctx.save();
  ctx.font = '600 36px "PingFang TC", "Microsoft JhengHei", sans-serif';
  ctx.fillStyle = '#143D5C';
  ctx.fillText(`「${card.quote}」`, innerX + 36, currentY + 34);
  ctx.restore();

  currentY += 135;

  // Tags
  let tagX = innerX;
  ctx.font = '700 28px "PingFang TC", "Microsoft JhengHei", sans-serif';
  for (const tag of card.tags) {
    const tagText = `#${tag}`;
    const textWidth = ctx.measureText(tagText).width;
    const pillW = textWidth + 44;
    drawRoundedRect(ctx, tagX, currentY - 26, pillW, 56, 18, '#F4F7FB');
    // Border
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#143D5C';
    ctx.fillText(tagText, tagX + 22, currentY + 12);
    tagX += pillW + 18;
  }

  currentY += 100;

  // Divider
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(innerX, currentY - 20);
  ctx.lineTo(innerX + cardBoxW - 120, currentY - 20);
  ctx.stroke();

  // Referral Code Section
  const refBoxY = currentY;
  ctx.save();
  ctx.font = '700 26px "PingFang TC", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('專屬好友推薦碼', innerX, refBoxY + 16);

  ctx.font = '900 48px "Outfit", "Courier New", monospace';
  ctx.fillStyle = '#FF8614';
  ctx.fillText(card.referralCode, innerX, refBoxY + 70);

  // Label "示範推薦碼" right next to the code
  const codeWidth = ctx.measureText(card.referralCode).width;
  drawPill(ctx, innerX + codeWidth + 24, refBoxY + 48, '示範推薦碼', {
    bg: 'rgba(255, 134, 20, 0.12)',
    text: '#FF8614',
    border: 'rgba(255, 134, 20, 0.3)',
    fontSize: 24,
    paddingX: 20,
    paddingY: 8,
  });

  // Disclaimer text (示範推薦碼，無實際優惠)
  ctx.font = '500 24px "PingFang TC", "Microsoft JhengHei", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText(
    '示範推薦碼，無實際優惠',
    innerX,
    refBoxY + 118
  );
  ctx.restore();

  // Bottom Branding & Footer (Safe area: Y 1760px)
  ctx.save();
  ctx.font = '600 26px "PingFang TC", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.textAlign = 'center';
  ctx.fillText(
    '去趣 chicTrip × Offline AI Travel Companion・守護每一次出發',
    540,
    1770
  );
  ctx.restore();

  return new Promise<{ blob: Blob; isFallback: boolean }>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve({ blob, isFallback });
      } else {
        reject(new Error('Failed to create PNG blob from canvas'));
      }
    }, 'image/png');
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fillColor: string
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.restore();
}

function drawRoundedTopBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  barH: number,
  r: number,
  color: string
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + barH, r);
  ctx.lineTo(x + w, y + barH);
  ctx.lineTo(x, y + barH);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

interface PillOptions {
  bg: string;
  text: string;
  border?: string;
  fontSize: number;
  paddingX: number;
  paddingY: number;
  alignRight?: boolean;
  center?: boolean;
}

function drawPill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  opts: PillOptions
) {
  ctx.save();
  ctx.font = `800 ${opts.fontSize}px "PingFang TC", sans-serif`;
  const textMetrics = ctx.measureText(text);
  const w = textMetrics.width + opts.paddingX * 2;
  const h = opts.fontSize + opts.paddingY * 2;

  let startX = x;
  if (opts.alignRight) {
    startX = x - w;
  } else if (opts.center) {
    startX = x - w / 2;
  }

  const startY = y - h / 2;

  drawRoundedRect(ctx, startX, startY, w, h, h / 2, opts.bg);

  if (opts.border) {
    ctx.strokeStyle = opts.border;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.fillStyle = opts.text;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, startX + opts.paddingX, y + 2);
  ctx.restore();
}
