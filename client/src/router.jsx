import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./components/Books/Details";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Books from "./components/Books";
import Home from "./components/Home";
import NotFound from "./notFound";

const BaseRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default BaseRouter;
