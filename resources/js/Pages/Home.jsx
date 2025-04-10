import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function Home() {
    const { mahasiswa } = usePage().props;
    const krsSaya = mahasiswa?.krs || [];

    return (
        <AuthenticatedLayout>
            <div className="p-6 scroll-smooth">
                <h1 className="text-2xl font-semibold mb-4">
                    🎓 Selamat datang, {mahasiswa?.nama_lengkap}
                </h1>

                <p className="mb-6 text-gray-600">
                    Berikut adalah mata kuliah yang kamu kontrak semester ini:
                </p>

                <div className="space-y-4">
                    {krsSaya.length === 0 ? (
                        <div className="text-center text-gray-500 py-6 rounded bg-gray-50 shadow-sm">
                            Kamu belum mengontrak mata kuliah apa pun.
                        </div>
                    ) : (
                        krsSaya.map((item, index) => (
                            <div
                                key={item.id}
                                className="rounded-lg bg-white shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex-1">
                                    <div className="text-sm text-gray-500">
                                        No. {index + 1}
                                    </div>
                                    <div className="font-semibold text-lg text-blue-700">
                                        {item.mata_kuliah.nama_mk} (
                                        {item.mata_kuliah.sks} SKS)
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Dosen:{" "}
                                        {item.mata_kuliah.dosen?.nama_lengkap ??
                                            "Belum ditentukan"}
                                    </div>
                                </div>

                                <div className="flex-1 text-sm">
                                    <div className="font-medium text-blue-600">
                                        Ruang: A-101
                                    </div>
                                    <div className="mt-1">
                                        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                                            Senin
                                        </span>
                                        <span className="ml-2 text-sm text-green-600">
                                            08:00 ~ 09:40
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    {item.status_acc === "disetujui" && (
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                            Disetujui
                                        </span>
                                    )}
                                    {item.status_acc === "pending" && (
                                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                            Menunggu
                                        </span>
                                    )}
                                    {item.status_acc === "ditolak" && (
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                            Ditolak
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
