'use client';

import { useState } from 'react';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch('https://formsubmit.co/ajax/neil@anytime-soccer.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again or email us directly at neil@anytime-soccer.com');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="text-4xl mb-3">&#9989;</div>
        <h3 className="text-xl font-bold text-navy mb-2">Message Sent!</h3>
        <p className="text-gray text-sm">Thanks for reaching out. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot for spam */}
      <input type="text" name="_honey" className="hidden" />
      {/* Disable captcha page redirect */}
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="New Contact Form Submission - anytime-soccer.com" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">First Name <span className="text-red">*</span></label>
          <input type="text" name="firstName" required className={inputClass} placeholder="John" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Last Name <span className="text-red">*</span></label>
          <input type="text" name="lastName" required className={inputClass} placeholder="Smith" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1">Email <span className="text-red">*</span></label>
        <input type="email" name="email" required className={inputClass} placeholder="john@example.com" />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1">Subject</label>
        <input type="text" name="subject" className={inputClass} placeholder="How can we help?" />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1">Message <span className="text-red">*</span></label>
        <textarea name="message" required rows={5} className={inputClass + ' resize-none'} placeholder="Tell us what's on your mind..." />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 rounded-xl bg-red text-white font-semibold hover:bg-red-dark transition-colors disabled:opacity-60"
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
