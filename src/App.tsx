import React, { useEffect, useRef } from 'react';
import { Minus, Square, X } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiGmail } from "react-icons/si";
import { GitHubCalendar } from "react-github-calendar";
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import profileImg from "./assets/profile.jpg";

gsap.registerPlugin(TextPlugin);

function AnimatedBio() {
  const p1_1 = useRef(null);
  const p1_2 = useRef(null);
  const p1_3 = useRef(null);
  const p1_4 = useRef(null);
  const p1_5 = useRef(null);

  const p2_1 = useRef(null);
  const p2_2 = useRef(null);
  const p2_3 = useRef(null);
  const p2_4 = useRef(null);
  const p2_5 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(p1_1.current, { duration: 1.2, text: "I'm a product engineer specializing in ", ease: "none" })
      .to(p1_2.current, { duration: 0.6, text: "distributed systems", ease: "none" })
      .to(p1_3.current, { duration: 0.2, text: " and ", ease: "none" })
      .to(p1_4.current, { duration: 0.8, text: "high-precision UI engineering", ease: "none" })
      .to(p1_5.current, { duration: 1.5, text: ". I architect the void, building robust networks and minimalist interfaces.", ease: "none" })
      .to(p2_1.current, { duration: 0.4, text: "Feel free to ", ease: "none" }, "+=0.3")
      .to(p2_2.current, { duration: 0.4, text: "browse around", ease: "none" })
      .to(p2_3.current, { duration: 0.1, text: " or ", ease: "none" })
      .to(p2_4.current, { duration: 0.4, text: "get in touch", ease: "none" })
      .to(p2_5.current, { duration: 0.6, text: " and thanks for stopping by.", ease: "none" });
  }, []);

  return (
    <div>
      <div className="text-[17px] leading-[1.8]">
        <p>
          <span ref={p1_1}></span>
          <strong ref={p1_2} className="text-white font-medium"></strong>
          <span ref={p1_3}></span>
          <strong ref={p1_4} className="text-white font-medium"></strong>
          <span ref={p1_5}></span>
        </p>
      </div>

      <div className="text-[17px] leading-[1.8] mt-10">
        <p>
          <span ref={p2_1}></span>
          <span ref={p2_2} className="text-white cursor-pointer hover:underline underline-offset-4 decoration-neutral-500 transition-all font-medium"></span>
          <span ref={p2_3}></span>
          <a href="mailto:wushixuan238@gmail.com" ref={p2_4} className="text-white hover:underline underline-offset-4 decoration-neutral-500 transition-all font-medium"></a>
          <span ref={p2_5}></span>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 lg:p-12 font-body bg-[#000000] text-white">
      <div className="flex flex-col lg:flex-row lg:items-stretch items-center justify-between gap-12 lg:gap-16 xl:gap-24 w-full max-w-[1400px]">
        {/* LEFT COLUMN: PERSONAL INTRODUCTION */}
        <div className="flex flex-col justify-between w-full max-w-md shrink-0 text-neutral-400">
          <AnimatedBio />

          <div className="flex items-center gap-6 mt-12 lg:mt-0">
            <a href="https://github.com/wushixuan238" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors duration-300">
              <FiGithub size={24} strokeWidth={1.5} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors duration-300">
              <FiLinkedin size={24} strokeWidth={1.5} />
            </a>
            <a href="mailto:wushixuan238@gmail.com" className="text-neutral-500 hover:text-white transition-colors duration-300">
              <SiGmail size={24} />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: THE MONOLITH WINDOW */}
        <main className="relative w-full lg:max-w-4xl aspect-[16/10] bg-surface-container/85 backdrop-blur-md monolith-border flex flex-col shrink-0 shadow-2xl">
          {/* PRECISION CORNER DETAILS */}
          <div className="corner-detail corner-tl"></div>
          <div className="corner-detail corner-tr"></div>
          <div className="corner-detail corner-bl"></div>
          <div className="corner-detail corner-br"></div>

          {/* SYSTEM TOP BAR */}
          <header className="bg-neutral-900/85 backdrop-blur-md text-emerald-400 font-headline tracking-tighter uppercase text-xs border-b border-neutral-700/50 flex justify-between items-center h-8 px-4 w-full z-10 shrink-0">
            <div className="flex items-center gap-4">
              <span className="font-mono text-emerald-400 font-bold tracking-[0.2em]">
                SYSTEM: ACTIVE
              </span>
              <span className="text-neutral-500 font-mono">
                CORE_TERMINAL_V1.0.4
              </span>
            </div>
            <div className="flex gap-4">
              <Minus
                size={14}
                className="cursor-crosshair active:scale-95 text-neutral-500 hover:text-emerald-300 transition-colors duration-150"
              />
              <Square
                size={14}
                className="cursor-crosshair active:scale-95 text-neutral-500 hover:text-emerald-300 transition-colors duration-150"
              />
              <X
                size={14}
                className="cursor-crosshair active:scale-95 text-neutral-500 hover:text-emerald-300 transition-colors duration-150"
              />
            </div>
          </header>

          {/* MAIN CONTENT CANVAS */}
          <div className="flex flex-1 overflow-hidden">
            {/* LEFT PANEL: IDENTITY */}
            <section className="w-1/3 border-r border-outline-variant/30 p-8 flex flex-col gap-6 overflow-y-auto">
              {/* PROFILE HEADSHOT */}
              <div className="relative w-full aspect-square grayscale border border-outline-variant/50 group shrink-0">
                <img
                  alt="yujunpan"
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                  src={profileImg}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h1 className="text-on-surface font-bold text-xl leading-none">
                    Yujun
                  </h1>
                  <p className="text-primary text-[10px] tracking-widest mt-1 font-mono uppercase">
                    Product Engineering
                  </p>
                </div>
              </div>

              {/* KEY-VALUE PAIRS */}
              <div className="space-y-1 font-mono text-[11px] shrink-0">
                <div className="flex justify-between border-b border-outline-variant/10 py-1">
                  <span className="text-on-surface-variant">KERNEL</span>
                  <span className="text-on-surface">INTJ</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 py-1">
                  <span className="text-on-surface-variant">NODE_ID</span>
                  <span className="text-on-surface">EVD-992-X</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">STATUS</span>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-container">OPERATIONAL</span>
                    <span className="w-1.5 h-1.5 bg-primary-container rounded-full shadow-[0_0_8px_#00FFC3]"></span>
                  </div>
                </div>
              </div>

              {/* DIRECTORY NAV */}
              <nav className="mt-4 font-mono text-[11px] space-y-4">
                <div>
                  <span className="text-neutral-600 block mb-2">
                    $ [cat] profile_metadata.json
                  </span>
                  <div className="bg-surface-container-high p-3 text-on-surface-variant leading-relaxed">
                    Specializing in distributed systems and high-precision UI
                    engineering. Architecting the void since 2026.
                  </div>
                </div>
                <div>
                  <span className="text-neutral-600 block mb-2">
                    $ [ls] active_projects/bin
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-primary text-[10px]">
                    <a
                      className="hover:bg-primary-container/10 p-1 border border-primary/20"
                      href="#"
                    >
                      NEURAL_NET_V2
                    </a>
                    <a
                      className="hover:bg-primary-container/10 p-1 border border-primary/20"
                      href="#"
                    >
                      GLITCH_RENDER
                    </a>
                    <a
                      className="hover:bg-primary-container/10 p-1 border border-primary/20"
                      href="#"
                    >
                      MONOLITH_UI
                    </a>
                    <a
                      className="hover:bg-primary-container/10 p-1 border border-primary/20"
                      href="#"
                    >
                      VOID_PROTOCOL
                    </a>
                  </div>
                </div>
              </nav>
            </section>

            {/* RIGHT PANEL: ANALYTICS & LOGS */}
            <section className="flex-1 flex flex-col overflow-hidden">
              {/* COMMIT HEATMAP */}
              <div className="p-8 border-b border-outline-variant/30 shrink-0">
                <div className="flex justify-between items-end mb-4">
                  <h2 className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                    COMMIT_ACTIVITY
                  </h2>
                </div>
                <div className="w-full">
                  <GitHubCalendar
                    username="wushixuan238"
                    colorScheme="dark"
                    theme={{
                      dark: [
                        "#1f1f1f",
                        "#004532",
                        "#00644b",
                        "#00eab3",
                        "#00fdc1",
                      ],
                    }}
                  />
                </div>
              </div>

              {/* SYSTEM LOGS */}
              <div className="flex-1 overflow-y-auto p-8 font-mono text-[11px] leading-relaxed">
                <div className="flex justify-between items-center mb-4 text-on-surface-variant">
                  <span className="uppercase tracking-widest text-[10px]">
                    SYSTEM_LOGS_FEED
                  </span>
                  <span className="text-[9px]">FILTER: ALL_EVENTS</span>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-4 border-l-2 border-primary-container/40 pl-3">
                    <span className="text-neutral-600 whitespace-nowrap">
                      2024.05.12 14:02:11
                    </span>
                    <span className="text-on-surface">
                      Pushed commit <span className="text-primary">ae992f1</span>{" "}
                      to repository{" "}
                      <span className="underline">Monolith_Core</span>
                    </span>
                  </div>
                  <div className="flex gap-4 border-l-2 border-outline-variant/40 pl-3">
                    <span className="text-neutral-600 whitespace-nowrap">
                      2024.05.12 13:45:02
                    </span>
                    <span className="text-on-surface-variant">
                      Automated backup sequence initiated...{" "}
                      <span className="text-primary-container">SUCCESS</span>
                    </span>
                  </div>
                  <div className="flex gap-4 border-l-2 border-outline-variant/40 pl-3">
                    <span className="text-neutral-600 whitespace-nowrap">
                      2024.05.12 12:21:55
                    </span>
                    <span className="text-on-surface-variant">
                      Indexing new metadata for project{" "}
                      <span className="text-primary">VOID_PROTOCOL</span>
                    </span>
                  </div>
                  <div className="flex gap-4 border-l-2 border-primary-container/40 pl-3">
                    <span className="text-neutral-600 whitespace-nowrap">
                      2024.05.12 11:04:30
                    </span>
                    <span className="text-on-surface">
                      Updated UI Schema:{" "}
                      <span className="text-primary">
                        "High-End Digital Editorial"
                      </span>{" "}
                      implemented.
                    </span>
                  </div>
                  <div className="flex gap-4 border-l-2 border-outline-variant/40 pl-3">
                    <span className="text-neutral-600 whitespace-nowrap">
                      2024.05.11 23:59:01
                    </span>
                    <span className="text-on-surface-variant">
                      Node heartbeat detected. All subsystems green.
                    </span>
                  </div>
                  <div className="flex gap-4 border-l-2 border-outline-variant/40 pl-3">
                    <span className="text-neutral-600 whitespace-nowrap">
                      2024.05.11 22:15:10
                    </span>
                    <span className="text-on-surface-variant">
                      Inbound connection from{" "}
                      <span className="text-secondary">IP: 192.168.1.104</span>
                    </span>
                  </div>
                  <div className="flex gap-4 border-l-2 border-outline-variant/40 pl-3 opacity-50">
                    <span className="text-neutral-600 whitespace-nowrap">
                      2024.05.11 18:30:22
                    </span>
                    <span className="text-on-surface-variant">
                      Session expired. Re-authenticating...
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* FOOTER COMMAND INPUT */}
          <footer className="bg-black/90 border-t border-neutral-800 h-10 flex items-center px-6 shrink-0">
            <div className="flex items-center gap-3 w-full font-mono text-[11px]">
              <span className="text-emerald-400">root@monolith:~$</span>
              <div className="flex-1 flex items-center">
                <span className="text-on-surface">run build --production</span>
                <span className="w-2 h-4 bg-primary-container ml-1 blink shadow-[0_0_5px_#00FFC3]"></span>
              </div>
              <div className="flex gap-6 text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
                <span className="text-emerald-400 underline decoration-emerald-500/50">
                  STATUS
                </span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* FOOTER COPYRIGHT */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-neutral-600 tracking-wider group cursor-default"
        style={{ fontFamily: "'Caveat', cursive", fontSize: '1.0rem', fontWeight: 'bold' }}
      >
        <div className="inline-flex items-center transition-colors duration-300 group-hover:text-emerald-400 relative">
          "yujun@2026:~$"
          <span className="absolute -right-3 top-0 hidden text-emerald-400 group-hover:inline-block blink font-mono">
            _
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
