import { useState } from "react";
import Layout from "../Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null); // For handling errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending POST request to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to send the message.");
      }

      // If the request was successful, set the form submission state to true
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-teal-600 text-center mb-6">
          Contact Us
        </h1>
        {!formSubmitted && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="6"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors"
            >
              Submit
            </button>
          </form>
        )}

        {formSubmitted && (
          <div className="mt-6 text-center text-teal-600 font-semibold  border border-teal-600 rounded-lg shadow-lg p-8">
            Thank you for contacting us! We will get back to you shortly.
          </div>
        )}

        {error && (
          <div className="mt-6 text-center text-red-600 font-semibold border border-teal-600 rounded-lg shadow-lg">
            {error}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Contact;
