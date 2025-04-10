import UploadForm from "./Upload";

export default function Page() {
    return (
        <main className="flex items-center justify-center w-screen jc">
            <div className="w-full max-w-7xl">
                <UploadForm />
            </div>
        </main>
    );
}