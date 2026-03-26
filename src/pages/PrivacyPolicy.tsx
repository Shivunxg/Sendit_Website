import React from 'react';
import { motion } from 'motion/react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-24 bg-bg-base">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Privacy Policy</h1>
          <p className="text-slate-500 mb-12">Last Updated: March 13, 2026</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Welcome to Sendit. This Privacy Policy explains how <strong>Sendit Logistics Pvt Ltd</strong> ("we", "us", or "our") collects, uses, discloses, and safeguards your information when you visit our website and use our services.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We are committed to protecting your personal data and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at privacy@sendit.in.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">2. Information We Collect</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the website or otherwise contacting us.
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Name and Contact Data (Email, Phone Number, Address)</li>
                <li>Business Information (Company Name, GSTIN, Industry)</li>
                <li>Logistics and Shipping Data (Pickup addresses, delivery addresses, package details)</li>
                <li>Payment Information (Billing address, payment methods)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use personal information collected via our website for a variety of business purposes described below:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>To facilitate account creation and logon process.</li>
                <li>To fulfill and manage your shipping orders.</li>
                <li>To provide tracking information and delivery updates.</li>
                <li>To send administrative information to you.</li>
                <li>To protect our services and prevent fraud.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">4. Sharing Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may process or share data based on the following legal basis:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li><strong>Courier Partners:</strong> We share necessary shipping details with our courier partners (e.g., Bluedart, Delhivery, Xpressbees) to fulfill your deliveries.</li>
                <li><strong>Service Providers:</strong> We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf.</li>
                <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">5. Data Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">6. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have questions or comments about this policy, you may email us at privacy@sendit.in or by post to:<br /><br />
                <strong>Sendit Logistics Pvt Ltd</strong><br />
                Bangalore, Karnataka, India
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
