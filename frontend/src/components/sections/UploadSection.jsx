import { useState } from "react";

export default function UploadSection({ setUploaded, setData, setLoading }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setData(data);
    setUploaded(true);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-3xl font-bold mb-4">
        🚗 Accident Analysis Dashboard
      </h1>

      <p className="mb-6 text-gray-600">
        Upload your dataset to begin analysis
      </p>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-6 py-2 rounded-xl"
      >
        Analyze Data
      </button>

    </div>
  );
}