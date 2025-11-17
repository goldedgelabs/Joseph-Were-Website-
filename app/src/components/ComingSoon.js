import React, { useState } from "react";
import API_BASE_URL from "../config";

export default function ComingSoon() {
  const [title, setTitle] = useState("");
  const [days, setDays] = useState("");

  const submit = async () => {
    if (!title || !days) return alert("Fill all fields!");

    const res = await fetch(`${API_BASE_URL}/api/project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, days }),
    });

    const data = await res.json();
    if (data.success) alert("Project saved!");
  };

  return (
    <div style={styles.card}>
      <h2>Add Coming Soon Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        style={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Days Until Launch"
        style={styles.input}
        onChange={(e) => setDays(e.target.value)}
      />

      <button style={styles.button} onClick={submit}>
        Save Project
      </button>
    </div>
  );
}

const styles = {
  card: {
    marginTop: 40,
    padding: 20,
    width: 350,
    margin: "40px auto",
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
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
