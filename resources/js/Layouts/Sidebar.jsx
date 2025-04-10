import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CreditCard, FileText } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { router, usePage } from "@inertiajs/react";

export default function Sidebar({ children }) {
    const { props } = usePage();
    const userGuard = props.auth?.guard;
    console.log(props.auth);
    console.log("User Aktif:", userGuard);
    console.log("Isi props.auth:", props.auth);

    const [openMenus, setOpenMenus] = useState({
        Akademik: false,
        Keuangan: false,
        Panduan: false,
    });

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* <Header /> */}
            <div className="bg-green-300 flex">
                <div className="bg-white text-gray-800 w-64 p-5 h-screen shadow-md">
                    <ul>
                        {/* Akademik */}
                        <li className="">
                            <div
                                className="pt-3 pb-3 pr-2 pl-2 cursor-pointer flex items-center justify-between rounded-lg hover:bg-green-200 font-bold"
                                onClick={() => toggleMenu("Akademik")}
                            >
                                <div className="flex items-center gap-2">
                                    <BookOpen size={18} />
                                    <p className="text-sm">AKADEMIK</p>
                                </div>
                                <motion.span
                                    animate={{
                                        rotate: openMenus.Akademik ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="text-green-700"
                                >
                                    <ChevronDown />
                                </motion.span>
                            </div>
                            <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: openMenus.Akademik ? 1 : 0,
                                    height: openMenus.Akademik ? "auto" : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="pl-6 mt-2 ml-2 border-l-2 border-green-500 overflow-hidden"
                            >
                                <li
                                    onClick={() =>
                                        router.get(
                                            route(
                                                userGuard === "dosen"
                                                    ? "krs.dosen.index"
                                                    : "krs.index"
                                            )
                                        )
                                    }
                                    className="cursor-pointer hover:text-green-500 py-1"
                                >
                                    KRS
                                </li>
                                <li
                                    className="cursor-pointer hover:text-green-500 py-1"
                                    onClick={() =>
                                        router.get(route("data-nilai.index"))
                                    }
                                >
                                    Data Nilai
                                </li>
                                <li
                                    className="cursor-pointer hover:text-green-500 py-1"
                                    onClick={() =>
                                        router.get(route("ta.index"))
                                    }
                                >
                                    TA / Skripsi
                                </li>
                                <li
                                    className="cursor-pointer hover:text-green-500 py-1"
                                    onClick={() =>
                                        router.get(route("presensi.index"))
                                    }
                                >
                                    Presensi Mahasiswa
                                </li>
                                <li
                                    className="cursor-pointer hover:text-green-500 py-1"
                                    onClick={() =>
                                        router.get(route("cuti.index"))
                                    }
                                >
                                    Pengajuan Cuti
                                </li>
                            </motion.ul>
                        </li>

                        {/* Keuangan */}
                        <li className="">
                            <div
                                className="pt-3 pb-3 pr-2 pl-2 cursor-pointer flex items-center justify-between rounded-lg hover:bg-green-200 font-bold"
                                onClick={() => toggleMenu("Keuangan")}
                            >
                                <div className="flex items-center gap-2">
                                    <CreditCard size={18} />
                                    <p className="text-sm">KEUANGAN</p>
                                </div>
                                <motion.span
                                    animate={{
                                        rotate: openMenus.Keuangan ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="text-green-700"
                                >
                                    <ChevronDown />
                                </motion.span>
                            </div>
                            <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: openMenus.Keuangan ? 1 : 0,
                                    height: openMenus.Keuangan ? "auto" : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="pl-6 mt-2 ml-2 border-l-2 border-green-500 overflow-hidden"
                            >
                                <li
                                    className="cursor-pointer hover:text-green-500 py-1"
                                    onClick={() =>
                                        router.get(route("pembayaran.index"))
                                    }
                                >
                                    History Pembayaran
                                </li>
                            </motion.ul>
                        </li>

                        {/* Panduan */}
                        <li className="">
                            <div
                                className="pt-3 pb-3 pr-2 pl-2 cursor-pointer flex items-center justify-between rounded-lg hover:bg-green-200 font-bold"
                                onClick={() => toggleMenu("Panduan")}
                            >
                                <div
                                    onClick={() =>
                                        router.get(route("panduan.index"))
                                    }
                                    className="flex items-center gap-2"
                                >
                                    <FileText size={18} />
                                    <p className="text-sm">PANDUAN</p>
                                </div>
                                <motion.span
                                    animate={{
                                        rotate: openMenus.Panduan ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="text-green-700"
                                >
                                    <ChevronDown />
                                </motion.span>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* children */}
                <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}
