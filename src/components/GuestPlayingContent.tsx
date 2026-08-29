"use client";

import LeadMagnetForm from "@/components/LeadMagnetForm";

/**
 * The guest playing signup.
 *
 * Every other magnet's form arrives as HTML through dangerouslySetInnerHTML and
 * is swapped out by `replaceLeadForms`. This one is written as JSX, so it can
 * render the form component directly and needs no slot or portal.
 */
export default function GuestPlayingContent() {
  return (
    <div className="w-full">
      <LeadMagnetForm formId="yLNAlo4U2OMrW3ROvWzU" />
    </div>
  );
}
