import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineMail, HiOutlineExternalLink } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold text-white">
              write<span className="text-sky-400">It</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Practical blogs on programming, projects, and developer learning.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Pages
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a 
                href="https://github.com/priyanshugupta18-web/writeIt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Repository"
                className="transition hover:text-sky-400">
                  Repository
                </a>
              </li>
              
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Connect
            </h3>
            <p className="mt-4 text-sm text-slate-400">
              Follow updates and new articles.
            </p>

            <div className="mt-5 flex gap-4">
              <a
                href="https://github.com/priyanshugupta18-web"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-400 transition hover:text-sky-400"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/priyanshugupta18"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 transition hover:text-sky-400"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:priyanshuguptawebdev@gmail.com"
                aria-label="Email"
                className="text-slate-400 transition hover:text-sky-400"
              >
                <HiOutlineMail size={18} />
              </a>
            </div>

            <a
              href="https://techyp.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 transition hover:text-sky-300"
            >
              Meet the developer
              <HiOutlineExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-800 pt-5 text-sm text-slate-500 md:flex-row">
          <p>© 2026 writeIt. All rights reserved.</p>
          <p>
            Built with passion by{" "}
            <a
              href="https://techyp.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition hover:text-sky-400"
            >
              Priyanshu Gupta
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
