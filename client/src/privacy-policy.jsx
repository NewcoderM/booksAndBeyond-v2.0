import Layout from "./components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-6">Privacy Policy</h1>
        <p className="mb-4">
          We value your privacy. This Privacy Policy explains how we collect, use,
          and protect your information when you use our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal details like your name, email, and account preferences.
          Additionally, we collect usage data such as pages visited and time spent.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">
          Information is used to personalize your experience, improve our services, 
          and send occasional updates (if opted-in).
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Third-Party Sharing</h2>
        <p className="mb-4">
          We do not sell your data. We may share limited data with trusted partners 
          for analytics or service delivery.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal data at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Contact Us</h2>
        <p className="mb-4">
          For privacy questions, email us at privacy@booksandbeyond.com.
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
