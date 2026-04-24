import { useEffect, useRef, useState } from "react";
import { Minus, Square, X, Maximize2 } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiGmail } from "react-icons/si";
import { GitHubCalendar } from "react-github-calendar";
import { ReactTerminal } from "react-terminal";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import profileImg from "./assets/joy.jpeg";
import Resume from "./components/Resume";
import Archive from "./components/Archive";
import { SPRING_PRESETS } from "./lib/animation";
import Article from "./components/Article";
import NotionDebug from "./components/NotionDebug";
import { ThemeToggle } from "./components/ThemeToggle";

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
    tl.to(p1_1.current, {
      duration: 1.0,
      text: "Mostly working on backend logic and ",
      ease: "none",
    })
      .to(p1_2.current, { duration: 0.4, text: "AI agents", ease: "none" })
      .to(p1_3.current, {
        duration: 2.0,
        text: ". Lately, I've been spending time on frontend to bring my ideas to life. Just trying to build things that run quietly and work well.",
        ease: "none",
      })
      .to(
        p2_1.current,
        {
          duration: 1.2,
          text: "Thanks for stopping by my workspace. The terminal below is live—run a command if you want to look around. ",
          ease: "none",
        },
        "+=0.3",
      )
      .to(p2_2.current, { duration: 0.4, text: "Feel free to ", ease: "none" })
      .to(p2_3.current, { duration: 0.4, text: "browse around", ease: "none" })
      .to(p2_4.current, { duration: 0.1, text: " or ", ease: "none" })
      .to(p2_5.current, { duration: 0.4, text: "get in touch", ease: "none" })
      .to(p2_6.current, {
        duration: 0.6,
        text: " and thanks for stopping by.",
        ease: "none",
      });
  }, []);

  return (
    <div>
      <div className="text-[17px] leading-[1.8]">
        <p>
          <span ref={p1_1}></span>
          <strong ref={p1_2} className="text-foreground font-bold"></strong>
          <span ref={p1_3}></span>
        </p>
      </div>

      <div className="text-[17px] leading-[1.8] mt-10">
        <p>
          <span ref={p2_1}></span>
          <span ref={p2_2}></span>
          <span
            ref={p2_3}
            className="text-foreground transition-all"
          ></span>
          <span ref={p2_4}></span>
          <span
            ref={p2_5}
            className="text-foreground transition-all"
          ></span>
          <span ref={p2_6}></span>
        </p>
      </div>
    </div>
  );
}

