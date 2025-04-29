export default function TagihanTable({ komponenData }) {
    return (
        <div className="overflow-x-auto shadow rounded-lg mb-6">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Nama Pembayaran</th>
                        <th className="border p-2">Harga</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Tanggal Bayar</th>
                    </tr>
                </thead>
                <tbody>
                    {komponenData.map((item) => (
                        <tr key={item.id}>
                            <td className="border p-2">{item.nama}</td>
                            <td className="border p-2">
                                Rp {item.harga.toLocaleString("id-ID")}
                            </td>
                            <td className="border p-2 capitalize">
                                {item.status.replace("_", " ")}
                            </td>
                            <td className="border p-2">
                                {item.tanggal_bayar
                                    ? new Date(
                                          item.tanggal_bayar
                                      ).toLocaleDateString("id-ID")
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
