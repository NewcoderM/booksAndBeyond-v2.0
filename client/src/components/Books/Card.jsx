/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const Card = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <img
        src={import.meta.env.VITE_CLOUDINARY_URL+book.cover_image}
        alt={book.title}
        className="w-full h-60 object-cover rounded"
      />
      <h2 className="mt-2 text-lg font-bold">{book.title}</h2>
      <p className="text-sm text-gray-600">{book.author}</p>
    </div>
  );
};

export default Card;
