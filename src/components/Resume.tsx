import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResumeSheet } from './resume/ResumeSheet';
import { resumeData } from '../data/resume-data';

import { SPRING_PRESETS } from '../lib/animation';

const Resume: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={SPRING_PRESETS.smooth}
      className="min-h-screen bg-[#F0EFED] text-[#1A1C19] font-body selection:bg-[#324A49] selection:text-white"
    >
      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#F0EFED]/80 backdrop-blur-md border-b border-neutral-200/50 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors group"
            aria-label="Back to home"
          >
            <ArrowLeft size={20} className="group-active:scale-90 transition-transform" />
          </button>
          <div className="h-4 w-[1px] bg-neutral-300" />
          <span className="font-mono text-xs tracking-widest uppercase font-bold text-neutral-500">
            RESUME_VIEWER
          </span>
        </div>
      </nav>

      {/* RESUME CONTENT */}
      <main className="pt-32 pb-24 flex justify-center">
        <div className="shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden bg-white">
          <ResumeSheet data={resumeData} />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="pb-12 text-center">
        <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.2em]">
          End of Document — Generated at {new Date().toLocaleDateString()}
        </p>
      </footer>
    </motion.div>
  );
};

export default Resume;
