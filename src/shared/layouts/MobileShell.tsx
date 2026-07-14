
export default function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-shell-wrapper">
      {/* <div className="mobile-shell-scroll">
        {children}
      </div> */}
      <div className="mobile-shell relative min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}