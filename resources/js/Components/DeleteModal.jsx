import Modal from "@/Components/Modal";
import { Button } from "@/Components/Button";

export default function DeleteModal({ show, onClose, onConfirm }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    Hapus Mata Kuliah
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus mata kuliah ini? Tindakan
                    ini tidak bisa dibatalkan.
                </p>

                <div className="mt-4 flex justify-end gap-2">
                    <Button onClick={onClose} variant="outline">
                        Batal
                    </Button>
                    <Button onClick={onConfirm} variant="destructive">
                        Hapus
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
