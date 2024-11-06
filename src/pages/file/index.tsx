import React, { useState } from 'react';

const FileUploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [downloadUrl, setDownloadUrl] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            if (selectedFile.size > 25 * 1024 * 1024) { // 25MB in bytes
                setMessage('File size exceeds 25MB limit.');
                setFile(null);
            } else {
                setFile(selectedFile);
                setMessage('');
            }
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://r2-worker.nergis.workers.dev/', {
                method: 'PUT',
                headers: {
                    'X-Custom-Auth-Key': '29eabc03b430474075af4d107eab1964',
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('File uploaded successfully!');
                setDownloadUrl(data.download_url);
            } else {
                setMessage('File upload failed.');
            }
        } catch (error) {
            setMessage('An error occurred during file upload.');
        }
    };

    return (
        <div>
            <h1>File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
            {downloadUrl && (
                <p>
                    Download URL: <a href={downloadUrl} target="_blank" rel="noopener noreferrer">{downloadUrl}</a>
                </p>
            )}
        </div>
    );
};

export default FileUploadPage;
