import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/lyricsPage.css";

const API_BASE_URL = "https://mba-ventures-api.onrender.com";

function LyricsPage() {
  const [lyrics, setLyrics] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLyrics, setEditingLyrics] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
    setEditingLyrics(entry);
    setIsEditing(true);
  };

  const saveUpdatedLyrics = async () => {
    if (!editingLyrics.author.trim() || !editingLyrics.lyrics.trim()) return;

    try {
      await axios.put(`${API_BASE_URL}/lyrics/${editingLyrics.id}`, {
        author: editingLyrics.author,
        lyrics: editingLyrics.lyrics,
      });

      setLyrics(lyrics.map((entry) =>
        entry.id === editingLyrics.id ? editingLyrics : entry
      ));

      setIsEditing(false);
      setEditingLyrics(null);
    } catch (error) {
      console.error("Error updating lyrics:", error);
    }
  };

  const filteredLyrics = lyrics.filter((entry) =>
    entry.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.lyrics.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Lyrics Page</h1>
      <button onClick={() => navigate("/add-lyrics")} className="post-button">
        Add New Lyrics
      </button>

      <input
        type="text"
        placeholder="Search by author or lyrics"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {isEditing ? (
        <div className="form-container">
          <h1>Edit Lyrics</h1>
          <input
            type="text"
            placeholder="Author Name"
            value={editingLyrics.author}
            onChange={(e) => setEditingLyrics({ ...editingLyrics, author: e.target.value })}
            required
          />
          <textarea
            placeholder="Edit lyrics..."
            value={editingLyrics.lyrics}
            onChange={(e) => setEditingLyrics({ ...editingLyrics, lyrics: e.target.value })}
            required
          ></textarea>
          <button className="post-button" onClick={saveUpdatedLyrics}>Save Changes</button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>Posted Lyrics</h2>
          {filteredLyrics.map((entry) => (
            <div key={entry.id} className="lyrics-card">
              <h3>{entry.author}</h3>
              <p className="lyrics-text">
                {entry.lyrics.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <button className="edit-button" onClick={() => startEditing(entry)}>Edit</button>
              <button className="delete-button" onClick={() => deleteLyrics(entry.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LyricsPage;
