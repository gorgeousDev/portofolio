"use client";

import { useEffect, useRef, useState } from "react";
import SplashScreen from "./SplashScreen";

const fullDetailText = [
  "root@portofolio:~# cat details",
  "Name: George Salah",
  "Age: 26",
  "City: Alexandria",
  "Education: Chemical Engineering",
  "Skills: Still in Progress :)",
  "about_me: I build what search engines discover, what users experience, and what systems depend on. Somewhere between code, visibility, and strategy, you'll find my work. Some people write code. Some optimize visibility. Some build systems. I prefer operating where all three intersect. Behind every visible result, there is an invisible system. I work on both.",
  "root@portofolio:~# ",
].join("\n");

const installLines = [
  "root@unknown&gt; y",
  "",
  "Reading package lists... done",
  "Building dependency tree... done",
  "Reading state information... done",
  "The following NEW packages will be installed:",
  "  portofolio-core portofolio-ui portofolio-api",
  "0 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.",
  "Need to get 42.7 MB of archives.",
  "After this operation, 156 MB of additional disk space will be used.",
  "Get:1 https://repo.portofolio.io stable/main amd64 portofolio-core [12.4 MB]",
  "Get:2 https://repo.portofolio.io stable/main amd64 portofolio-ui [18.2 MB]",
  "Get:3 https://repo.portofolio.io stable/main amd64 portofolio-api [12.1 MB]",
  "Fetched 42.7 MB in 3s (14.2 MB/s)",
  "",
  "Extracting portofolio-core... [##########################] 100%",
  "Extracting portofolio-ui... [##########################] 100%",
  "Extracting portofolio-api... [##########################] 100%",
  "",
  "Setting up portofolio-core (1.0.0)...",
  "Setting up portofolio-api (1.0.0)...",
  "Setting up portofolio-ui (1.0.0)...",
  "",
  "Scanning for vulnerabilities...",
  "  [✓] No known vulnerabilities detected",
  "",
  "Starting services...",
  "  [✓] portofolio-core.service",
  "  [✓] portofolio-ui.service",
  "  [✓] portofolio-api.service",
  "",
  "Initializing user environment...",
  "  [✓] User profile loaded",
  "  [✓] Permissions configured",
  "  [✓] SSH keys generated",
  "",
  "root@portofolio:~#",
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);
  const [borderDone, setBorderDone] = useState(false);
  const [whoami, setWhoami] = useState("");
  const [phase, setPhase] = useState<"whoami" | "password" | "question" | "answer" | "install" | "done">("whoami");
  const [stars, setStars] = useState("");
  const [answer, setAnswer] = useState("");
  const [visibleLines, setVisibleLines] = useState(0);
  const [doneShrunk, setDoneShrunk] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [boxBorderDone, setBoxBorderDone] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const installDoneRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splashDone) return;
    const lastAnimEnd = 900 + 300 + 100;
    const t = setTimeout(() => setBorderDone(true), lastAnimEnd);
    return () => clearTimeout(t);
  }, [splashDone]);

  useEffect(() => {
    if (!borderDone) return;
    const word = "whoami";
    let i = 0;
    const t = setInterval(() => {
      i++;
      setWhoami(word.slice(0, i));
      if (i >= word.length) {
        clearInterval(t);
        setTimeout(() => setPhase("password"), 600);
      }
    }, 120);
    return () => clearInterval(t);
  }, [borderDone]);

  useEffect(() => {
    if (phase !== "password") return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setStars("*".repeat(i));
      if (i >= 8) {
        clearInterval(t);
        setTimeout(() => setPhase("question"), 400);
      }
    }, 120);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "question") return;
    const t = setTimeout(() => setPhase("answer"), 800);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "answer") return;
    const chars = " y";
    let i = 0;
    const t = setInterval(() => {
      i++;
      setAnswer(chars.slice(0, i));
      if (i >= chars.length) {
        clearInterval(t);
        setTimeout(() => setPhase("install"), 400);
      }
    }, 150);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    const t1 = setTimeout(() => setDoneShrunk(true), 3000);
    const t2 = setTimeout(() => setShowDetails(true), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase]);

  useEffect(() => {
    if (!showDetails) return;
    const t = setTimeout(() => setBoxBorderDone(true), 1400);
    return () => clearTimeout(t);
  }, [showDetails]);

  useEffect(() => {
    if (!boxBorderDone) return;
    if (typedChars >= fullDetailText.length) return;
    const t = setTimeout(() => setTypedChars((c) => c + 1), 18);
    return () => clearTimeout(t);
  }, [boxBorderDone, typedChars]);

  useEffect(() => {
    if (phase !== "install") return;
    if (visibleLines >= installLines.length) {
      if (!installDoneRef.current) {
        installDoneRef.current = true;
        setTimeout(() => setPhase("done"), 800);
      }
      return;
    }
    const delay = installLines[visibleLines] === "" ? 40 : 20 + Math.random() * 40;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [phase, visibleLines]);

  useEffect(() => {
    if (phase !== "install") return;
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, phase]);

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <div
        className={`fixed inset-0 transition-opacity duration-1000 ${
          splashDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(https://media1.tenor.com/m/Zco-fadJri4AAAAC/code-matrix.gif)" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div
        className={`fixed inset-0 transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-[20px] pointer-events-none">
          <div
            className="absolute top-0 left-0 h-[2px] bg-matrix origin-left"
            style={{
              width: "100%",
              animation: splashDone ? "draw-x 0.3s ease-out 0.1s forwards" : "none",
              transform: "scaleX(0)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-[2px] bg-matrix origin-top"
            style={{
              height: "100%",
              animation: splashDone ? "draw-y 0.3s ease-out 0.4s forwards" : "none",
              transform: "scaleY(0)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 h-[2px] bg-matrix origin-right"
            style={{
              width: "100%",
              animation: splashDone ? "draw-x 0.3s ease-out 0.7s forwards" : "none",
              transform: "scaleX(0)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[2px] bg-matrix origin-bottom"
            style={{
              height: "100%",
              animation: splashDone ? "draw-y 0.3s ease-out 1.0s forwards" : "none",
              transform: "scaleY(0)",
            }}
          />
        </div>

        <div className="h-full p-[22px] sm:p-6 md:p-10 lg:p-14 overflow-auto">
          {phase !== "install" && phase !== "done" && (
            <div className="flex h-full flex-col items-center justify-center">
              {borderDone && phase === "whoami" && (
                <p className="text-matrix text-base sm:text-lg md:text-xl font-mono">
                  root@unknown&gt; {whoami}<span className="animate-pulse">_</span>
                </p>
              )}
              {phase === "password" && (
                <>
                  <p className="text-matrix text-base sm:text-lg md:text-xl font-mono">
                    Enter Your Password:
                  </p>
                  <p className="text-matrix text-base sm:text-lg md:text-xl font-mono mt-1">
                    {stars}<span className="animate-pulse">_</span>
                  </p>
                </>
              )}
              {phase === "question" && (
                <p className="text-matrix text-base sm:text-lg md:text-xl font-mono">
                  Are You Sure You Wanna Expose Yourself [y/n]<span className="animate-pulse">_</span>
                </p>
              )}
              {phase === "answer" && (
                <p className="text-matrix text-base sm:text-lg md:text-xl font-mono">
                  Are You Sure You Wanna Expose Yourself [y/n]{answer}<span className="animate-pulse">_</span>
                </p>
              )}
            </div>
          )}

          {phase === "install" && (
            <div
              ref={containerRef}
              className="h-full overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed scroll-smooth"
            >
              {installLines.slice(0, visibleLines).map((line, i) => (
                <p key={i} className="text-matrix">
                  {line}&nbsp;
                  {i === visibleLines - 1 && i < installLines.length - 1 && (
                    <span className="animate-pulse">_</span>
                  )}
                  {i === installLines.length - 1 && visibleLines >= installLines.length && (
                    <span className="animate-pulse">_</span>
                  )}
                </p>
              ))}
            </div>
          )}

          {phase === "done" && (
            <div className="relative min-h-full">
              <div
                className={`flex flex-col items-center absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ease-in-out ${
                  doneShrunk
                    ? "top-2 sm:top-4 md:top-6 lg:top-8 gap-1 sm:gap-2"
                    : "top-1/2 -translate-y-1/2 gap-4 sm:gap-6"
                }`}
              >
                <p
                  className={`font-mono tracking-widest text-center transition-all duration-1000 ${
                    doneShrunk
                      ? "text-matrix-dark text-xs sm:text-sm md:text-base"
                      : "text-matrix text-2xl sm:text-3xl md:text-4xl"
                  }`}
                >
                  Welcome
                </p>
                <pre
                  className={`font-mono leading-tight text-center transition-all duration-1000 ${
                    doneShrunk
                      ? "text-matrix/60 text-[3px] sm:text-[4px] md:text-[5px] lg:text-[6px]"
                      : "text-matrix text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs animate-[glitch_0.3s_ease-out_3]"
                  }`}
                >
{`███████╗███╗   ██╗██╗ ██████╗ ███╗   ███╗ █████╗
██╔════╝████╗  ██║██║██╔════╝ ████╗ ████║██╔══██╗
█████╗  ██╔██╗ ██║██║██║  ███╗██╔████╔██║███████║
██╔══╝  ██║╚██╗██║██║██║   ██║██║╚██╔╝██║██╔══██║
███████╗██║ ╚████║██║╚██████╔╝██║ ╚═╝ ██║██║  ██║
╚══════╝╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝`}</pre>
              </div>

              {showDetails && (
                <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-6 sm:gap-8 lg:gap-16 xl:gap-24 pt-28 sm:pt-32 md:pt-36 lg:pt-44 pb-8 px-2 sm:px-4">
                  <div className="flex-shrink-0 w-24 sm:w-32 md:w-40 lg:w-48 xl:w-60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/skull.png" alt="skull" className="w-full h-auto" />
                  </div>

                  <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-4 sm:p-6 md:p-8 lg:p-10">
                    <pre className="text-matrix font-mono text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap min-h-[1em]">
                      {fullDetailText.slice(0, typedChars)}
                      {typedChars < fullDetailText.length && (
                        <span className="animate-pulse">_</span>
                      )}
                      {boxBorderDone && typedChars >= fullDetailText.length && (
                        <span className="animate-pulse">_</span>
                      )}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
