const Footer = () => {
  return (
    <footer className="bg-teal-600 text-white px-6 sm:px-24 py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 BooksAndBeyond. All rights reserved.</p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-2">
          <a href="/privacy-policy" className="hover:text-teal-200">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-teal-200">
            Terms of Service
          </a>
          <a href="/contact" className="hover:text-teal-200">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
