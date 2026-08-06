import { RegisterBackButton } from '@/shared/components/RegisterBackButton';

export default function AuthRolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh max-h-dvh overflow-y-auto max-w-md mx-auto flex flex-col">
      <RegisterBackButton />
<<<<<<< HEAD

      <main className="mt-10 pb-10">
=======
      
      <main className="flex-1 overflow-y-auto no-scrollbar">
>>>>>>> upstream/main
        {children}
      </main>
    </div>
  );
}