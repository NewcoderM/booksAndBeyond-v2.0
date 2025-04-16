import bannerImage from "/assets/images/banner.jpg";
import Layout from "../Layout";

const Home = () => {
  return (
    <Layout>
      <div className="relative h-full w-full flex flex-col justify-center items-center text-center text-white">
        {/* Background Image */}
        <img
          src={bannerImage}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Overlay Content */}
        <div className="relative z-10 p-4">
          <h1 className="text-4xl font-extrabold text-teal-200 mb-4">
            Welcome to BooksAndBeyond
          </h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Discover your next favorite book! Dive into a world of knowledge,
            imagination, and adventure. Whether into fiction, non-fiction, or
            the latest bestsellers, we have something for everyone.
          </p>
          <div className="space-x-4">
            <a
              href="/books"
              className="bg-teal-600 px-6 py-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Start Viewing
            </a>
            <a
              href="contact"
              className="bg-transparent border-2 border-teal-600 px-6 py-4 rounded-lg hover:bg-teal-700 hover:border-teal-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
