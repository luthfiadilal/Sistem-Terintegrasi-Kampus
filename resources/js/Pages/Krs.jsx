import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Krs({
    mataKuliah,
    krsSaya,
    periodeKrsSelesai,
    belumLunas,
}) {
    const { data, setData, post, processing } = useForm({
        mata_kuliah_id: "",
    });

    console.log("belumLunas", belumLunas);

    const handleKontrak = (e) => {
        e.preventDefault();
        post(route("krs.store"));
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 scroll-smooth">
                <h1 className="text-2xl font-semibold mb-4">
                    📄 Kartu Rencana Studi
                </h1>

                {belumLunas && (
                    <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded mb-4 font-semibold">
                        ⚠️ Kamu belum menyelesaikan semua pembayaran untuk
                        semester ini.
                    </div>
                )}

                {periodeKrsSelesai && (
                    <div className="bg-red-100 text-red-800 px-4 py-3 rounded mb-4 font-semibold">
                        Periode kontrak Kartu Rencana Studi (KRS) telah
                        berakhir!
                    </div>
                )}

                {/* Form Kontrak */}
                <form
                    onSubmit={handleKontrak}
                    className="space-y-4 max-w-md mb-10"
                >
                    <select
                        value={data.mata_kuliah_id}
                        onChange={(e) =>
                            setData("mata_kuliah_id", e.target.value)
                        }
                        className="w-full border rounded p-2"
                    >
                        <option value="">Pilih Mata Kuliah</option>
                        {mataKuliah.map((mk) => (
                            <option key={mk.id} value={mk.id}>
                                {mk.kode_mk} - {mk.nama_mk} ({mk.sks} SKS)
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        disabled={processing || periodeKrsSelesai}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Kontrak
                    </button>
                </form>

                {/* Tabel KRS */}
                <div className="space-y-4">
                    {krsSaya.length === 0 ? (
                        <div className="text-center text-gray-500 py-6 rounded bg-gray-50 shadow-sm">
                            Belum ada mata kuliah yang dikontrak
                        </div>
                    ) : (
                        krsSaya.map((item, index) => (
                            <div
                                key={item.id}
                                className="rounded-lg bg-white shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100"
                            >
                                <div className="flex-1">
                                    <div className="text-sm text-gray-500">
                                        No. {index + 1}
                                    </div>
                                    <div className="font-semibold text-lg">
                                        {item.mata_kuliah.nama_mk} (
                                        {item.mata_kuliah.sks} SKS)
                                    </div>
                                    <div className="text-sm text-red-600 mt-1">
                                        {item.mata_kuliah.dosen?.nama_lengkap ??
                                            "Dosen Tidak Tersedia"}
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
                                            Diterima
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

                                <div className="text-center text-gray-400 text-sm">
                                    No aksi
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
