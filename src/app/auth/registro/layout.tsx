export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh max-h-dvh overflow-y-auto max-w-md mx-auto justify-center flex flex-col">
      {children}
    </div>
  );
}