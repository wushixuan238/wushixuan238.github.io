import { useEffect, useRef, useState } from 'react';
import { Minus, Square, X, Maximize2 } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiGmail } from "react-icons/si";
import { GitHubCalendar } from "react-github-calendar";
import { ReactTerminal } from "react-terminal";
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import profileImg from "./assets/profile.jpg";
import Resume from './components/Resume';
import Archive from './components/Archive';
import { SPRING_PRESETS } from './lib/animation';

gsap.registerPlugin(TextPlugin);

function AnimatedBio() {
  const p1_1 = useRef(null);
  const p1_2 = useRef(null);
  const p1_3 = useRef(null);

  const p2_1 = useRef(null);
  const p2_2 = useRef(null);
  const p2_3 = useRef(null);
  const p2_4 = useRef(null);
  const p2_5 = useRef(null);
  const p2_6 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(p1_1.current, { duration: 1.0, text: "Mostly working on backend logic and ", ease: "none" })
      .to(p1_2.current, { duration: 0.4, text: "AI agents", ease: "none" })
      .to(p1_3.current, { duration: 2.0, text: ". Lately, I've been spending time on frontend to bring my ideas to life. Just trying to build things that run quietly and work well.", ease: "none" })
      .to(p2_1.current, { duration: 1.2, text: "Thanks for stopping by my workspace. The terminal below is live—run a command if you want to look around. ", ease: "none" }, "+=0.3")
      .to(p2_2.current, { duration: 0.4, text: "Feel free to ", ease: "none" })
      .to(p2_3.current, { duration: 0.4, text: "browse around", ease: "none" })
      .to(p2_4.current, { duration: 0.1, text: " or ", ease: "none" })
      .to(p2_5.current, { duration: 0.4, text: "get in touch", ease: "none" })
      .to(p2_6.current, { duration: 0.6, text: " and thanks for stopping by.", ease: "none" });
  }, []);

  return (
    <div>
      <div className="text-[17px] leading-[1.8]">
        <p>
          <span ref={p1_1}></span>
          <strong ref={p1_2} className="text-[#1A1C19] font-bold"></strong>
          <span ref={p1_3}></span>
        </p>
      </div>

      <div className="text-[17px] leading-[1.8] mt-10">
        <p>
          <span ref={p2_1}></span>
          <span ref={p2_2}></span>
          <span ref={p2_3} className="text-[#1A1C19] cursor-pointer hover:underline underline-offset-4 decoration-neutral-500 transition-all font-medium"></span>
          <span ref={p2_4}></span>
          <a href="mailto:boyisolatin7@163.com" ref={p2_5} className="text-[#1A1C19] hover:underline underline-offset-4 decoration-neutral-500 transition-all font-medium"></a>
          <span ref={p2_6}></span>
        </p>
      </div>
    </div>
  );
}

