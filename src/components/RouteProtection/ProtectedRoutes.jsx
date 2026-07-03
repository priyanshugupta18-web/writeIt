import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected() {
  const isLoggedIn = useSelector((state) => state.auth.status);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default Protected;
