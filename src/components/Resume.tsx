import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
      {/* MAIN CONTENT AREA */}
      <main className="pt-20 pb-32 flex justify-center">
        <div className="shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden bg-white">
          <ResumeSheet data={resumeData} />
        </div>
      </main>

      {/* FLOATING NAVIGATION */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SPRING_PRESETS.smooth, delay: 0.2 }}
          className="flex items-center gap-2 p-1 bg-[#1A1C19]/90 backdrop-blur-md rounded-full shadow-lg border border-white/10"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 text-[#FAF9F6] hover:bg-white/10 rounded-full transition-all group"
            aria-label="Back to home"
          >
            <ArrowLeft size={18} className="group-active:scale-90 transition-transform" />
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold">
              Return
            </span>
          </button>
        </motion.div>
      </div>

      {/* FOOTER METADATA */}
      <footer className="pb-12 text-center opacity-40">
        <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.2em]">
          End of Document — Generated at {new Date().toLocaleDateString()}
        </p>
      </footer>
    </motion.div>
  );
};

export default Resume;
