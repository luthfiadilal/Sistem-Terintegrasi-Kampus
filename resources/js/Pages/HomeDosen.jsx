import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import FormMatakuliah from "@/Layouts/FormMataKuliah";
import MatakuliahDosen from "@/Layouts/MatakuliahDosen";
import { Button } from "@/Components/Button";
import classNames from "classnames";
import KomponenPembayaran from "@/Components/KomponenPembayaran";

export default function HomeDosen({ semesters, matakuliah, komponenList }) {
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState("matakuliah");

    return (
        <AuthenticatedLayout>
            <div className="p-3 mx-auto">
                {/* Tab Navigation */}
                <div className="flex space-x-4 mb-6">
                    <button
                        className={classNames(
                            "px-4 py-2 rounded font-semibold",
                            activeTab === "matakuliah"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                        )}
                        onClick={() => setActiveTab("matakuliah")}
                    >
                        Mata Kuliah
                    </button>
                    <button
                        className={classNames(
                            "px-4 py-2 rounded font-semibold",
                            activeTab === "komponen"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                        )}
                        onClick={() => setActiveTab("komponen")}
                    >
                        Komponen Pembayaran
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === "matakuliah" && (
                    <MatakuliahDosen
                        title="Daftar Mata Kuliah"
                        actionButton={
                            <Button onClick={() => setShowForm(!showForm)}>
                                {showForm
                                    ? "Tutup Form"
                                    : "+ Tambah Mata Kuliah"}
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
                                            <td className="p-2">
                                                {mk.kode_mk}
                                            </td>
                                            <td className="p-2">
                                                {mk.nama_mk}
                                            </td>
                                            <td className="p-2">{mk.sks}</td>
                                            <td className="p-2">
                                                {mk.semester?.nama}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </MatakuliahDosen>
                )}

                {activeTab === "komponen" && (
                    <>
                        {console.log("render komponen pembayaran")}
                        <KomponenPembayaran
                            semesterList={semesters}
                            komponenList={komponenList}
                        />
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
