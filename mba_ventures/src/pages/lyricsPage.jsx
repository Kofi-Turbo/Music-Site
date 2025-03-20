import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/lyricsPage.css";

const API_BASE_URL = "https://mba-ventures-api.onrender.com";

function LyricsPage() {
  const [lyrics, setLyrics] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedLyrics, setUpdatedLyrics] = useState("");
  const [updatedAuthor, setUpdatedAuthor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLyrics();
  }, []);

  const fetchLyrics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lyrics`);
      setLyrics(response.data);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }
  };

  const deleteLyrics = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/lyrics/${id}`);
      setLyrics(lyrics.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting lyrics:", error);
    }
  };

  const startEditing = (entry) => {
    setEditingId(entry.id);
    setUpdatedLyrics(entry.lyrics);
    setUpdatedAuthor(entry.author);
  };

  const saveUpdatedLyrics = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/lyrics/${id}`, {
        author: updatedAuthor,
        lyrics: updatedLyrics,
      });

      setLyrics(
        lyrics.map((entry) =>
          entry.id === id ? { ...entry, author: updatedAuthor, lyrics: updatedLyrics } : entry
        )
      );

      setEditingId(null);
    } catch (error) {
      console.error("Error updating lyrics:", error);
    }
  };

  return (
    <div className="container">
      <h1>Lyrics Page</h1>
      <button onClick={() => navigate("/add-lyrics")} className="post-button">
        Add New Lyrics
      </button>

      <div>
        <h2>Posted Lyrics</h2>
        {lyrics.map((entry) => (
          <div key={entry.id} className="lyrics-card">
            {editingId === entry.id ? (
              <>
                <input
                  type="text"
                  value={updatedAuthor}
                  onChange={(e) => setUpdatedAuthor(e.target.value)}
                />
                <textarea
                  value={updatedLyrics}
                  onChange={(e) => setUpdatedLyrics(e.target.value)}
                />
                <button className="save-button" onClick={() => saveUpdatedLyrics(entry.id)}>
                  Save
                </button>
                <button className="cancel-button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{entry.author}</h3>
                <p className="lyrics-text">{entry.lyrics.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
                </p>
                <button className="edit-button" onClick={() => startEditing(entry)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => deleteLyrics(entry.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LyricsPage;
