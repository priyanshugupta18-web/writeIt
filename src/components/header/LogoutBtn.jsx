import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { LogOut } from "lucide-react";
import { useState } from "react";

function LogoutBtn() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  async function handleLogout() {
    setLoading(true);
    try {
      await authService.logOut().then(() => {
        dispatch(logout());
        setLoading(false);
      });
    } catch (error) {
      alert("error occured: " + error.message);
      setLoading(false);
    }
  }

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
      {loading ? (
        <div
          className="animate-spin rounded-full border-2 border-white/30 border-t-white"
          style={{
            width: 16,
            height: 16,
          }}
        />
      ) : (
        "Log Out"
      )}
    </button>
  );
}

export default LogoutBtn;
