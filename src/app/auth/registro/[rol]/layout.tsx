import { RegisterBackButton } from '@/shared/components/RegisterBackButton';

export default function AuthRolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col">
      <div>
        <RegisterBackButton />
      </div>
      <main className="flex-1 overflow-y-auto no-scrollbar mt-8 pb-8">
        {children}
      </main>
    </div>
  );
}