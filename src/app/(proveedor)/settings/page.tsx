import SettingPage from '@/modules/proveedor/pages/SettingsPage';
import Navbar from '@/shared/components/Navbar';
export const metadata = {
    title: 'Festiva - Configuración',
    description: '',
};

export default function Page() {
  return (
    <main className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
      <SettingPage/>
      <Navbar />
    </main>
  );
}