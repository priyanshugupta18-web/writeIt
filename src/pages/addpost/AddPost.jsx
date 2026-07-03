import React from "react";
import { Post } from "../../components";

function AddPost() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

      <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px] sm:h-80 sm:w-80 sm:blur-[120px]" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-56 w-56 rounded-full bg-blue-500/[0.06] blur-[100px] sm:h-72 sm:w-72" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-8 text-center sm:mb-12">
          
          <h1 className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            Create a New Post
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-4 sm:text-base">
            Share your thoughts, tutorials, or project updates.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl shadow-[0_0_35px_rgba(56,189,248,0.08)] transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(56,189,248,0.14)] sm:rounded-3xl sm:p-6 md:p-10">
          <div className="pointer-events-none absolute -top-px left-8 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent sm:left-12" />

          <Post />
        </div>
      </div>
    </div>
  );
}

export default AddPost;