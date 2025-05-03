import { useState } from "react";
import FormKomponenPembayaran from "./FormKomponenPembayaran";
import KomponenPembayaranList from "./KomponenPembayaranList";

export default function KomponenPembayaran({ semesterList, komponenList }) {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(!showForm);

    return (
        <div className=" mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-green-700">
                Komponen Pembayaran
            </h1>

            <button
                onClick={toggleForm}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
            >
                {showForm ? "Batal" : "Tambah Komponen"}
            </button>

            {showForm && <FormKomponenPembayaran semesterList={semesterList} />}

            <KomponenPembayaranList komponenList={komponenList ?? []} />
        </div>
    );
}
