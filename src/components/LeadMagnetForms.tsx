'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { LEAD_MAGNETS } from '@/lib/leadMagnets';

/**
 * Mounts a signup form into every lead-magnet slot on the page.
 *
 * Most of these pages arrive as one block of HTML through
 * dangerouslySetInnerHTML, so there is nowhere to put JSX in the middle of
 * them. `replaceLeadForms` leaves an empty div where each GHL embed used to be
 * and this portals a form into each one — a single component covering every
 * page, with no page content hand-edited.
 */
export default function LeadMagnetForms() {
  const [slots, setSlots] = useState<{ el: HTMLElement; formId: string }[]>([]);

  useEffect(() => {
    const found: { el: HTMLElement; formId: string }[] = [];
    document.querySelectorAll<HTMLElement>('[data-lead-form]').forEach((el) => {
      const formId = el.dataset.leadForm || '';
      if (LEAD_MAGNETS[formId]) found.push({ el, formId });
    });
    setSlots(found);
  }, []);

  if (slots.length === 0) return null;

  return (
    <>
      {slots.map(({ el, formId }, i) => createPortal(<LeadMagnetForm formId={formId} />, el, `${formId}-${i}`))}
    </>
  );
}
