import EditProviderProfilePage from '@/modules/proveedor/pages/EditProviderProfilePage';
import Navbar from '@/shared/components/Navbar';

export const metadata = {
    title: 'Festiva - Mi Perfil',
    description: '',
};

export default function Page() {
  return (
    <main className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
      <EditProviderProfilePage />
      <Navbar/>
    </main>
  );
}