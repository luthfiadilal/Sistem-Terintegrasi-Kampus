import Header from "@/Components/Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function AuthenticatedLayout({ children }) {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="scroll-smooth flex flex-col h-screen overflow-hidden">
            <Header onToggleSidebar={toggleSidebar} />
            <div className="flex flex-1 bg-white overflow-hidden">
                <div
                    className={`transition-all duration-[800ms] ${
                        showSidebar ? "w-64" : "w-0"
                    }`}
                >
                    {showSidebar && <Sidebar />}
                </div>
                <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}
