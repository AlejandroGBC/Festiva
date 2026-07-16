export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto h-full justify-center flex flex-col">
      {children}
    </div>
  );
}