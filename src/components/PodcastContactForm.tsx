'use client';

import { useState } from 'react';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red';

export default function PodcastContactForm() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Podcast Guest Request from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`);
    window.location.href = `mailto:neil@anytime-soccer.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center py-6">
        <div className="text-3xl mb-3">&#9989;</div>
        <h3 className="text-lg font-bold text-navy mb-1">Message Ready!</h3>
        <p className="text-gray text-sm">Your email client should have opened. Send the message to complete your request.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Your Name <span className="text-red">*</span></label>
        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Smith" />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Your Email <span className="text-red">*</span></label>
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="john@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Topic / Expertise</label>
        <input type="text" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={inputClass} placeholder="e.g. Youth coaching, college recruiting..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Message <span className="text-red">*</span></label>
        <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass + ' resize-none'} placeholder="Tell the host why you'd be a great guest..." />
      </div>
      <button type="submit" className="w-full py-3 rounded-xl bg-red text-white font-semibold hover:bg-red-dark transition-colors">
        Send Guest Request
      </button>
    </form>
  );
}
