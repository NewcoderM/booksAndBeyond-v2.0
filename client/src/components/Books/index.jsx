import { useEffect, useState } from "react";
import Layout from "../Layout";
import Card from "./Card";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/books/`);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-10">Error: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-wrap gap-6 p-8">
        {books.map((book) => (
          <Card key={book.id} book={book} />
        ))}
      </div>
    </Layout>
  );
};

export default Books;