import { FrameBlok } from '@/types/blok';

export function getGridClasses(blok: FrameBlok) {
  const { mobile_ar_width, mobile_ar_height, desktop_ar_width, desktop_ar_height } = blok;

  const mobileColSpan = `col-span-${mobile_ar_width}`;
  const mobileRowSpan = `row-span-${mobile_ar_height}`;

  const desktopColSpan = `md:col-span-${desktop_ar_width}`;
  const desktopRowSpan = `md:col-row-${desktop_ar_height}`;

  console.log(mobileColSpan, mobileRowSpan, desktopColSpan, desktopRowSpan);

  return `${mobileColSpan} ${mobileRowSpan} ${desktopColSpan} ${desktopRowSpan}`;
}
