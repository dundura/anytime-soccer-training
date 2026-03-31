'use client';

import { useEffect } from 'react';

export function InlineScriptRunner() {
  useEffect(() => {
    // Define toggleSection globally for inline onclick handlers in page content
    (window as unknown as Record<string, unknown>).toggleSection = function(header: HTMLElement) {
      const section = header.parentElement;
      if (section) section.classList.toggle('collapsed');
    };
  }, []);

  return null;
}
