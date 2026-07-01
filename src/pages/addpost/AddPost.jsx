import React from "react";
import { Post } from "../../components";

function AddPost() {
  return (
    <div className="relative min-h-screen overflow-hidden px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px] sm:h-80 sm:w-80 sm:blur-[120px]" />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-cyan-400 sm:text-sm sm:tracking-[0.35em]">
            Dashboard
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Create a New Post
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-4 sm:text-base">
            Share your thoughts, tutorials, or project updates.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl shadow-[0_0_35px_rgba(56,189,248,0.08)] sm:rounded-3xl sm:p-6 md:p-10">
          <Post />
        </div>
      </div>
    </div>
  );
}

export default AddPost;