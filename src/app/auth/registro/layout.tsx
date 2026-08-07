export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full max-w-md mx-auto flex flex-col">
      {children}
    </div>
  );
}