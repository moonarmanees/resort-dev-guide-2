import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Counter from "./components/Counter";

export default function App() {
  return (
    <div className="container py-4">
      <nav className="mb-4">
        <Link to="/" className="me-3">
          Home
        </Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <hr />
      <Counter />
    </div>
  );
}
