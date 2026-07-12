export default function ClienteLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="h-screen flex flex-col">
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}