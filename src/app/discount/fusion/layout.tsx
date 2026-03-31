export default function FusionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fusion-standalone">
      <style>{`
        .fusion-standalone { position: relative; }
        .fusion-standalone ~ footer,
        header, nav, .announcement-banner { display: none !important; }
      `}</style>
      {children}
    </div>
  );
}
