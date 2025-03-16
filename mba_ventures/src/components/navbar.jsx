import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <h1>MBA VENTURES</h1>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/lyrics" onClick={() => setIsOpen(false)}>Lyrics</Link>
        <Link to="/books" onClick={() => setIsOpen(false)}>Books</Link>
        <Link to="/videos" onClick={() => setIsOpen(false)}>Videos</Link>
        <Link to="/print-press" onClick={() => setIsOpen(false)}>Print Press</Link>
      </div>
    </nav>
  );
}

export default Navbar;
