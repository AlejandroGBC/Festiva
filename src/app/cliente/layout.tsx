import Navbar from "@/shared/components/Navbar";

export default function ClienteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 pb-4 p-5">
                {children}
            </main>

            <Navbar />
        </div>
    );
}