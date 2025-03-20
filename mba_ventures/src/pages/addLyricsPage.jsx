import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/lyricsPage.css";

const API_BASE_URL = "https://mba-ventures-api.onrender.com";

function AddLyricsPage() {
  const [newLyrics, setNewLyrics] = useState("");
  const [author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newLyrics.trim() || !author.trim()) {
      setErrorMessage("All fields must be filled!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/lyrics`, {
        author,
        lyrics: newLyrics,
      });

      if (response.status === 200 || response.status === 201) {
        setNewLyrics("");
        setAuthor("");
        setErrorMessage("");
        navigate("/lyrics");
      }
    } catch (error) {
      console.error("Error adding lyrics:", error);
      setErrorMessage("Failed to post lyrics. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Add New Lyrics</h1>
      <div className="form-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your lyrics here..."
            value={newLyrics}
            onChange={(e) => setNewLyrics(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="post-button">Post Lyrics</button>
          <button type="button" className="cancel-button" onClick={() => navigate("/lyrics")}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLyricsPage;
