// client/src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [agreements, setAgreements] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch the list of agreements
  const fetchAgreements = async () => {
    const { data, error } = await supabase
      .from("agreements")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      setError(error.message);
    } else {
      setAgreements(data);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAgreements().finally(() => setLoading(false));
    }
  }, [user]);

  // Handle the file upload process
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const filePath = `${user.id}/${file.name}`;

      // 1. Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("agreements")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Save the file metadata to the database
      const { error: dbError } = await supabase.from("agreements").insert({
        user_id: user.id,
        file_name: file.name,
        storage_path: filePath,
      });

      if (dbError) throw dbError;

      // 3. Refresh the file list
      await fetchAgreements();
      e.target.reset(); // Clear the form input
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle file download
  const handleDownload = async (filePath) => {
    try {
      const { data, error } = await supabase.storage
        .from("agreements")
        .createSignedUrl(filePath, 60); // Link is valid for 60 seconds

      if (error) throw error;

      window.open(data.signedUrl, "_blank");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle file deletion
  const handleDelete = async (agreement) => {
    if (
      window.confirm(`Are you sure you want to delete ${agreement.file_name}?`)
    ) {
      try {
        // 1. Delete from Storage
        const { error: storageError } = await supabase.storage
          .from("agreements")
          .remove([agreement.storage_path]);
        if (storageError) throw storageError;

        // 2. Delete from Database
        const { error: dbError } = await supabase
          .from("agreements")
          .delete()
          .eq("id", agreement.id);
        if (dbError) throw dbError;

        // 3. Refresh file list
        await fetchAgreements();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Agreement Management</h2>

        {/* --- Upload Form --- */}
        <form onSubmit={handleUpload} className="mb-6">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Upload New Agreement (PDF)
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="file-upload"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              type="submit"
              disabled={uploading}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>

        {/* --- File List --- */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Your Agreements</h3>
          {agreements.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {agreements.map((agreement) => (
                <li
                  key={agreement.id}
                  className="py-3 flex items-center justify-between"
                >
                  <span className="text-gray-800">{agreement.file_name}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleDownload(agreement.storage_path)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(agreement)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No agreements uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
