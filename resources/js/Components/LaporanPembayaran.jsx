import React from "react";

const LaporanPembayaran = ({
    mahasiswa,
    semester,
    dosenWali,
    komponenPembayaran,
    totalPembayaran,
}) => {
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">
                Laporan Pembayaran
            </h1>

            {/* Data Mahasiswa */}
            <div className="mb-4">
                <p className="text-lg font-semibold">Nama: {mahasiswa.nama}</p>
                <p className="text-lg font-semibold">
                    Semester: {semester.nama} ({semester.tahun})
                </p>
                <p className="text-lg font-semibold">
                    Dosen Wali: {dosenWali.nama_lengkap}
                </p>
            </div>

            {/* Tabel Pembayaran */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">
                                Nama Komponen
                            </th>
                            <th className="px-4 py-2 text-left">Harga</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">
                                Tanggal Bayar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {komponenPembayaran.map((pembayaran, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{pembayaran.nama}</td>
                                <td className="px-4 py-2">
                                    Rp {pembayaran.harga.toLocaleString()}
                                </td>
                                <td className="px-4 py-2">
                                    {pembayaran.status === "dibayar"
                                        ? "Dibayar"
                                        : "Belum Dibayar"}
                                </td>
                                <td className="px-4 py-2">
                                    {pembayaran.tanggal_bayar || "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total Pembayaran */}
            <div className="mt-4 text-right">
                <p className="text-xl font-semibold">
                    Total Pembayaran: Rp {totalPembayaran.toLocaleString()}
                </p>
            </div>

            {/* Button Download PDF */}
            <div className="mt-6 text-center">
                <a
                    href={`data:application/pdf;base64,${generatePDF(
                        mahasiswa,
                        semester,
                        dosenWali,
                        komponenPembayaran,
                        totalPembayaran
                    )}`}
                    download={`laporan_pembayaran_${mahasiswa.nama}_${semester.nama}.pdf`}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
                >
                    Unduh Laporan Pembayaran
                </a>
            </div>
        </div>
    );
};

const generatePDF = (
    mahasiswa,
    semester,
    dosenWali,
    komponenPembayaran,
    totalPembayaran
) => {
    // Kamu bisa implementasikan logika untuk mengubah data menjadi file PDF jika ingin
    // Ini hanya placeholder
    return "encodedPDFString"; // Placeholder untuk string encoded base64 dari PDF
};

export default LaporanPembayaran;
