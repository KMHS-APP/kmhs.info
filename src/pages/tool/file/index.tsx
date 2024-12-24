import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const FileUploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > 25 * 1024 * 1024) {
        // 25MB in bytes
        setMessage("File size exceeds 25MB limit.");
        setFile(null);
      } else {
        setFile(selectedFile);
        setMessage("");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://r2-worker.nergis.workers.dev/", {
        method: "PUT",
        headers: {
          "X-Custom-Auth-Key": "29eabc03b430474075af4d107eab1964",
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("File uploaded successfully!");
        setDownloadUrl(data.download_url);
      } else {
        setMessage("File upload failed.");
      }
    } catch {
      setMessage("An error occurred during file upload.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">File Upload</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
      />
      <button
        onClick={handleUpload}
        className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
      >
        Upload
      </button>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      {downloadUrl && (
        <p className="text-blue-500">
          Download URL:{" "}
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {downloadUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default FileUploadPage;
