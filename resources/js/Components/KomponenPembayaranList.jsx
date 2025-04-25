export default function KomponenPembayaranList({
    komponenList = [],
    onEdit,
    onDelete,
}) {
    console.log(komponenList);
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Daftar Komponen</h3>
            {komponenList.length === 0 ? (
                <p>Belum ada komponen pembayaran.</p>
            ) : (
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-green-800 text-white">
                        <tr>
                            <th className="border px-4 py-2">Nama Komponen</th>
                            <th className="border px-4 py-2">Semester</th>
                            <th className="border px-4 py-2">Harga</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {komponenList.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">
                                    {item.nama}
                                </td>
                                <td className="border px-4 py-2">
                                    {item.semester.length > 0
                                        ? item.semester[0].nama
                                        : "Semester tidak ditemukan"}
                                </td>
                                <td className="border px-4 py-2">
                                    {item.harga}
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => onEdit(item.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700 ml-2"
                                        onClick={() => onDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
