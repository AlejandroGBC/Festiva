'use client';

import { useRouter } from 'next/navigation';

export const RegisterBackButton = () => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="flex items-center gap-2 text-festiva-midnight-blue font-medium hover:opacity-70 transition-opacity"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      Volver
    </button>
  );
};