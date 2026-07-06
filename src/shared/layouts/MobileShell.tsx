
export default function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-shell-wrapper">
      <div className="mobile-shell">
        {children}
      </div>
    </div>
  );
}