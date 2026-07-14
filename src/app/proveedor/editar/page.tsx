'use client';

import EditProviderProfilePage from '@/modules/proveedor/perfil/components/EditProviderProfilePage';
import Navbar from '@/shared/components/Navbar';

export default function Page() {
  return (
    <main>
      <EditProviderProfilePage />
      <Navbar />
    </main>
  );
}