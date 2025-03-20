import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import LyricsPage from "./pages/lyricsPage";
import AddLyricsPage from "./pages/addLyricsPage";
import BooksPage from "./pages/booksPage";
import VideosPage from "./pages/videosPage";
import PrintPressPage from "./pages/printPressPage";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lyrics" element={<LyricsPage />} />
        <Route path="/add-lyrics" element={<AddLyricsPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/print-press" element={<PrintPressPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
