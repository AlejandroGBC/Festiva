import Navbar from "@/shared/components/Navbar";
import Header from "@/shared/components/Header";

export default function ClienteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex-1 pb-4 p-5">
                {children}
            </main>

            <Navbar />
        </div>
    );
}