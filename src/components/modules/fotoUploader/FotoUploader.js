'use client';
import { useState } from 'react';

export default function FotoUploaderConfirmable({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      alert('Only image files are allowed');
      return;
    }

    if (selected.size > 2 * 1024 * 1024) {
      alert('Max file size is 2MB');
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.readAsDataURL(selected);
    reader.onload = () => setPreview(reader.result);
  };

const handleConfirmUpload = async () => {
  if (!preview) return;
  setUploading(true);

  try {
    const res = await fetch('/api/fotoUpload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: preview }),
    });

    const data = await res.json();
    console.log('Upload response:', data);

    if (data.url) {
      setUploadedUrl(data.url);
      onUpload(data.url);
    } else {
      alert('Upload failed');
    }
  } catch (err) {
    console.error('Upload error:', err);
    alert('Something went wrong');
  } finally {
    setUploading(false);
  }
};

  const reset = () => {
    setFile(null);
    setPreview(null);
    setUploadedUrl(null);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md bg-white shadow-md w-full max-w-md">
      <label className="text-sm font-bold text-gray-700">Select Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {preview && (
        <div className="flex flex-col gap-2">
          <img
            src={preview}
            alt="Preview"
            className="w-20 rounded-md border object-cover"
          />
          {!uploadedUrl && (
            <div className="flex gap-2">
              <button
                onClick={handleConfirmUpload}
                disabled={uploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Confirm Upload'}
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {uploadedUrl && (
        <div className="text-sm text-green-600">
          ✅ Uploaded successfully!
          <br />
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View on Cloudinary
          </a>
        </div>
      )}
    </div>
  );
}