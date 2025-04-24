import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import FormMatakuliah from "@/Layouts/FormMataKuliah";
import MatakuliahDosen from "@/Layouts/MatakuliahDosen";
import { Button } from "@/Components/Button";
import { useEffect } from "react";

export default function HomeDosen({ semesters, matakuliah }) {
    const [showForm, setShowForm] = useState(false);

    return (
        <AuthenticatedLayout>
            <MatakuliahDosen
                title="Daftar Mata Kuliah"
                actionButton={
                    <Button onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Tutup Form" : "+ Tambah Mata Kuliah"}
                    </Button>
                }
            >
                {showForm && <FormMatakuliah semesters={semesters} />}

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Mata Kuliah Anda
                    </h2>
                    <table className="w-full text-left border rounded-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Kode</th>
                                <th className="p-2">Nama</th>
                                <th className="p-2">SKS</th>
                                <th className="p-2">Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matakuliah.map((mk) => (
                                <tr key={mk.id} className="border-t">
                                    <td className="p-2">{mk.kode_mk}</td>
                                    <td className="p-2">{mk.nama_mk}</td>
                                    <td className="p-2">{mk.sks}</td>
                                    <td className="p-2">{mk.semester?.nama}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MatakuliahDosen>
        </AuthenticatedLayout>
    );
}
