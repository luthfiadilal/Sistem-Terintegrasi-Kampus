import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import FormMatakuliah from "@/Layouts/FormMataKuliah";
import MatakuliahDosen from "@/Layouts/MatakuliahDosen";
import { Button } from "@/Components/Button";
import classNames from "classnames";
import KomponenPembayaran from "@/Components/KomponenPembayaran";
import SemesterList from "@/Layouts/SemesterList";
import { router } from "@inertiajs/react";
import DeleteModal from "@/Components/DeleteModal";

export default function HomeDosen({ semesters, matakuliah, komponenList }) {
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState("matakuliah");

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const openModal = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            router.delete(route("matakuliah.destroy", selectedId), {
                onSuccess: () => {
                    setShowModal(false);
                    setSelectedId(null);
                },
            });
        }
    };

    // const handleDeleteMatakuliah = (id) => {
    //     if (
    //         window.confirm("Apakah Anda yakin ingin menghapus mata kuliah ini?")
    //     ) {
    //         router.delete(route("matakuliah.destroy", id));
    //     }
    // };

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
                    <button
                        className={classNames(
                            "px-4 py-2 rounded font-semibold",
                            activeTab === "semester"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                        )}
                        onClick={() => setActiveTab("semester")}
                    >
                        Semester
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
                                        <th className="p-2">Hari</th>
                                        <th className="p-2">Jam</th>
                                        <th className="p-2">Aksi</th>
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
                                            <td className="p-2">{mk.hari}</td>
                                            <td className="p-2">
                                                {/* menampilkan jam mulai - jam selesai */}
                                                {mk.jam_mulai} -{" "}
                                                {mk.jam_selesai}
                                            </td>
                                            <td className="p-2">
                                                <button
                                                    onClick={() =>
                                                        openModal(mk.id)
                                                    }
                                                    className="text-red-500"
                                                >
                                                    Hapus
                                                </button>
                                                <button className="ml-2">
                                                    Edit
                                                </button>
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
                        <KomponenPembayaran
                            semesterList={semesters}
                            komponenList={komponenList}
                        />
                    </>
                )}
                {activeTab === "semester" && (
                    <div>
                        <SemesterList semesters={semesters} />
                    </div>
                )}
                <DeleteModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirmDelete}
                />
            </div>
        </AuthenticatedLayout>
    );
}
