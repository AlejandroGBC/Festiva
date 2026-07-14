export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}