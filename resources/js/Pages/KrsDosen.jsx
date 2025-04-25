import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function KrsDosen({ mahasiswaBimbingan }) {
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
    const { put } = useForm();
    const [processingId, setProcessingId] = useState(null);

    const handlePilihMahasiswa = (e) => {
        const mahasiswaId = parseInt(e.target.value);
        const mhs = mahasiswaBimbingan.find((m) => m.id === mahasiswaId);
        setSelectedMahasiswa(mhs);
    };

    const handleUpdateStatus = (krsId, status) => {
        console.log("Kirim status:", status);
        setProcessingId(krsId);
        router.put(
            route("krs.updateStatus", krsId),
            {
                status_acc: status,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ["mahasiswaBimbingan"] });

                    setSelectedMahasiswa((prev) => {
                        const updatedKrs = prev.krs.map((item) =>
                            item.id === krsId
                                ? { ...item, status_acc: status }
                                : item
                        );
                        return {
                            ...prev,
                            krs: updatedKrs,
                        };
                    });
                },
                onFinish: () => setProcessingId(null),
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">
                    📑 Verifikasi KRS Mahasiswa Bimbingan
                </h1>

                <select
                    onChange={handlePilihMahasiswa}
                    className="border rounded p-2 mb-6 w-full max-w-md"
                >
                    <option value="">Pilih Mahasiswa</option>
                    {mahasiswaBimbingan.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.nama_lengkap}
                        </option>
                    ))}
                </select>

                {selectedMahasiswa && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold mb-2">
                            KRS: {selectedMahasiswa.name}
                        </h2>

                        {selectedMahasiswa.krs.length === 0 ? (
                            <div className="bg-gray-50 text-gray-500 text-center py-4 rounded shadow">
                                Belum ada mata kuliah yang dikontrak.
                            </div>
                        ) : (
                            selectedMahasiswa.krs.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded border p-4 bg-white shadow-sm flex justify-between items-start flex-wrap gap-4"
                                >
                                    <div>
                                        <div className="font-semibold text-lg">
                                            {item.mata_kuliah.nama_mk} (
                                            {item.mata_kuliah.sks} SKS)
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Kode: {item.mata_kuliah.kode_mk}
                                        </div>
                                        <div className="text-sm mt-1">
                                            Status:{" "}
                                            {item.status_acc ===
                                                "disetujui" && (
                                                <span className="text-green-600 font-semibold">
                                                    Diterima
                                                </span>
                                            )}
                                            {item.status_acc === "pending" && (
                                                <span className="text-yellow-600 font-semibold">
                                                    Menunggu
                                                </span>
                                            )}
                                            {item.status_acc === "ditolak" && (
                                                <span className="text-red-600 font-semibold">
                                                    Ditolak
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-x-2">
                                        <button
                                            onClick={() =>
                                                handleUpdateStatus(
                                                    item.id,
                                                    "disetujui"
                                                )
                                            }
                                            disabled={processingId === item.id}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Setujui
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleUpdateStatus(
                                                    item.id,
                                                    "ditolak"
                                                )
                                            }
                                            disabled={processingId === item.id}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Tolak
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
