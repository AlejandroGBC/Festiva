
export default function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-shell-wrapper">
      <div className="mobile-shell relative h-screen max-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}