function Home() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    // Initial theme check
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Observe class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkNow = document.documentElement.classList.contains("dark");
          setTheme(isDarkNow ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={SPRING_PRESETS.smooth}
      className="flex items-center justify-center min-h-screen p-6 lg:p-12 font-body bg-background text-foreground relative py-20"
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
          className={`flex flex-col justify-between shrink-0 text-foreground/85 ${isMinimized
            ? "w-full max-w-2xl text-center items-center"
            : "w-full max-w-md"
            }`}
        >
          <AnimatedBio />

          <motion.div
            layout
            className="flex items-center gap-6 mt-12 lg:mt-0 text-foreground/80"
            style={{ marginTop: isMinimized ? "3rem" : "" }}
          >
            <a
              href="https://github.com/wushixuan238"
              target="_blank"
              rel="noreferrer"
              className="text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              <FiGithub size={24} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/in/yujun-pan-094756364/?locale=zh"
              target="_blank"
              rel="noreferrer"
              className="text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              <FiLinkedin size={24} strokeWidth={1.5} />
            </a>
            <a
              href="mailto:wushixuan238@gmail.com"
              className="text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              <SiGmail size={24} />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: THE MONOLITH WINDOW */}
        <motion.main
          layout
          className={`relative bg-transparent border-none flex flex-col shrink-0 ${isMinimized
            ? "w-full max-w-xl"
            : "w-full lg:max-w-4xl aspect-[16/10] max-h-[85vh]"
            }`}
        >
          <AnimatePresence initial={false}>
            {!isMinimized && (
              <motion.div
                key="monolith-content"
                initial={{ opacity: 0, flex: 0 }}
                animate={{ opacity: 1, flex: 1 }}
                exit={{ opacity: 0, flex: 0, overflow: "hidden" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col w-full origin-top overflow-hidden"
              >
                {/* SYSTEM TOP BAR */}
                <header className="bg-transparent text-primary font-headline tracking-tighter uppercase text-xs flex justify-between items-center h-8 px-4 w-full z-10 shrink-0">
                  <div className="flex items-center gap-4">
                    <span className="font-body text-primary font-bold tracking-[0.2em]">
                      STATUS: DEBUGGING_IN_PRODUCTION
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="focus:outline-none"
                    >
                      <Minus
                        size={14}
                        className="cursor-pointer active:scale-95 text-foreground/85 hover:text-primary transition-colors duration-150"
                      />
                    </button>
                    <Square
                      size={14}
                      className="cursor-crosshair active:scale-95 text-foreground/85 hover:text-primary transition-colors duration-150"
                    />
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="focus:outline-none"
                    >
                      <X
                        size={14}
                        className="cursor-pointer active:scale-95 text-foreground/85 hover:text-primary transition-colors duration-150"
                      />
                    </button>
                  </div>
                </header>

                {/* MAIN CONTENT CANVAS */}
                <div className="flex flex-1 overflow-hidden h-full">
                  {/* LEFT PANEL: IDENTITY */}
                  <section className="w-1/3 p-8 flex flex-col gap-6 overflow-y-auto">
                    {/* PROFILE HEADSHOT */}
                    <div className="relative w-full aspect-square group shrink-0 rounded-sm overflow-hidden border border-border/50">
                      <img
                        alt="yujunpan"
                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        src={profileImg}
                      />
                    </div>

                    {/* KEY-VALUE PAIRS */}
                    <div className="space-y-1 font-body text-[11px] shrink-0">
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">BIRTH</span>
                        <span className="text-foreground">2001-04</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">MBTI</span>
                        <span className="text-foreground">INTJ</span>
                      </div>
                    </div>

                    {/* DIRECTORY NAV */}
                    <nav className="mt-4 font-body text-[11px] space-y-6">
                      <div>
                        <span className="text-muted-foreground block mb-2 cursor-text">
                          $ cat profile_metadata.json
                        </span>
                        <div className="bg-transparent text-muted-foreground leading-relaxed font-body whitespace-pre text-[10px]">
                          {`{\n  "focus": "product engineering",\n  "status": "architecting"\n}`}
                        </div>
                      </div>
                    </nav>
                  </section>

                  {/* RIGHT PANEL: ANALYTICS & LOGS */}
                  <section className="flex-1 flex flex-col overflow-hidden">
                    {/* COMMIT HEATMAP */}
                    <div className="p-8 shrink-0">
                      <div className="flex justify-between items-end mb-4">
                        <h2 className="font-body text-[10px] tracking-widest text-primary uppercase font-bold">
                          COMMIT_ACTIVITY
                        </h2>
                      </div>
                      <div className="w-full overflow-x-auto">
                        <GitHubCalendar
                          username="wushixuan238"
                          colorScheme={theme === "dark" ? "dark" : "light"}
                          theme={{
                            light: [
                              "#FAF9F6",
                              "#9be9a8",
                              "#40c463",
                              "#30a14e",
                              "#216e39",
                            ],
                            dark: [
                              "#000000",
                              "#0e4429",
                              "#006d32",
                              "#26a641",
                              "#39d353",
                            ],
                          }}
                        />
                      </div>
                    </div>

                    {/* INTERESTS & HOBBIES */}
                    <div className="flex-1 overflow-y-auto p-8 pt-0 font-body text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center mb-4 text-primary font-bold">
                        <span className="uppercase tracking-widest text-[10px] font-body">
                          INTERESTS
                        </span>
                        <span className="text-[9px]">LIFESTYLE</span>
                      </div>
                      <div className="space-y-3 opacity-90">
                        <div className="flex gap-4 border-l-2 border-primary/40 pl-3">
                          <span className="text-muted-foreground/70 whitespace-nowrap w-16 shrink-0">
                            RUNNING
                          </span>
                          <span className="text-foreground">
                            Usually covering <span className="text-primary/80">5-10km</span> per session. It's my way of clearing my head after a long day of coding.
                          </span>
                        </div>
                        <div className="flex gap-4 border-l-2 border-border pl-3">
                          <span className="text-muted-foreground/70 whitespace-nowrap w-16 shrink-0">
                            MUSIC
                          </span>
                          <span className="text-muted-foreground">
                            Deeply into <span className="text-primary">Shoegaze & Rock</span>. Distorted guitars and the "wall of sound" are my favorite focus filters.
                          </span>
                        </div>
                        <div className="flex gap-4 border-l-2 border-border pl-3">
                          <span className="text-muted-foreground/70 whitespace-nowrap w-16 shrink-0">
                            TRADING
                          </span>
                          <span className="text-muted-foreground">
                            Currently focused on <span className="text-primary">Market Trading</span>. Analyzing charts and seeking Alpha within the noise.
                          </span>
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
              paddingBottom: isMinimized ? 0 : 16,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`bg-transparent flex flex-col shrink-0 px-4 relative ${isMinimized ? "border border-[#324A49]/20 rounded-md shadow-sm items-center justify-center" : ""}`}
          >
            <AnimatePresence>
              {isMinimized && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setIsMinimized(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 text-foreground/85 hover:text-primary transition-colors"
                  aria-label="Expand Terminal"
                >
                  <Maximize2 size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            <div
              className={`w-full overflow-hidden flex flex-col react-terminal-wrapper ${isMinimized ? "h-full justify-center pr-10" : "flex-1 justify-end"}`}
            >
              <ReactTerminal
                commands={{
                  ethos: () => {
                    const mottos = [
                      "因为我的骨头也是蓝的。",
                      "Because my bones are also blue."
                    ];
                    return mottos[Math.floor(Math.random() * mottos.length)];
                  },
                  date: new Date().toString(),
                  help: "Available commands: ethos, date, help, clear, resume, archive",
                  "monolith start": () => setIsMinimized(false), // Secret expand command!
                  resume: () => navigate("/resume"),
                  archive: () => navigate("/archive"),
                }}
                prompt={
                  <span
                    className="font-body text-[11px] font-bold"
                    style={{ color: theme === "dark" ? "#FFFFFF" : "#324A49" }}
                  >
                    root@yujun:~$
                  </span>
                }
                theme="monolithTheme"
                themes={{
                  monolithTheme: {
                    themeBGColor: "transparent",
                    themeToolbarColor: "transparent",
                    themeColor: theme === "dark" ? "#FFFFFF" : "#1A1C19",
                    themePromptColor: theme === "dark" ? "#FFFFFF" : "#324A49",
                  },
                }}
                showControlBar={false}
                showControlButtons={false}
                welcomeMessage={
                  !isMinimized ? (
                    <div className="text-muted-foreground font-mono text-[11px] mb-2 leading-relaxed">
                      Local development server running on port 2026.
                      <br />
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
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground tracking-wider group cursor-default"
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "1.0rem",
          fontWeight: "bold",
        }}
      >
        <div className="inline-flex items-center transition-colors duration-300 group-hover:text-primary relative">
          "yujun@2026:~$"
          <span className="absolute -right-3 top-0 hidden text-primary group-hover:inline-block blink font-mono">
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
    <>
      <ThemeToggle />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/debug" element={<NotionDebug />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
