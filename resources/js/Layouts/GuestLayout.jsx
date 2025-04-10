import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-white pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    {/* <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" /> */}
                    <div className="w-32 mx-auto">
                        <img src="/storage/images/logo.png" alt="" />
                    </div>
                </Link>
                <h2 className="w-full pl-[280px] pr-[280px] mt-5 break-words text-center text-md font-bold">
                    Sistem Informasi Manajemen Terintegrasi Universitas
                    Perjuangan (SIMANTAP)
                </h2>
            </div>

            <div className="mt-1 w-full overflow-hidden bg-white px-6 py-4  sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
