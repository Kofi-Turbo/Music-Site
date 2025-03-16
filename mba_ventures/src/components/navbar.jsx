import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>MBA VENTURES</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/lyrics">Lyrics</Link>
        <Link to="/books">Books</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/print-press">Print Press</Link>
      </div>
    </nav>
  );
}

export default Navbar;
