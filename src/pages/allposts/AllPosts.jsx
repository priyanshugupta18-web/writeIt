import React from "react";
import { motion } from "motion/react";
import { PostGallery } from "../../components";

function AllPosts() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 inline-flex rounded-full border border-sky-500/25 bg-sky-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-sky-300">
            Blog
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Explore all posts
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
            Tutorials, development experiences, project breakdowns, and
            everything shared throughout the journey.
          </p>

          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-[0_0_40px_rgba(56,189,248,0.06)] backdrop-blur-xl sm:mt-16 md:p-8"
        >
          <PostGallery />
        </motion.div>
      </div>
    </div>
  );
}

export default AllPosts;