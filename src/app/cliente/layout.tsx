"use client";

import { useState } from "react";
import Navbar from "@/shared/components/Navbar";
import Header from "@/shared/components/Header";
import Sidebar from "@/shared/components/Sidebar";

export default function ClienteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="flex-1 pb-4 p-5">
                {children}
            </main>

            <Navbar />
        </div>
    );
}