import { useState, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectSemester from "@/Components/SelectSemester";
import { Toaster, toast } from "react-hot-toast";

export default function Tagihan({
    semesters,
    komponen,
    total,
    selectedSemester,
}) {
    const [selectedSemesterId, setSelectedSemesterId] =
        useState(selectedSemester);
    const [komponenData, setKomponenData] = useState(komponen);
    const [totalTagihan, setTotalTagihan] = useState(total);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const filteredKomponen = komponen.filter(
            (item) => item.semester_id === selectedSemesterId
        );
        setKomponenData(filteredKomponen);

        if (filteredKomponen.length === 0) {
            setTotalTagihan(0);
            return;
        }

        const total = filteredKomponen.reduce(
            (sum, item) => sum + item.harga,
            0
        );
        setTotalTagihan(total);
    }, [selectedSemesterId, komponen]);

    function handleBayarSemua() {
        setShowConfirmModal(true);
    }

    function confirmBayar() {
        setIsSubmitting(true);

        router.post(
            route("pembayaran.bayar"),
            {
                semester_id: selectedSemesterId,
            },
            {
                onSuccess: () => {
                    toast.success("Pembayaran berhasil!");
                    setShowConfirmModal(false);
                    setIsSubmitting(false);
                },
                onError: () => {
                    toast.error("Pembayaran gagal!");
                    setIsSubmitting(false);
                },
            }
        );
    }

    return (
        <AuthenticatedLayout>
            <Toaster position="top-right" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">
                    💸 Tagihan Pembayaran
                </h1>

                {/* Dropdown Semester */}
                <div className="mb-6 max-w-md">
                    <SelectSemester
                        semesters={semesters}
                        selectedSemester={selectedSemesterId}
                        onChange={setSelectedSemesterId}
                    />
                </div>

                {/* Menampilkan Komponen Pembayaran */}
                {komponenData.length > 0 ? (
                    <>
                        <div className="overflow-x-auto shadow rounded-lg mb-6">
                            <table className="min-w-full bg-white border ">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border p-2">
                                            Nama Pembayaran
                                        </th>
                                        <th className="border p-2">Harga</th>
                                        <th className="border p-2">Status</th>
                                        <th className="border p-2">
                                            Tanggal Bayar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {komponenData.map((item) => (
                                        <tr key={item.id}>
                                            <td className="border p-2">
                                                {item.nama}
                                            </td>
                                            <td className="border p-2">
                                                Rp{" "}
                                                {item.harga.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </td>
                                            <td className="border p-2 capitalize">
                                                {item.status.replace("_", " ")}
                                            </td>
                                            <td className="border p-2">
                                                {item.tanggal_bayar
                                                    ? new Date(
                                                          item.tanggal_bayar
                                                      ).toLocaleDateString(
                                                          "id-ID"
                                                      )
                                                    : "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total dan Button */}
                        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                            <div className="text-xl font-semibold">
                                Total Tagihan: Rp{" "}
                                {totalTagihan.toLocaleString("id-ID")}
                            </div>
                            <button
                                onClick={handleBayarSemua}
                                disabled={isSubmitting}
                                className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting ? "Memproses..." : "Bayar Semua"}
                            </button>
                        </div>
                    </>
                ) : (
                    selectedSemester && (
                        <div className="text-gray-500 mt-6">
                            Belum ada komponen pembayaran untuk semester ini.
                        </div>
                    )
                )}

                {/* Modal Konfirmasi */}
                {showConfirmModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">
                                Konfirmasi Pembayaran
                            </h2>
                            <p className="mb-6">
                                Apakah kamu yakin ingin membayar semua tagihan
                                untuk semester ini?
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmBayar}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Memproses..." : "Bayar"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
