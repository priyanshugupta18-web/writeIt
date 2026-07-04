import React, { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import { Header, Footer, Loader } from "./components";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;