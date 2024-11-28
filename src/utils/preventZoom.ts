import { useEffect } from 'react';

export default function usePreventZoom(prevent: boolean) {
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const originalContent = viewport.getAttribute('content');

      if (prevent) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
      } else if (originalContent) {
        viewport.setAttribute('content', originalContent);
      }

      return () => {
        if (originalContent) {
          viewport.setAttribute('content', originalContent);
        }
      };
    }
  }, [prevent]);
}
