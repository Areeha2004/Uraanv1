"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

export const dynamic = "force-dynamic";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  // params is a client hook — safe when file is client
  const error = params?.get?.("error") ?? null;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reset, setReset] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // guard signOut so it runs only in browser
  useEffect(() => {
    if (typeof window !== "undefined" && (error === "OAuthAccountNotLinked" || error === "SessionRequired")) {
      // clear stale OAuth session on mismatch
      signOut({ callbackUrl: "/LoginPage" });
    }
  }, [error]);

  // run replace only client-side and only when reset changes
  useEffect(() => {
    if (typeof window !== "undefined" && reset) {
      router.replace("/LoginPage");
    }
  }, [reset]); // router is stable; no need to include

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);
    if (res?.error) {
      setErrors({ general: "Invalid credentials" });
    } else {
      router.push("/DashboardPage");
    }
  };

  const handleGoogleSignIn = () => {
    if (typeof window !== "undefined") signIn("google", { callbackUrl: "/DashboardPage" });
  };

  const handleFacebookSignIn = () => {
    if (typeof window !== "undefined") signIn("facebook", { callbackUrl: "/DashboardPage" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-base via-baby-powder to-secondary/20" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent2/10 to-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center">
              <span className="text-baby-powder font-bold text-xl">U</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">URAAN</span>
          </Link>
        </div>

        <div className="bg-glass-bg backdrop-blur-lg border border-secondary/20 rounded-3xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-text mb-2 text-center">Welcome Back!</h1>
          <p className="text-text/70 text-center mb-6">Continue your entrepreneurial journey</p>

          {errors.general && <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-2xl text-red-700 text-sm text-center">{errors.general}</div>}

          {error === "OAuthAccountNotLinked" && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
              You’ve already signed up with a different method. Please sign in with email & password first, then reconnect Google in your account settings.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-text/70 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 focus:outline-none focus:ring-2 border-secondary/30 focus:border-primary focus:ring-primary/20"
                  required
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-text/70 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" size={20} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 focus:outline-none focus:ring-2 border-secondary/30 focus:border-primary focus:ring-primary/20"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text/40 hover:text-text transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-secondary/30 rounded" />
                <span className="ml-2 text-sm text-text/70">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-light">Forgot password?</Link>
            </div>

            <button type="submit" disabled={isLoading} className={`group w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold text-lg transition-all ${isLoading ? 'bg-text/20 text-text/40 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-primary-light text-baby-powder hover:shadow-lg hover:scale-105'}`}>
              {isLoading ? <div className="w-6 h-6 border-2 border-text/20 border-t-text/40 rounded-full animate-spin" /> : <>
                <span>Sign In</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-secondary/30" /></div>
            <div className="relative flex justify-center text-sm bg-glass-bg px-4 text-text/60">or continue with</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" onClick={handleGoogleSignIn} className="flex items-center justify-center px-4 py-3 border border-secondary/30 rounded-2xl bg-baby-powder/50 hover:bg-baby-powder transition-colors">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium text-text">Google</span>
            </button>
            <button type="button" onClick={handleFacebookSignIn} className="flex items-center justify-center px-4 py-3 border border-secondary/30 rounded-2xl bg-baby-powder/50 hover:bg-baby-powder transition-colors">
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium text-text">Facebook</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/SignupPage" className="text-primary hover:text-primary-light font-medium transition-colors">Don't have an account? Sign up for free</Link>
          </div>

          <div className="mt-6 text-center">
            <button onClick={() => typeof window !== "undefined" && signOut({ callbackUrl: "/LoginPage" })} className="text-sm text-gray-600 underline hover:text-gray-800">Log out / Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
