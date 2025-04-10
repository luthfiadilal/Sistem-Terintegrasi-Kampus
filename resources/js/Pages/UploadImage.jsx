import { useForm } from '@inertiajs/react';


export default function UploadImage() {

    const { data, setData, post, processing, errors, reset } = useForm({
            file: null,
        });

    const uploadImage = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', data.file);

        post(route('upload-image'), formData ,{
            forceFormData: true, // Gunakan `body` untuk FormData
            onSuccess: () => alert("Upload berhasil!"),
            onError: (err) => console.error(err),
            onFinish: () => reset('file'),
        });
    };
    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
            <h1>Upload Image</h1>
            {/* buat form untuk upload image */}

            <form onSubmit={uploadImage} encType="multipart/form-data">

                <input type="file" name="file"  onChange={(e) => {
                        setData('file', e.target.files[0]);
                        console.log(e.target.files[0]); // Debugging
                    }}   />
                <button  type="submit" className='bg-blue-500 text-white px-4 py-2' > {processing ? "Uploading..." : "Upload"}</button>
            </form>
        </div>
    );
}
