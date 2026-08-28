"use client";

import { useEffect } from "react";

export default function GuestPlayingContent() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/yLNAlo4U2OMrW3ROvWzU"
        style={{ width: "100%", height: "800px", border: "none", borderRadius: "3px" }}
        id="inline-yLNAlo4U2OMrW3ROvWzU"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Guest Player Ebook"
        data-height="800"
        data-layout-iframe-id="inline-yLNAlo4U2OMrW3ROvWzU"
        data-form-id="yLNAlo4U2OMrW3ROvWzU"
        title="Guest Player Ebook"
        scrolling="no"
      />
    </div>
  );
}
