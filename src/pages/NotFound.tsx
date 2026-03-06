import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-emerald-600 font-semibold mb-3">404</p>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4">Page not found</h1>
        <p className="text-lg text-slate-600 mb-8">
          The page you are looking for may have moved. Use the links below to continue exploring Sendit.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold">Go to Home</Link>
          <Link to="/solutions" className="px-6 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700">View Solutions</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
