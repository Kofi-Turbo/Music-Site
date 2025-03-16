import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="container">
      <h1>Welcome to M.B.A VENTURES</h1>
      <p>Explore our content:</p>
      <ul>
        <li><Link to="/lyrics">Lyrics</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/videos">Videos</Link></li>
        <li><Link to="/print-press">Print Press</Link></li>
      </ul>
    </div>
  );
}

export default LandingPage;
