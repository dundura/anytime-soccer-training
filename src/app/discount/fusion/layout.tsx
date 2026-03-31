export default function FusionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fusion-standalone">
      <style>{`
        body > header, body > nav,
        body > .min-h-screen > header,
        body > div:first-child:not(.fusion-standalone),
        .bg-red.text-white.text-center { display: none !important; }
      `}</style>
      {children}
    </div>
  );
}
