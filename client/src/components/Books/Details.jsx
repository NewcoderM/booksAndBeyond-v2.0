import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { Pencil, Trash } from "lucide-react";
import { toast } from 'react-toastify';

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const isAuthenticated = localStorage.getItem("token");
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const { id } = useParams();

  const toggleComment = (id) => {
    if (editingId === id) {
      setEditingId(null);
      setEditedComment("");
    } else {
      const commentToEdit = comments.find((comment) => comment.id === id);
      setEditingId(id);
      setEditedComment(commentToEdit?.text || "");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/books/${id}/comments`
      );
      if (!response.ok) {
        toast("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/books/${id}`
        );
        if (!response.ok) {
          toast("Failed to fetch book details");
        } else {
          await fetchComments();
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    if (newComment.length > 300) {
      setError("Comment cannot exceed 300 characters.");
      return;
    }

    try {
      const commentData = {
        text: newComment.trim(),
        book: id,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        toast("Failed to add comment");
      } else {
        toast("Comment added")
      }

      const addedComment = await response.json();
      setComments([addedComment, ...comments]);
      setNewComment("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditSubmit = async (e, comment) => {
    e.preventDefault();

    if (!editedComment.trim()) {
      toast("Edited comment cannot be empty.");
      return;
    }
    if (editedComment.length > 300) {
      toast("Edited comment cannot exceed 300 characters.");
      return;
    }

    try {
      const updatedCommentData = {
        text: editedComment.trim(),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/${comment.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedCommentData),
        }
      );

      if (!response.ok) {
        toast("Failed to update comment");
      } else {
        toast("Comment updated")
      }

      const updatedComment = await response.json();
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === updatedComment.id ? updatedComment : c
        )
      );

      setEditingId(null);
      setEditedComment("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/${commentId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        toast("Failed to delete comment");
      } else {
        toast("Comment deleted")
      }

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error && !book) {
    return (
      <Layout>
        <p className="text-center text-lg font-semibold text-red-500">
          {error}
        </p>
      </Layout>
    );
  }

  if (!book)
    return (
      <Layout>
        <p className="text-center text-lg font-semibold text-red-500">
          Book not found!
        </p>
      </Layout>
    );

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          <img
            src={import.meta.env.VITE_CLOUDINARY_URL + book.cover_image}
            alt={book.title}
            className="w-full lg:w-1/3 h-80 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="mt-1 text-gray-600 text-sm">By {book.author}</p>
            <p className="text-gray-700 mt-3 leading-relaxed">
              {book.description}
            </p>
          </div>
        </div>

        <div className="mt-8">
          {comments && comments.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold border-b pb-2">Comments</h2>
              {error && (
                <p className="text-red-500 font-semibold mt-2">{error}</p>
              )}
              <div className="mt-3 space-y-3">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border p-3 rounded bg-gray-100 shadow-sm flex flex-row justify-between items-center"
                  >
                    <div className="flex flex-row justify-center items-center space-x-4">
                      <p className="text-sm font-semibold text-gray-700">
                        Commented By {comment.customer.username}
                      </p>
                      <p className="text-teal-900 font-bold">{comment.text}</p>
                      {localStorage.getItem("user") ===
                        comment.customer?.username && (
                        <div className="flex space-x-2">
                          {editingId === comment.id ? (
                            <form
                              onSubmit={(e) => handleEditSubmit(e, comment)}
                              className="mt-2 flex flex-row justify-center items-center space-x-4"
                            >
                              <textarea
                                className="w-full border rounded-lg p-2"
                                value={editedComment}
                                onChange={(e) =>
                                  setEditedComment(e.target.value)
                                }
                              />
                              <button
                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                type="submit"
                              >
                                Save
                              </button>
                              <button
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                type="button"
                                onClick={() => toggleComment(comment.id)}
                              >
                                Cancel
                              </button>
                            </form>
                          ) : (
                            <div>
                              <button onClick={() => toggleComment(comment.id)}>
                                <Pencil className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                              </button>
                              <button onClick={() => handleDelete(comment.id)}>
                                <Trash className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No comments yet.</p>
          )}

          <h2 className="text-xl font-semibold my-5">Add Your Comment</h2>
          {error && (
            <p className="text-red-500 font-semibold mb-3">{error}</p>
          )}
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-teal-400"
                placeholder="Add your comment..."
                rows="3"
              ></textarea>
              <button
                type="submit"
                className="mt-3 bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition"
              >
                Submit Comment
              </button>
            </form>
          ) : (
            <p>Login to give a comment</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Details;
