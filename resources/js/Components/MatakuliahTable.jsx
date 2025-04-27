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
        <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Kode</th>
                        <th className="px-4 py-2 text-left">Mata Kuliah</th>
                        <th className="px-4 py-2 text-left">Dosen</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {mataKuliahList.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="text-center py-6 text-gray-500"
                            >
                                Pilih semester untuk melihat mata kuliah
                            </td>
                        </tr>
                    ) : (
                        mataKuliahList.map((mk) => {
                            const status = getStatus(mk.id);
                            const sudahDikontrak = !!status;

                            return (
                                <tr key={mk.id} className="border-t">
                                    <td className="px-4 py-2">{mk.kode_mk}</td>
                                    <td className="px-4 py-2">{mk.nama_mk}</td>
                                    <td className="px-4 py-2">
                                        {mk.dosen?.nama_lengkap ?? "-"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {status === "pending" && (
                                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                                                Menunggu
                                            </span>
                                        )}
                                        {status === "disetujui" && (
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                                Diterima
                                            </span>
                                        )}
                                        {status === "ditolak" && (
                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                                Ditolak
                                            </span>
                                        )}
                                        {!status && (
                                            <span className="text-gray-400 text-xs">
                                                Belum dikontrak
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {!sudahDikontrak && (
                                            <button
                                                onClick={() => onKontrak(mk.id)}
                                                disabled={disabled}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                                            >
                                                Kontrak
                                            </button>
                                        )}
                                        {sudahDikontrak && (
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
