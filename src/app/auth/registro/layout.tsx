// src/app/(auth)/layout.tsx
import { RegisterBackButton } from '@/shared/components/RegisterBackButton';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <RegisterBackButton />
      
      <main className="flex-1 mt-6">
        {children}
      </main>
    </div>
  );
}