import React from "react";
import Register from "./Auth/Register";
import { GraduationCap } from "lucide-react";
import { User } from "lucide-react";
import { router } from "@inertiajs/react";

export default function RegisterPage() {
    const linkToRegisterMhs = (e) => {
        e.preventDefault();
        router.visit(route("register"));
    };

    const linkToRegisterDosen = (e) => {
        e.preventDefault();
        router.visit(route("registerdosen"));
    };

    return (
        <div className="w-full h-screen flex bg-yellow-200">
            <div className="logo bg-green-600 h-screen w-1/2 flex flex-col justify-center items-center">
                <h1 className="text-3xl text-white">SIMANTAP</h1>
                <div className="flex justify-center items-center p-[40px]">
                    <h2 className="text-md text-white text-center">
                        Sistem Informasi Manajemen Terintegrasi Universitas
                        Perjuangan
                    </h2>
                </div>
                <div className="w-full flex justify-center items-center gap-4 mb-4 ">
                    <button
                        onClick={linkToRegisterMhs}
                        className="group flex flex-col items-center justify-center w-28 h-24 pl-4 pr-4 bg-white bg-opacity-90 rounded-xl border-2 border-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <GraduationCap className="w-8 h-8 mb-1 text-blue-400 group-hover:text-white transition" />
                        <span className="text-xs font-medium ">
                            Register Mahasiswa
                        </span>
                    </button>

                    <button
                        onClick={linkToRegisterDosen}
                        className="group flex flex-col items-center justify-center w-28 h-24 pl-4 pr-4 bg-white bg-opacity-90 rounded-xl border-2 border-green-400 hover:bg-green-400 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <User className="w-8 h-8 mb-1 text-green-400 group-hover:text-white transition" />
                        <span className="text-xs font-medium">
                            Register Dosen
                        </span>
                    </button>
                </div>
            </div>
            <Register />
        </div>
    );
}
