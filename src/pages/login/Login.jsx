import React from "react";
import { motion } from "motion/react";
import { LoginComp } from "../../components";

function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-16 text-slate-100 sm:px-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:44px_44px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Brand mark */}
        <div className="mb-8 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-slate-500">
            write<span className="text-sky-400">It</span>
          </span>
          <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to keep writing where you left off.
          </p>
        </div>

        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-[0_0_40px_rgba(56,189,248,0.06)] backdrop-blur-xl sm:p-8">
          <LoginComp />
        </div>
      </motion.div>
    </div>
  );
}

export default Login;