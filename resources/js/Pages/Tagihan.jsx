import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectSemester from "@/Components/SelectSemester";
import TagihanTable from "@/Components/TagihanTable";
import ConfirmModal from "@/Components/ConfirmModal";
import { Toaster, toast } from "react-hot-toast";

export default function Tagihan({
    semesters,
    komponen,
    total,
    selectedSemester,
    mahasiswaId,
    dosenWali,
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
            { semester_id: selectedSemesterId },
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

                <div className="mb-6 max-w-md">
                    <SelectSemester
                        semesters={semesters}
                        selectedSemester={selectedSemesterId}
                        onChange={setSelectedSemesterId}
                    />
                </div>

                {komponenData.length > 0 ? (
                    <>
                        <TagihanTable komponenData={komponenData} />
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

                <ConfirmModal
                    show={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={confirmBayar}
                    isSubmitting={isSubmitting}
                />
            </div>
        </AuthenticatedLayout>
    );
}
