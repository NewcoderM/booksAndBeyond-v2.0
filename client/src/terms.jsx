import Layout from "./components/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-6">Terms of Service</h1>
        <p className="mb-4">
          Welcome to BooksAndBeyond. By using our website, you agree to the following
          terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use of the Platform</h2>
        <p className="mb-4">
          You may browse, review, and purchase books. Any misuse or illegal activity 
          may result in account suspension.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. User Accounts</h2>
        <p className="mb-4">
          You are responsible for maintaining your account security and keeping 
          your credentials safe.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p className="mb-4">
          All content including text, graphics, and logos are owned by BooksAndBeyond 
          or its partners and are protected by copyright laws.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="mb-4">
          We are not liable for any damages that may arise from your use of this platform.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
        <p className="mb-4">
          These terms may be updated periodically. Continued use implies agreement to 
          the latest version.
        </p>
      </div>
    </Layout>
  );
};

export default TermsOfService;
