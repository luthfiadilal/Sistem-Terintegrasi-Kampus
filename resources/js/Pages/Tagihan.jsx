import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectSemester from "@/Components/SelectSemester";

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

    useEffect(() => {
        console.log("Semester terpilih:", selectedSemesterId);

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

    return (
        <AuthenticatedLayout>
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
                        <table className="w-full table-auto border-collapse mb-6">
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
                                            {item.harga.toLocaleString("id-ID")}
                                        </td>
                                        <td className="border p-2 capitalize">
                                            {item.status.replace("_", " ")}
                                        </td>
                                        <td className="border p-2">
                                            {item.tanggal_bayar
                                                ? new Date(
                                                      item.tanggal_bayar
                                                  ).toLocaleDateString("id-ID")
                                                : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Total Tagihan */}
                        <div className="text-right text-xl font-semibold">
                            Total Tagihan: Rp{" "}
                            {totalTagihan.toLocaleString("id-ID")}
                        </div>
                    </>
                ) : (
                    selectedSemester && (
                        <div className="text-gray-500 mt-6">
                            Belum ada komponen pembayaran untuk semester ini.
                        </div>
                    )
                )}
            </div>
        </AuthenticatedLayout>
    );
}
