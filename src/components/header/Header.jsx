import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Logo, Container } from "../index";
import LogoutBtn from "./LogoutBtn";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "SignUp", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/allposts", active: true },
    { name: "Add Post", slug: "/addpost", active: authStatus },
  ];

  const linkClass = ({ isActive }) =>
    `relative font-medium transition-all duration-300 ${
      isActive ? "text-sky-400" : "text-slate-300 hover:text-sky-400"
    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-sky-400 after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <Container>
        <div className="flex h-18 items-center justify-between">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink to={item.slug} className={linkClass}>
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-2xl text-slate-200 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-slate-800 py-5 md:hidden">
            <ul className="flex flex-col gap-5">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        onClick={() => setIsOpen(false)}
                        className={linkClass}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}

              {authStatus && (
                <li onClick={() => setIsOpen(false)}>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Header;