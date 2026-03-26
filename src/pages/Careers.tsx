import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Briefcase, Mail, User, FileText, Send, CheckCircle2, X } from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const jobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Software Engineer (Backend)',
    location: 'Bengaluru, India',
    type: 'Full-time',
    description: 'We are looking for a highly skilled Senior Backend Engineer to join our growing team. You will be responsible for designing, developing, and maintaining scalable and robust backend services.',
    requirements: [
      '5+ years of experience in backend development with Node.js/TypeScript.',
      'Strong understanding of microservices architecture and RESTful APIs.',
      'Experience with relational and NoSQL databases (PostgreSQL, MongoDB).',
      'Proficiency in cloud platforms (AWS, GCP).',
      'Excellent problem-solving and communication skills.'
    ],
    responsibilities: [
      'Design, develop, and deploy high-performance backend services.',
      'Collaborate with frontend and product teams to define API contracts.',
      'Ensure the scalability, reliability, and security of our systems.',
      'Mentor junior engineers and contribute to technical decision-making.'
    ]
  },
  {
    id: '2',
    title: 'Product Manager (Logistics)',
    location: 'Mumbai, India',
    type: 'Full-time',
    description: 'As a Product Manager, you will be instrumental in shaping the future of our logistics platform. You will work closely with engineering, design, and business teams to deliver innovative solutions.',
    requirements: [
      '3+ years of product management experience, preferably in logistics or supply chain.',
      'Strong analytical skills and ability to define product roadmaps.',
      'Experience with agile development methodologies.',
      'Excellent communication and stakeholder management skills.'
    ],
    responsibilities: [
      'Define and execute the product strategy and roadmap for key logistics features.',
      'Conduct market research, competitive analysis, and gather customer feedback.',
      'Translate product strategy into detailed requirements and user stories.',
      'Monitor product performance and identify areas for improvement.'
    ]
  },
  {
    id: '3',
    title: 'Frontend Developer (React)',
    location: 'Bengaluru, India',
    type: 'Full-time',
    description: 'We are seeking a talented Frontend Developer with expertise in React to build responsive and intuitive user interfaces for our web applications.',
    requirements: [
      '3+ years of experience in frontend development using React, TypeScript, and Tailwind CSS.',
      'Proficiency in modern JavaScript, HTML5, and CSS3.',
      'Experience with state management libraries (e.g., Redux, Zustand).',
      'Strong understanding of responsive design principles and cross-browser compatibility.'
    ],
    responsibilities: [
      'Develop and maintain user-facing features using React and related technologies.',
      'Collaborate with UI/UX designers to implement engaging user experiences.',
      'Optimize applications for maximum speed and scalability.',
      'Ensure technical feasibility of UI/UX designs.'
    ]
  }
];

const Careers = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    if (!name || !email || !resume) {
      setSubmissionStatus('error');
      setMessage('Please fill in all required fields and upload your resume.');
      setIsSubmitting(false);
      return;
    }

    // Simulate resume submission
    setTimeout(() => {
      console.log('Resume submitted:', { name, email, resume: resume?.name, message });
      setSubmissionStatus('success');
      setMessage('Thank you for your application! We will review your submission shortly.');
      setName('');
      setEmail('');
      setResume(null);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 premium-hero min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Be a part of a fast-growing logistics tech company that's redefining fulfillment in India.
            </p>
          </motion.div>
        </div>

        {/* Job Postings Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Current Openings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobPostings.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="standard-card p-8 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-3">{job.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400" /> {job.type} &middot; {job.location}
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-6">{job.description}</p>
                  
                  <h4 className="font-bold mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 mb-6">
                    {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>

                  <h4 className="font-bold mb-2">Responsibilities:</h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 mb-6">
                    {job.responsibilities.map((res, i) => <li key={i}>{res}</li>)}
                  </ul>
                </div>
                <button className="mt-6 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume Submission Form */}
        <div className="max-w-3xl mx-auto standard-card p-8 md:p-12">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Submit Your Resume</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-slate-700 mb-2">Upload Resume (PDF only)</label>
              <div className="relative border border-slate-200 rounded-2xl p-4 bg-white flex items-center gap-4">
                <FileText className="w-6 h-6 text-slate-400" />
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  required
                />
                <span className="text-slate-600 flex-grow truncate">{resume ? resume.name : 'Choose file'}</span>
                <button type="button" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                  Browse
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Cover Letter / Message (Optional)</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Tell us about yourself and why you'd be a great fit..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Send className="w-5 h-5 animate-pulse" /> Submitting...
                </>
              ) : (
                <>
                  Submit Application <Send className="w-5 h-5" />
                </>
              )}
            </button>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: submissionStatus !== 'idle' ? 1 : 0, y: submissionStatus !== 'idle' ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 text-center ${submissionStatus === 'success' ? 'text-emerald-600' : 'text-red-600'} flex items-center justify-center gap-2`}
            >
              {submissionStatus === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {submissionStatus === 'error' && <X className="w-5 h-5" />}
              {message}
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Careers;
