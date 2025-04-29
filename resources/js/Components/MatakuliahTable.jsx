export default function MataKuliahTable({
    mataKuliahList,
    krsSaya,
    onKontrak,
    disabled,
}) {
    const getStatus = (mataKuliahId) => {
        const krs = krsSaya.find(
            (item) => item.mata_kuliah_id === mataKuliahId
        );
        return krs ? krs.status_acc : null;
    };

    return (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
            <table className="min-w-full bg-white">
                <thead className="bg-green-600 text-gray-700 text-sm uppercase tracking-wider">
                    <tr>
                        <th className="px-6 text-white py-4 text-left">Kode</th>
                        <th className="px-6 text-white py-4 text-left">
                            Mata Kuliah
                        </th>
                        <th className="px-6 text-white py-4 text-left">
                            Dosen
                        </th>
                        <th className="px-6 text-white py-4 text-left">Hari</th>
                        <th className="px-6 text-white py-4 text-left">Jam</th>

                        <th className="px-6 text-white py-4 text-left">
                            Status
                        </th>
                        <th className="px-6 text-white py-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {mataKuliahList.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="text-center py-10 text-gray-400"
                            >
                                Pilih semester untuk melihat mata kuliah
                            </td>
                        </tr>
                    ) : (
                        mataKuliahList.map((mk) => {
                            const status = getStatus(mk.id);
                            const sudahDikontrak = !!status;

                            return (
                                <tr
                                    key={mk.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4">{mk.kode_mk}</td>
                                    <td className="px-6 py-4">{mk.nama_mk}</td>
                                    <td className="px-6 py-4">
                                        {mk.dosen?.nama_lengkap ?? "-"}
                                    </td>
                                    <td className="px-6 py-4">{mk.hari}</td>
                                    <td className="px-6 py-4">
                                        {mk.jam_mulai} -{""} {mk.jam_selesai}
                                    </td>
                                    <td className="px-6 py-4">
                                        {status === "pending" && (
                                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                                                Menunggu
                                            </span>
                                        )}
                                        {status === "disetujui" && (
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                                Diterima
                                            </span>
                                        )}
                                        {status === "ditolak" && (
                                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                                                Ditolak
                                            </span>
                                        )}
                                        {!status && (
                                            <span className="text-gray-400 text-xs">
                                                Belum dikontrak
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {!sudahDikontrak ? (
                                            <button
                                                onClick={() => onKontrak(mk.id)}
                                                disabled={disabled}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full text-xs transition disabled:opacity-50"
                                            >
                                                Kontrak
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-xs">
                                                Sudah dikontrak
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
