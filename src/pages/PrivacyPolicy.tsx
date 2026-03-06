const PrivacyPolicy = () => {
  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <section className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-slate-600 mb-8">
          This policy explains how Sendit Logistics Technologies Pvt Ltd collects, uses, and safeguards business and personal information on this website.
        </p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. Information we collect</h2>
            <p>
              We collect contact details you submit through forms, product usage details needed to provide services, and technical analytics such as browser type and page interactions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. How we use information</h2>
            <p>
              Data is used to respond to inquiries, deliver and improve our logistics platform, monitor performance, and comply with legal obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. Data security</h2>
            <p>
              We implement industry-standard safeguards and restrict internal access to authorized teams only. No method of transmission is 100% secure, but we continuously improve protection controls.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Contact</h2>
            <p>
              For privacy requests, email us at <span className="font-semibold">privacy@sendit.com</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
