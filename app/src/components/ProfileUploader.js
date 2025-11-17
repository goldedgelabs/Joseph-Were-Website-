import React, { useState } from "react";
import API_BASE_URL from "../config";

export default function ProfileUploader() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) return alert("Select an image first!");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (data.url) {
        alert("Uploaded Successfully!");
        console.log("Image URL:", data.url);
      } else {
        alert("Upload failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Upload Profile Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: 120, height: 120, borderRadius: "50%", marginTop: 10 }}
        />
      )}

      <button style={styles.button} onClick={uploadImage} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: 20,
    width: 350,
    margin: "auto",
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  button: {
    marginTop: 15,
    padding: "10px 20px",
    borderRadius: 12,
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
