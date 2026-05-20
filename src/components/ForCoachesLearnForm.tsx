"use client";

import { useState } from "react";

export default function ForCoachesLearnForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/coach-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: firstName, email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-8 text-center max-w-[440px]">
        <div className="text-4xl mb-3">&#9989;</div>
        <h3 className="text-white font-bold text-xl mb-2">You&apos;re in!</h3>
        <p className="text-white/75 text-base leading-relaxed">
          Check your inbox — your first email is on its way. We&apos;ll walk you through everything step by step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[440px]">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="w-full px-4 py-4 rounded-xl text-navy font-semibold text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red"
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-4 rounded-xl text-navy font-semibold text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending…" : "Explore the Program →"}
      </button>
      {status === "error" && (
        <p className="text-red-300 text-sm text-center">Something went wrong — please try again.</p>
      )}
      <p className="text-white/50 text-xs text-center">No credit card. No commitment. Unsubscribe anytime.</p>
    </form>
  );
}
