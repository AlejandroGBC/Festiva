export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto h-full flex flex-col relative overflow-hidden">
      <main className="flex-1 flex flex-col min-h-0 relative">
        {children}
      </main>
    </div>
  );
}