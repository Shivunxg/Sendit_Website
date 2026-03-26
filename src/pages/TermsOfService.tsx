import React from 'react';
import { motion } from 'motion/react';

const TermsOfService = () => {
  return (
    <div className="pt-32 pb-24 bg-bg-base">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Terms of Service</h1>
          <p className="text-slate-500 mb-12">Last Updated: March 13, 2026</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">1. Agreement to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and <strong>Sendit Logistics Pvt Ltd</strong> ("we," "us" or "our"), concerning your access to and use of our website and services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">2. Services</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Sendit provides a unified logistics operating system, including warehouse management (WareSync) and courier aggregation (SwiftShip). By using our services, you agree to comply with all applicable laws and regulations.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to withdraw or amend our services, and any material we provide on the website, in our sole discretion without notice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">3. User Accounts</h2>
              <p className="text-slate-600 leading-relaxed">
                To access certain features of the services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">4. Shipping and Logistics</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                As a logistics aggregator, we facilitate shipping through third-party courier partners. Each shipment is subject to the specific terms and conditions of the respective courier partner selected for that shipment.
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>You are responsible for the accuracy of shipping labels and package details.</li>
                <li>Prohibited items as defined by law or courier policies must not be shipped.</li>
                <li>Liability for lost or damaged goods is governed by the courier partner's policy.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">5. Payments and Billing</h2>
              <p className="text-slate-600 leading-relaxed">
                Fees for our services are as set forth in our pricing plans or as otherwise agreed upon. All payments are non-refundable unless otherwise specified. We use third-party payment processors to handle billing.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">6. Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed">
                The website and its entire contents, features, and functionality are owned by <strong>Sendit Logistics Pvt Ltd</strong> and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">7. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                In no event will <strong>Sendit Logistics Pvt Ltd</strong>, its affiliates or their licensors, service providers, employees, agents, officers or directors be liable for damages of any kind arising out of or in connection with your use of the services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">8. Governing Law</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be governed by and defined following the laws of India. <strong>Sendit Logistics Pvt Ltd</strong> and yourself irrevocably consent that the courts of Bangalore, Karnataka shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
