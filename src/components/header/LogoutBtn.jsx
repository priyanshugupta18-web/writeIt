import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { LogOut } from "lucide-react";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="
    flex items-center gap-2
    px-5 py-2.5
    rounded-lg
    border border-sky-500
    text-sky-500
    font-medium
    transition-all duration-300
    hover:bg-sky-500
    hover:text-white
    hover:shadow-lg
    hover:shadow-sky-500/30
    active:scale-95
  "
    >
      <LogOut size={15} />
      LogOut
    </button>
  );
}

export default LogoutBtn;
