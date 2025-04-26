import { Label } from "@/Components/Label";
import { Input } from "@/Components/Input";
import { Button } from "@/Components/Button";
import { useState } from "react";
import axios from "axios";

export default function SemesterList({ semesters }) {
    const [editSemester, setEditSemester] = useState(null);
    const [form, setForm] = useState({
        nama: "",
        periode_mulai: "",
        periode_selesai: "",
        status: false,
    });

    const handleEdit = (semester) => {
        setEditSemester(semester.id);
        setForm({
            id: semester.id,
            nama: semester.nama,
            periode_mulai: semester.periode_mulai.slice(0, 10), // ambil cuma YYYY-MM-DD
            periode_selesai: semester.periode_selesai.slice(0, 10),
            status: semester.status,
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/semester/${editSemester}`, form);
            location.reload(); // atau update state untuk re-render
        } catch (error) {
            console.error("Gagal update semester:", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Daftar Semester</h2>
            <table className="w-full border rounded-md mb-6 text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Nama</th>
                        <th className="p-2">Periode</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {semesters.map((smt) => (
                        <tr key={smt.id} className="border-t">
                            <td className="p-2">{smt.nama}</td>
                            <td className="p-2">
                                {new Date(smt.periode_mulai).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}{" "}
                                -{" "}
                                {new Date(
                                    smt.periode_selesai
                                ).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </td>
                            <td className="p-2">
                                {smt.status ? (
                                    <span className="text-green-600 font-semibold">
                                        Aktif
                                    </span>
                                ) : (
                                    <span className="text-gray-500">
                                        Tidak Aktif
                                    </span>
                                )}
                            </td>
                            <td className="p-2">
                                <Button onClick={() => handleEdit(smt)}>
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editSemester && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="nama">Nama Semester</Label>
                        <Input
                            id="nama"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="periode_mulai">Periode Mulai</Label>
                        <Input
                            id="periode_mulai"
                            type="date"
                            name="periode_mulai"
                            value={form.periode_mulai}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="periode_selesai">Periode Selesai</Label>
                        <Input
                            id="periode_selesai"
                            type="date"
                            name="periode_selesai"
                            value={form.periode_selesai}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="status"
                            name="status"
                            checked={form.status}
                            onChange={handleChange}
                        />
                        <Label htmlFor="status" className="mb-0">
                            Jadikan Semester Aktif
                        </Label>
                    </div>
                    <Button type="submit">Simpan Perubahan</Button>
                </form>
            )}
        </div>
    );
}
