import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import { ArrowRightToLine } from "lucide-react";

export default function Header({ onToggleSidebar }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    console.log(auth.user);
    const user = auth?.user;

    const handleLogout = () => {
        const routeName = url === "/logindosen" ? "logoutdosen" : "logout";
        Inertia.post(route(routeName)); // Kirim POST ke route logout Laravel
    };

    const homePage = () => {
        Inertia.get(route("home"));
    };

    return (
        <div className="w-full pt-5 pb-5 pl-7 pr-7 bg-white">
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    {/* hamburger menu */}
                    <button
                        onClick={onToggleSidebar}
                        className="flex flex-col justify-center items-center w-6 h-6 gap-1 group"
                    >
                        <span className="w-6 h-0.5 bg-green-600 group-hover:bg-green-800 transition-all"></span>
                        <span className="w-6 h-0.5 bg-green-600 group-hover:bg-green-800 transition-all"></span>
                        <span className="w-6 h-0.5 bg-green-600 group-hover:bg-green-800 transition-all"></span>
                    </button>
                    <h2
                        onClick={homePage}
                        className="cursor-pointer text-2xl font-bold text-green-600"
                    >
                        Simantap
                    </h2>
                </div>

                <div className="flex gap-3 items-center">
                    <h2 className="text-lg font-bold text-green-600">
                        {user ? user.nama_lengkap : "Guest"}
                    </h2>
                    <button onClick={handleLogout}>
                        <ArrowRightToLine
                            color="#00a63e"
                            className="cursor-pointer"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
