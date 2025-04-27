export default function SelectSemester({
    semesters,
    selectedSemester,
    onChange,
}) {
    return (
        <select
            value={selectedSemester}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded p-2"
        >
            <option value="">Pilih Semester</option>
            {semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                    {semester.nama}
                </option>
            ))}
        </select>
    );
}
