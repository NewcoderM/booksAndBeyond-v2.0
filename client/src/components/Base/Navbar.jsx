import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  // Function to check active link
  const isActive = (path) => {
    if (path === "/books") {
      return location.pathname.startsWith("/books")
        ? "bg-teal-700"
        : "hover:text-teal-200";
    }
    return location.pathname === path ? "bg-teal-700" : "hover:text-teal-200";
  };

  const handleLogout = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate(0);
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  };

  return (
    <nav className="bg-teal-600 text-white px-4 lg:px-24 py-4 z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">BooksAndBeyond</div>

        {/* Hamburger Icon (Mobile View) */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navbar Links (Desktop View) */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className={`px-4 py-2 rounded ${isActive("/")}`}>
            Home
          </Link>
          <Link
            to="/books"
            className={`px-4 py-2 rounded ${isActive("/books")}`}
          >
            Books
          </Link>
          <Link
            to="/contact"
            className={`px-4 py-2 rounded ${isActive("/contact")}`}
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded ${isActive(
                "/contact"
              )} bg-teal-800 cursor-pointer`}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`px-4 py-2 rounded ${isActive(
                "/contact"
              )} bg-teal-800`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu (when isMenuOpen is true) */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-teal-600 z-50 flex flex-col items-center space-y-6 mt-20">
            <Link
              to="/"
              className={`text-white px-4 py-2 rounded ${isActive("/")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/books"
              className={`text-white px-4 py-2 rounded ${isActive("/books")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              to="/contact"
              className={`text-white px-4 py-2 rounded ${isActive("/contact")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded ${isActive(
                  "/contact"
                )} bg-teal-800 cursor-pointer`}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded ${isActive(
                  "/contact"
                )} bg-teal-800`}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;