
export default function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-shell-wrapper">
      <div className="mobile-shell">
        <div className="mobile-shell-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}