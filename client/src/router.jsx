import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./components/Books/Details";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Contact from "./components/Contact";
import Books from "./components/Books";
import Home from "./components/Home";
import NotFound from "./notFound";
import PrivacyPolicy from "./privacy-policy";
import TermsOfService from "./terms";

const BaseRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<Details />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default BaseRouter;
