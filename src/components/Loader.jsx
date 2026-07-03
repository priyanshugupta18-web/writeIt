import React from 'react'
import { motion } from 'motion/react'

function Loader() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6 bg-slate-950 text-slate-100">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-slate-500">
          write<span className="text-sky-400">It</span>
        </span>

        <motion.div
          className="h-9 w-9 rounded-full border-[3px] border-slate-800 border-t-sky-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
      </div>
  )
}

export default Loader
