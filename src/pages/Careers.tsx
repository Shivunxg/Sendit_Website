import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Briefcase, Mail, User, FileText, Send, CheckCircle2, X, Plus, Trash2, Edit2, Save, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { db, auth } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  active: boolean;
  createdAt: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  // Form states for application
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Admin Editor states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<JobPosting> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user is admin in Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else if (user.email === "shivuNXG@gmail.com") {
            setIsAdmin(true); // Default admin fallback
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          if (user.email === "shivuNXG@gmail.com") setIsAdmin(true);
        }
      } else {
        setIsAdmin(false);
      }
      setIsAuthReady(true);
    });

    const q = query(collection(db, 'jobPostings'), orderBy('createdAt', 'desc'));
    const unsubscribeJobs = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JobPosting[];
      setJobs(jobsData);
    }, (error) => {
      console.error("Error fetching jobs:", error);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeJobs();
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    if (!name || !email || !resume) {
      setSubmissionStatus('error');
      setStatusMessage('Please fill in all required fields and upload your resume.');
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real app, we'd upload to Firebase Storage and save to Firestore
      // For now, we simulate the success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmissionStatus('success');
      setStatusMessage('Thank you for your application! We will review your submission shortly.');
      setName('');
      setEmail('');
      setResume(null);
      setMessage('');
    } catch (error) {
      setSubmissionStatus('error');
      setStatusMessage('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveJob = async () => {
    if (!editingJob?.title || !editingJob?.location || !editingJob?.description) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSaving(true);
    try {
      const jobData = {
        ...editingJob,
        requirements: editingJob.requirements || [],
        responsibilities: editingJob.responsibilities || [],
        active: editingJob.active ?? true,
        createdAt: editingJob.createdAt || new Date().toISOString(),
      };

      if (editingJob.id) {
        const { id, ...data } = jobData;
        await updateDoc(doc(db, 'jobPostings', id), data);
      } else {
        await addDoc(collection(db, 'jobPostings'), jobData);
      }
      setIsEditorOpen(false);
      setEditingJob(null);
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job posting.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await deleteDoc(doc(db, 'jobPostings', id));
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job posting.");
    }
  };

  const openEditor = (job: Partial<JobPosting> | null = null) => {
    setEditingJob(job || {
      title: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: [''],
      responsibilities: [''],
      active: true
    });
    setIsEditorOpen(true);
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
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">Join Our Team</h1>
            <p className="text-xl text-brand-secondary/60 max-w-2xl mx-auto leading-relaxed">
              Be a part of a fast-growing logistics tech company that's redefining fulfillment in India.
            </p>
            
            {isAdmin && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => openEditor()}
                className="mt-8 px-6 py-3 bg-brand-primary text-white rounded-xl font-bold flex items-center gap-2 mx-auto hover:bg-brand-secondary transition-all"
              >
                <Plus className="w-5 h-5" /> Add New Job Posting
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Job Postings Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-display font-bold">Current Openings</h2>
            <div className="h-px bg-brand-secondary/10 flex-grow mx-8 hidden md:block" />
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-20 standard-card">
              <Briefcase className="w-12 h-12 text-brand-secondary/20 mx-auto mb-4" />
              <p className="text-brand-secondary/60 italic">No open positions at the moment. Check back later!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.filter(j => j.active || isAdmin).map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`standard-card p-8 flex flex-col justify-between relative group ${!job.active ? 'opacity-50 grayscale' : ''}`}
                >
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditor(job)}
                        className="p-2 bg-white border border-brand-secondary/10 rounded-lg text-brand-secondary hover:text-brand-primary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 bg-white border border-brand-secondary/10 rounded-lg text-brand-secondary hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-2xl font-bold text-brand-dark">{job.title}</h3>
                      {!job.active && <span className="text-[10px] bg-brand-secondary/10 text-brand-secondary px-2 py-0.5 rounded-full uppercase font-bold">Inactive</span>}
                    </div>
                    <p className="text-brand-secondary/60 text-sm mb-4 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-brand-secondary/40" /> {job.type} &middot; {job.location}
                    </p>
                    <p className="text-brand-secondary/80 leading-relaxed mb-6 line-clamp-3">{job.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-sm text-brand-dark mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {job.requirements.slice(0, 3).map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-brand-secondary/60">
                              <div className="w-1 h-1 bg-brand-primary rounded-full mt-1.5 shrink-0" />
                              {req}
                            </li>
                          ))}
                          {job.requirements.length > 3 && <li className="text-xs text-brand-primary font-medium">+{job.requirements.length - 3} more</li>}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      const el = document.getElementById('apply-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-8 w-full py-4 bg-brand-dark text-white rounded-xl font-bold hover:bg-brand-secondary transition-all flex items-center justify-center gap-2 group"
                  >
                    Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Resume Submission Form */}
        <div id="apply-form" className="max-w-3xl mx-auto standard-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <h2 className="text-4xl font-display font-bold text-center mb-4">Submit Your Resume</h2>
            <p className="text-center text-brand-secondary/60 mb-12">Don't see a role that fits? Send us your resume anyway!</p>
            
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-brand-dark mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-secondary/40" />
                    <input
                      type="text"
                      id="name"
                      className="w-full pl-12 pr-4 py-4 bg-brand-secondary/5 border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-brand-dark mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-secondary/40" />
                    <input
                      type="email"
                      id="email"
                      className="w-full pl-12 pr-4 py-4 bg-brand-secondary/5 border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="john.doe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-bold text-brand-dark mb-2">Upload Resume (PDF only)</label>
                <div className="relative border-2 border-dashed border-brand-secondary/20 rounded-2xl p-8 bg-brand-secondary/5 flex flex-col items-center justify-center gap-4 hover:border-brand-primary/40 transition-colors group">
                  <FileText className="w-10 h-10 text-brand-secondary/20 group-hover:text-brand-primary/40 transition-colors" />
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                    required
                  />
                  <div className="text-center">
                    <p className="text-brand-dark font-bold">{resume ? resume.name : 'Click to upload or drag and drop'}</p>
                    <p className="text-xs text-brand-secondary/60 mt-1">PDF files up to 5MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-brand-dark mb-2">Cover Letter / Message (Optional)</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-4 bg-brand-secondary/5 border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                  placeholder="Tell us about yourself and why you'd be a great fit..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg hover:bg-brand-secondary transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {submissionStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      submissionStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}
                  >
                    {submissionStatus === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <p className="text-sm font-medium">{statusMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>

      {/* Admin Job Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditorOpen(false)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-brand-secondary/10 flex items-center justify-between">
                <h3 className="text-2xl font-display font-bold">{editingJob?.id ? 'Edit Job Posting' : 'Add New Job Posting'}</h3>
                <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-brand-secondary/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Job Title</label>
                    <input 
                      type="text" 
                      value={editingJob?.title || ''} 
                      onChange={e => setEditingJob(prev => ({ ...prev!, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-brand-secondary/5 border border-brand-secondary/10 rounded-xl outline-none focus:border-brand-primary"
                      placeholder="e.g. Senior Backend Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Location</label>
                    <input 
                      type="text" 
                      value={editingJob?.location || ''} 
                      onChange={e => setEditingJob(prev => ({ ...prev!, location: e.target.value }))}
                      className="w-full px-4 py-3 bg-brand-secondary/5 border border-brand-secondary/10 rounded-xl outline-none focus:border-brand-primary"
                      placeholder="e.g. Bengaluru, India"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Job Type</label>
                    <select 
                      value={editingJob?.type || 'Full-time'} 
                      onChange={e => setEditingJob(prev => ({ ...prev!, type: e.target.value }))}
                      className="w-full px-4 py-3 bg-brand-secondary/5 border border-brand-secondary/10 rounded-xl outline-none focus:border-brand-primary"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4 h-full pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={editingJob?.active ?? true} 
                        onChange={e => setEditingJob(prev => ({ ...prev!, active: e.target.checked }))}
                        className="w-5 h-5 rounded border-brand-secondary/20 text-brand-primary focus:ring-brand-primary"
                      />
                      <span className="font-bold text-sm">Active Listing</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea 
                    rows={4}
                    value={editingJob?.description || ''} 
                    onChange={e => setEditingJob(prev => ({ ...prev!, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-brand-secondary/5 border border-brand-secondary/10 rounded-xl outline-none focus:border-brand-primary"
                    placeholder="Brief overview of the role..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold">Requirements</label>
                    <button 
                      onClick={() => setEditingJob(prev => ({ ...prev!, requirements: [...(prev?.requirements || []), ''] }))}
                      className="text-xs font-bold text-brand-primary hover:underline"
                    >
                      + Add Requirement
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingJob?.requirements?.map((req, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input 
                          type="text" 
                          value={req} 
                          onChange={e => {
                            const newReqs = [...(editingJob.requirements || [])];
                            newReqs[idx] = e.target.value;
                            setEditingJob(prev => ({ ...prev!, requirements: newReqs }));
                          }}
                          className="flex-grow px-4 py-2 bg-brand-secondary/5 border border-brand-secondary/10 rounded-lg outline-none focus:border-brand-primary text-sm"
                        />
                        <button 
                          onClick={() => {
                            const newReqs = editingJob.requirements?.filter((_, i) => i !== idx);
                            setEditingJob(prev => ({ ...prev!, requirements: newReqs }));
                          }}
                          className="p-2 text-brand-secondary/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold">Responsibilities</label>
                    <button 
                      onClick={() => setEditingJob(prev => ({ ...prev!, responsibilities: [...(prev?.responsibilities || []), ''] }))}
                      className="text-xs font-bold text-brand-primary hover:underline"
                    >
                      + Add Responsibility
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingJob?.responsibilities?.map((res, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input 
                          type="text" 
                          value={res} 
                          onChange={e => {
                            const newRes = [...(editingJob.responsibilities || [])];
                            newRes[idx] = e.target.value;
                            setEditingJob(prev => ({ ...prev!, responsibilities: newRes }));
                          }}
                          className="flex-grow px-4 py-2 bg-brand-secondary/5 border border-brand-secondary/10 rounded-lg outline-none focus:border-brand-primary text-sm"
                        />
                        <button 
                          onClick={() => {
                            const newRes = editingJob.responsibilities?.filter((_, i) => i !== idx);
                            setEditingJob(prev => ({ ...prev!, responsibilities: newRes }));
                          }}
                          className="p-2 text-brand-secondary/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-brand-secondary/10 bg-brand-secondary/5 flex justify-end gap-4">
                <button 
                  onClick={() => setIsEditorOpen(false)}
                  className="px-6 py-2 text-brand-secondary font-bold hover:text-brand-dark transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveJob}
                  disabled={isSaving}
                  className="px-8 py-2 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Posting
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