function Home() {
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={SPRING_PRESETS.smooth}
      className="flex items-center justify-center h-screen p-6 lg:p-12 font-body bg-[#FAF9F6] text-[#1A1C19] overflow-hidden relative"
    >
      <motion.div
        layout
        className={`flex w-full max-w-[1400px] ${isMinimized
          ? "flex-col items-center justify-center gap-16"
          : "flex-col lg:flex-row lg:items-stretch items-center justify-between gap-12 lg:gap-16 xl:gap-24"
          }`}
      >
        {/* LEFT COLUMN: PERSONAL INTRODUCTION */}
        <motion.div
          layout
          className={`flex flex-col justify-between shrink-0 text-[#1A1C19]/70 ${isMinimized ? "w-full max-w-2xl text-center items-center" : "w-full max-w-md"
            }`}
        >
          <AnimatedBio />

          <motion.div
            layout
            className="flex items-center gap-6 mt-12 lg:mt-0"
            style={{ marginTop: isMinimized ? '3rem' : '' }}
          >
            <a href="https://github.com/wushixuan238" target="_blank" rel="noreferrer" className="text-[#1A1C19]/60 hover:text-[#1A1C19] transition-colors duration-300">
              <FiGithub size={24} strokeWidth={1.5} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="text-[#1A1C19]/60 hover:text-[#1A1C19] transition-colors duration-300">
              <FiLinkedin size={24} strokeWidth={1.5} />
            </a>
            <a href="mailto:wushixuan238@gmail.com" className="text-[#1A1C19]/60 hover:text-[#1A1C19] transition-colors duration-300">
              <SiGmail size={24} />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: THE MONOLITH WINDOW */}
        <motion.main
          layout
          className={`relative bg-transparent border-none flex flex-col shrink-0 ${isMinimized ? "w-full max-w-xl" : "w-full lg:max-w-4xl aspect-[16/10] max-h-[85vh]"
            }`}
        >

          <AnimatePresence initial={false}>
            {!isMinimized && (
              <motion.div
                key="monolith-content"
                initial={{ opacity: 0, flex: 0 }}
                animate={{ opacity: 1, flex: 1 }}
                exit={{ opacity: 0, flex: 0, overflow: 'hidden' }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col w-full origin-top overflow-hidden"
              >
                {/* SYSTEM TOP BAR */}
                <header className="bg-transparent text-[#324A49] font-headline tracking-tighter uppercase text-xs flex justify-between items-center h-8 px-4 w-full z-10 shrink-0">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[#324A49] font-bold tracking-[0.2em]">
                      STATUS: DEBUGGING_IN_PRODUCTION
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setIsMinimized(true)} className="focus:outline-none">
                      <Minus
                        size={14}
                        className="cursor-pointer active:scale-95 text-neutral-400 hover:text-[#324A49] transition-colors duration-150"
                      />
                    </button>
                    <Square
                      size={14}
                      className="cursor-crosshair active:scale-95 text-neutral-400 hover:text-[#324A49] transition-colors duration-150"
                    />
                    <button onClick={() => setIsMinimized(true)} className="focus:outline-none">
                      <X
                        size={14}
                        className="cursor-pointer active:scale-95 text-neutral-400 hover:text-[#324A49] transition-colors duration-150"
                      />
                    </button>
                  </div>
                </header>

                {/* MAIN CONTENT CANVAS */}
                <div className="flex flex-1 overflow-hidden h-full">
                  {/* LEFT PANEL: IDENTITY */}
                  <section className="w-1/3 p-8 flex flex-col gap-6 overflow-y-auto">
                    {/* PROFILE HEADSHOT */}
                    <div className="relative w-full aspect-square group shrink-0 rounded-sm overflow-hidden border border-neutral-200/50">
                      <img
                        alt="yujunpan"
                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        src={profileImg}
                      />
                    </div>

                    {/* KEY-VALUE PAIRS */}
                    <div className="space-y-1 font-mono text-[11px] shrink-0">
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-500">KERNEL</span>
                        <span className="text-neutral-900">INTJ</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-500">NODE_ID</span>
                        <span className="text-neutral-900">2001-04</span>
                      </div>
                    </div>

                    {/* DIRECTORY NAV */}
                    <nav className="mt-4 font-mono text-[11px] space-y-6">
                      <div>
                        <span className="text-neutral-600 block mb-2 cursor-text">
                          $ cat profile_metadata.json
                        </span>
                        <div className="bg-transparent text-neutral-600 leading-relaxed font-mono whitespace-pre text-[10px]">
                          {`{\n  "focus": "ui engineering",\n  "status": "architecting"\n}`}
                        </div>
                      </div>
                      <div>
                        <span className="text-neutral-600 block mb-2">
                          $ ls active_projects/bin
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[#4A6B6A] text-[10px]">
                          <a className="hover:bg-[#324A49]/10 p-1 border border-[#324A49]/30" href="#">NEURAL_NET_V2</a>
                          <a className="hover:bg-[#324A49]/10 p-1 border border-[#324A49]/30" href="#">GLITCH_RENDER</a>
                          <a className="hover:bg-[#324A49]/10 p-1 border border-[#324A49]/30" href="#">MONOLITH_UI</a>
                          <a className="hover:bg-[#324A49]/10 p-1 border border-[#324A49]/30" href="#">VOID_PROTOCOL</a>
                        </div>
                      </div>
                    </nav>
                  </section>

                  {/* RIGHT PANEL: ANALYTICS & LOGS */}
                  <section className="flex-1 flex flex-col overflow-hidden">
                    {/* COMMIT HEATMAP */}
                    <div className="p-8 shrink-0">
                      <div className="flex justify-between items-end mb-4">
                        <h2 className="font-mono text-[10px] tracking-widest text-[#324A49] uppercase font-bold">
                          COMMIT_ACTIVITY
                        </h2>
                      </div>
                      <div className="w-full overflow-x-auto">
                        <GitHubCalendar
                          username="wushixuan238"
                          colorScheme="light"
                          theme={{
                            light: [
                              "#FAF9F6",
                              "#9be9a8",
                              "#40c463",
                              "#30a14e",
                              "#216e39",
                            ],
                          }}
                        />
                      </div>
                    </div>

                    {/* SYSTEM LOGS */}
                    <div className="flex-1 overflow-y-auto p-8 pt-0 font-mono text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center mb-4 text-[#324A49] font-bold">
                        <span className="uppercase tracking-widest text-[10px]">
                          SYSTEM_LOGS_FEED
                        </span>
                        <span className="text-[9px]">FILTER: ALL_EVENTS</span>
                      </div>
                      <div className="space-y-3 opacity-60">
                        <div className="flex gap-4 border-l-2 border-[#324A49]/40 pl-3">
                          <span className="text-neutral-400 whitespace-nowrap">2024.05.12 14:02:11</span>
                          <span className="text-neutral-900">Pushed commit <span className="text-[#4A6B6A]">ae992f1</span> to <span className="underline">Monolith_Core</span></span>
                        </div>
                        <div className="flex gap-4 border-l-2 border-neutral-200 pl-3">
                          <span className="text-neutral-400 whitespace-nowrap">2024.05.12 13:45:02</span>
                          <span className="text-neutral-500">Automated backup sequence initiated... <span className="text-[#324A49]">SUCCESS</span></span>
                        </div>
                        <div className="flex gap-4 border-l-2 border-neutral-200 pl-3">
                          <span className="text-neutral-400 whitespace-nowrap">2024.05.12 12:21:55</span>
                          <span className="text-neutral-500">Indexing new metadata for project <span className="text-[#4A6B6A]">VOID_PROTOCOL</span></span>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* INTERACTIVE COMPONENT - react-terminal */}
          <motion.footer
            layout
            animate={{
              height: isMinimized ? 38 : 160,
              paddingBottom: isMinimized ? 0 : 16
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`bg-transparent flex flex-col shrink-0 px-4 relative ${isMinimized ? 'border border-[#324A49]/20 rounded-md shadow-sm items-center justify-center' : ''}`}
          >
            <AnimatePresence>
              {isMinimized && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setIsMinimized(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 text-neutral-400 hover:text-[#324A49] transition-colors"
                  aria-label="Expand Terminal"
                >
                  <Maximize2 size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            <div className={`w-full overflow-hidden flex flex-col react-terminal-wrapper ${isMinimized ? 'h-full justify-center pr-10' : 'flex-1 justify-end'}`}>
              <ReactTerminal
                commands={{
                  whoami: "guest@yujun",
                  date: new Date().toString(),
                  status: "ALL SUBSYSTEMS GREEN",
                  help: "Available commands: whoami, date, status, help, clear, resume, archive",
                  "monolith start": () => setIsMinimized(false), // Secret expand command!
                  resume: () => navigate('/resume'),
                  archive: () => navigate('/archive'),
                }}
                prompt={<span className="text-[#324A49] font-mono text-[11px] font-bold">root@yujun:~$</span>}
                theme="monolithTheme"
                themes={{
                  monolithTheme: {
                    themeBGColor: "transparent",
                    themeToolbarColor: "transparent",
                    themeColor: "#1A1C19",
                    themePromptColor: "#324A49",
                  }
                }}
                showControlBar={false}
                showControlButtons={false}
                welcomeMessage={
                  !isMinimized ? (
                    <div className="text-neutral-500 font-mono text-[11px] mb-2 leading-relaxed">
                      Local development server running on port 2026.<br />
                      Type 'help' for available commands.
                    </div>
                  ) : null
                }
              />
            </div>
          </motion.footer>
        </motion.main>
      </motion.div>

      {/* FOOTER COPYRIGHT */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-neutral-600 tracking-wider group cursor-default"
        style={{ fontFamily: "'Caveat', cursive", fontSize: '1.0rem', fontWeight: 'bold' }}
      >
        <div className="inline-flex items-center transition-colors duration-300 group-hover:text-[#324A49] relative">
          "yujun@2026:~$"
          <span className="absolute -right-3 top-0 hidden text-[#324A49] group-hover:inline-block blink font-mono">
            _
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
