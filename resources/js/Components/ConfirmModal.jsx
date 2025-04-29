export default function ConfirmModal({
    show,
    onClose,
    onConfirm,
    isSubmitting,
}) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                    Konfirmasi Pembayaran
                </h2>
                <p className="mb-6">
                    Apakah kamu yakin ingin membayar semua tagihan untuk
                    semester ini?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? "Memproses..." : "Bayar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
