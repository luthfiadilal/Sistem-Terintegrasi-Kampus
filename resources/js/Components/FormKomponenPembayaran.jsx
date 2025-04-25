import { useForm } from "@inertiajs/react";

export default function FormKomponenPembayaran({ semesterList }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        semester_id: "",
        nama: "",
        harga: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("komponen-pembayaran.store"), {
            preserveScroll: true,
            onSuccess: () => reset("nama", "harga, semester_id"),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-3 rounded shadow"
        >
            <div>
                <label className="block mb-1 text-sm font-medium">
                    Semester
                </label>
                <select
                    value={data.semester_id}
                    onChange={(e) => setData("semester_id", e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">-- Pilih Semester --</option>
                    {semesterList.map((semester) => (
                        <option key={semester.id} value={semester.id}>
                            {semester.nama}
                        </option>
                    ))}
                </select>
                {errors.semester_id && (
                    <p className="text-red-600 text-sm">{errors.semester_id}</p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">
                    Jenis Pembayaran
                </label>
                <input
                    type="text"
                    value={data.nama}
                    onChange={(e) => setData("nama", e.target.value)}
                    className="w-full border p-2 rounded"
                />
                {errors.nama && (
                    <p className="text-red-600 text-sm">{errors.nama}</p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">Harga</label>
                <input
                    type="number"
                    value={data.harga}
                    onChange={(e) => setData("harga", e.target.value)}
                    className="w-full border p-2 rounded"
                />
                {errors.harga && (
                    <p className="text-red-600 text-sm">{errors.harga}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                Simpan Komponen
            </button>
        </form>
    );
}
