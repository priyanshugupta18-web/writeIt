import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Input, Button, Logo } from "./index";

function SignupComp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (data) => {
    setError("");
    setLoading(true);

    try {
      const user = await authService.createUser(data);

      if (user) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20";

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>

      <form onSubmit={handleSubmit(signup)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Full name
          </label>
          <Input
            type="text"
            placeholder="Bruce Wyane"
            className={fieldClass}
            {...register("fullName", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Email
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            className={fieldClass}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className={`${fieldClass} pr-10`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              tabIndex={-1}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            "Creating account..."
          ) : (
            <>
              <UserPlus size={16} />
              Create Account
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-sky-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupComp;