// src/app/(auth)/layout.tsx
import { RegisterBackButton } from '@/shared/components/RegisterBackButton';

export default function AuthRolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto h-full flex flex-col">
      <RegisterBackButton />
      
      <main className="mt-10">
        {children}
      </main>
    </div>
  );
}