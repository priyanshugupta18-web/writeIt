import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  PenLine,
  Image as ImageIcon,
  LayoutGrid,
  ShieldCheck,
  Bold,
  Italic,
  Underline,
  Heading2,
  List,
} from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Draft",
    body: "Open a blank canvas and get your thoughts down. No setup, no distractions.",
  },
  {
    n: "02",
    title: "Format",
    body: "Shape it with the rich text editor — headings, lists, images, structure.",
  },
  {
    n: "03",
    title: "Publish",
    body: "Set it active and it's live. Edit anytime, nothing is ever locked.",
  },
];

const features = [
  {
    icon: PenLine,
    title: "Distraction-free editor",
    body: "A clean writing surface with just enough formatting — nothing fighting for your attention.",
  },
  {
    icon: ImageIcon,
    title: "Featured images",
    body: "Every post carries a cover image, so your work reads well the moment someone lands on it.",
  },
  {
    icon: LayoutGrid,
    title: "One place for everything",
    body: "Drafts, active posts, and edits all live together — no scattered files, no guessing.",
  },
  {
    icon: ShieldCheck,
    title: "Yours, and only yours",
    body: "Every post is tied to your account. Sign in once, write as much as you want.",
  },
];

// Signature mark: a single pen stroke that draws itself into a "W",
// standing in for the old static Logo image.
function WriteMark() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" fill="none">
      <defs>
        <linearGradient id="writeMarkGradient" x1="0" y1="0" x2="400" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="55%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>

      <motion.path
        d="M40 90 L130 230 L200 110 L270 230 L360 90"
        stroke="url(#writeMarkGradient)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      {/* blinking "nib" cursor at the end of the stroke */}
      <motion.circle
        cx="360"
        cy="90"
        r="9"
        fill="#38bdf8"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          delay: 1.8,
          duration: 1.1,
          repeat: Infinity,
          repeatDelay: 0.3,
        }}
      />
    </svg>
  );
}

function Home() {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* ---------- HERO ---------- */}
      <section className="relative">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute bottom-20 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-sky-500/25 bg-sky-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-sky-300">
                A focused place for writing
              </p>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                {authStatus ? "Welcome back." : "Write clearly."}
                <span className="block bg-gradient-to-r from-sky-400 via-cyan-200 to-indigo-400 bg-clip-text text-transparent">
                  {authStatus
                    ? "Continue your next article."
                    : "Publish beautifully."}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                writeIt helps you create readable articles, manage your posts,
                and present your ideas in a clean publishing environment.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={authStatus ? "/addpost" : "/login"}
                  className="rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
                >
                  {authStatus ? "Write a new post" : "Get started"}
                </Link>
                <Link
                  to="/allposts"
                  className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-sky-500/50 hover:text-sky-300"
                >
                  Browse posts
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem]"
              >
                <WriteMark />
              </motion.div>

              <h2 className="mt-6 text-4xl font-black uppercase tracking-[0.35em] text-white sm:text-5xl lg:text-6xl">
                write<span className="text-sky-400">It</span>
              </h2>

              <p className="mt-4 max-w-sm text-center text-base text-slate-400">
                Where ideas become articles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="relative border-t border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
            The process
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-white sm:text-3xl">
            Three steps from blank page to published article.
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span className="font-mono text-sm text-sky-500/70">
                  {step.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {step.body}
                </p>

                {i < steps.length - 1 && (
                  <div className="mt-6 hidden h-px w-full bg-gradient-to-r from-sky-500/30 to-transparent sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="relative border-t border-slate-800/80 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
            What you get
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-white sm:text-3xl">
            Everything a writer actually needs. Nothing they don't.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 transition-colors hover:border-sky-500/40"
              >
                <f.icon className="h-6 w-6 text-sky-400" strokeWidth={1.75} />
                <h3 className="mt-4 text-base font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {f.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative border-t border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Your next article is one click away.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
                  No drafts folder to dig through, no formatting fights.
                  Just open a page and start writing.
                </p>
                <Link
                  to={authStatus ? "/addpost" : "/login"}
                  className="mt-6 inline-flex rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
                >
                  {authStatus ? "Start writing" : "Create your account"}
                </Link>
              </div>

              {/* mock rich-text editor strip (TinyMCE-style, not markdown) */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 shadow-2xl">
                <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-2.5">
                  <Bold className="h-3.5 w-3.5 text-slate-500" strokeWidth={2.5} />
                  <Italic className="h-3.5 w-3.5 text-slate-500" strokeWidth={2.5} />
                  <Underline className="h-3.5 w-3.5 text-slate-500" strokeWidth={2.5} />
                  <span className="h-3.5 w-px bg-slate-800" />
                  <Heading2 className="h-3.5 w-3.5 text-slate-500" strokeWidth={2.5} />
                  <List className="h-3.5 w-3.5 text-slate-500" strokeWidth={2.5} />
                </div>

                <div className="space-y-3 p-5 text-sm leading-6 text-slate-400">
                  <p className="text-lg font-semibold text-slate-200">
                    The thing I've been meaning to write
                  </p>
                  <p>
                    It started as a note to myself, then it
                    <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-sky-400 align-middle" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;