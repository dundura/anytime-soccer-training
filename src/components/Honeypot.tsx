'use client';

import { useRef } from 'react';

/**
 * A field a person never sees and a bot fills in anyway.
 *
 * Bots parse the HTML and complete every input they find; a real visitor never
 * touches this one, because it is off-screen and out of the tab order. The
 * server drops any submission that arrives with it filled.
 *
 * Positioned off-screen rather than display:none — some bots specifically skip
 * hidden inputs, and this one should look ordinary to them.
 *
 * `useHoneypot` returns the ref and a reader, so a form can do:
 *   const hp = useHoneypot();
 *   ... <Honeypot inputRef={hp.ref} />
 *   body: JSON.stringify({ ..., website: hp.value() })
 */
export function useHoneypot() {
  const ref = useRef<HTMLInputElement>(null);
  return { ref, value: () => ref.current?.value || '' };
}

export default function Honeypot({ inputRef }: { inputRef: React.RefObject<HTMLInputElement | null> }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
      <label htmlFor="website-url">Website</label>
      <input
        ref={inputRef}
        id="website-url"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
