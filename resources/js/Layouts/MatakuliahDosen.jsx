export default function MatakuliahDosen({ title, actionButton, children }) {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-2xl font-bold text-green-700">{title}</h1>
                {actionButton && <div>{actionButton}</div>}
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">{children}</div>
        </div>
    );
}
