import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectSemester from "@/Components/SelectSemester";
import MataKuliahTable from "@/Components/MatakuliahTable";

export default function Krs({
    mataKuliah,
    krsSaya,
    periodeKrsSelesai,
    semesters,
    belumLunas,
}) {
    const { data, setData, post, processing } = useForm({
        mata_kuliah_id: "",
        semester_id: "",
    });

    const [selectedSemester, setSelectedSemester] = useState("");
    const [filteredMataKuliah, setFilteredMataKuliah] = useState([]);

    useEffect(() => {
        if (selectedSemester) {
            setFilteredMataKuliah(
                mataKuliah.filter((mk) => mk.semester_id == selectedSemester)
            );
        } else {
            setFilteredMataKuliah([]);
        }
    }, [selectedSemester, mataKuliah]);

    // Menggunakan useEffect untuk memantau perubahan semester_id
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            semester_id: selectedSemester, // Memperbarui semester_id ketika selectedSemester berubah
        }));
    }, [selectedSemester, setData]);

    useEffect(() => {
        if (data.mata_kuliah_id && data.semester_id) {
            post(route("krs.store"));
        }
    }, [data, post]);

    const handleKontrak = (mataKuliahId) => {
        console.log("Selected Semester ID:", selectedSemester); // Debugging
        console.log("Mata Kuliah ID:", mataKuliahId);

        setData({
            mata_kuliah_id: mataKuliahId,
            semester_id: selectedSemester,
        });
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

                <div className="space-y-4 max-w-md mb-10">
                    <SelectSemester
                        semesters={semesters}
                        selectedSemester={selectedSemester}
                        onChange={(value) => {
                            console.log("Semester selected:", value); // Periksa nilai semester
                            setSelectedSemester(value);
                        }}
                    />
                </div>

                <MataKuliahTable
                    mataKuliahList={filteredMataKuliah}
                    krsSaya={krsSaya}
                    onKontrak={handleKontrak}
                    disabled={
                        processing || periodeKrsSelesai || !selectedSemester
                    }
                />
            </div>
        </AuthenticatedLayout>
    );
}
