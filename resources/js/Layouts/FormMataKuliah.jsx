import { useForm } from "@inertiajs/react";

import { Button } from "@/Components/Button";
import { Label } from "@/Components/Label";
import { Input } from "@/Components/Input";

export default function FormMatakuliah({ semesters }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_mk: "",
        kode_mk: "",
        sks: "",
        semester_id: "",
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("matakuliah.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="nama_mk">Nama Mata Kuliah</Label>
                <Input
                    id="nama_mk"
                    value={data.nama_mk}
                    onChange={(e) => setData("nama_mk", e.target.value)}
                />
                {errors.nama_mk && (
                    <p className="text-red-500">{errors.nama_mk}</p>
                )}
            </div>

            <div>
                <Label htmlFor="kode_mk">Kode MK</Label>
                <Input
                    id="kode_mk"
                    value={data.kode_mk}
                    onChange={(e) => setData("kode_mk", e.target.value)}
                />
                {errors.kode_mk && (
                    <p className="text-red-500">{errors.kode_mk}</p>
                )}
            </div>

            <div>
                <Label htmlFor="sks">SKS</Label>
                <Input
                    id="sks"
                    type="number"
                    value={data.sks}
                    onChange={(e) => setData("sks", e.target.value)}
                />
                {errors.sks && <p className="text-red-500">{errors.sks}</p>}
            </div>

            <div>
                <Label htmlFor="semester_id">Semester</Label>
                <select
                    id="semester_id"
                    value={data.semester_id}
                    onChange={(e) => setData("semester_id", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">-- Pilih Semester --</option>
                    {semesters.map((smt) => (
                        <option key={smt.id} value={smt.id}>
                            {smt.nama}
                        </option>
                    ))}
                </select>
                {errors.semester_id && (
                    <p className="text-red-500">{errors.semester_id}</p>
                )}
            </div>

            {/* Tambahan Hari */}
            <div>
                <Label htmlFor="hari">Hari</Label>
                <Input
                    id="hari"
                    value={data.hari}
                    onChange={(e) => setData("hari", e.target.value)}
                    placeholder="Contoh: Senin, Selasa"
                />
                {errors.hari && <p className="text-red-500">{errors.hari}</p>}
            </div>

            {/* Tambahan Jam Mulai */}
            <div>
                <Label htmlFor="jam_mulai">Jam Mulai</Label>
                <Input
                    id="jam_mulai"
                    type="time"
                    value={data.jam_mulai}
                    onChange={(e) => setData("jam_mulai", e.target.value)}
                />
                {errors.jam_mulai && (
                    <p className="text-red-500">{errors.jam_mulai}</p>
                )}
            </div>

            {/* Tambahan Jam Selesai */}
            <div>
                <Label htmlFor="jam_selesai">Jam Selesai</Label>
                <Input
                    id="jam_selesai"
                    type="time"
                    value={data.jam_selesai}
                    onChange={(e) => setData("jam_selesai", e.target.value)}
                />
                {errors.jam_selesai && (
                    <p className="text-red-500">{errors.jam_selesai}</p>
                )}
            </div>

            <Button type="submit" disabled={processing}>
                Simpan
            </Button>
        </form>
    );
}
