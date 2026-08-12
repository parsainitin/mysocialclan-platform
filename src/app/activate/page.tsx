"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ShieldCheck,
  Lock,
  User,
  Mail,
  Eye,
  EyeOff,
  Globe,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { LanguageDropdown } from "@/context/LanguageContext";

function ActivateContent() {
  const searchParams = useSearchParams();
  const subdomain = searchParams.get("subdomain") || "";
  const token = searchParams.get("token") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<{
    communityName: string;
    adminName: string;
    adminEmail: string;
    adminMobile: string;
    status: string;
  } | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!subdomain || !token) {
      setError("Missing subdomain or activation token in URL.");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `/api/communities/activate?subdomain=${encodeURIComponent(subdomain)}&token=${encodeURIComponent(token)}`
        );
        const data = await res.json();
        if (res.ok && data.valid) {
          setDetails(data);
        } else {
          setError(data.error || "Invalid or expired activation link.");
        }
      } catch {
        setError("Failed to load activation details. Please check your internet connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [subdomain, token]);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please verify your entries.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/communities/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subdomain, token, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        alert(data.error || "Failed to activate account");
      }
    } catch {
      alert("Activation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Loading Onboarding Portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between z-10 py-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white">MySocialClan</span>
        </div>
        <LanguageDropdown className="bg-slate-900/80 border-slate-800 text-white" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-md w-full mx-auto my-auto z-10 py-8">
        {error ? (
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-white">Activation Link Error</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{error}</p>
            <a
              href="/"
              className="inline-block py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all text-decoration-none mt-2"
            >
              Return to Homepage
            </a>
          </div>
        ) : success ? (
          <div className="bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-white">Community Admin Account Activated!</h2>
              <p className="text-xs text-slate-300">
                Welcome to <strong>{details?.communityName}</strong>. Your password has been configured and your administrator privileges are active.
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-left space-y-1.5 font-mono">
              <div><span className="text-slate-500">Subdomain:</span> <strong className="text-indigo-400">{subdomain}.mysocialclan.com</strong></div>
              <div><span className="text-slate-500">Admin Email:</span> <strong className="text-white">{details?.adminEmail}</strong></div>
            </div>

            <a
              href="/"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer border-0 flex items-center justify-center space-x-2 text-decoration-none"
            >
              <span>Access Community Portal Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admin Account Onboarding</span>
              </div>
              <h1 className="text-xl font-black text-white">{details?.communityName}</h1>
              <p className="text-xs text-slate-400">
                Set up your security password to activate your Community Admin account.
              </p>
            </div>

            {/* Admin Info Card */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-white font-bold">
                <User className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{details?.adminName}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{details?.adminEmail}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono text-indigo-400">{subdomain}.mysocialclan.com</span>
              </div>
            </div>

            <form onSubmit={handleActivate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Create Security Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Confirm Security Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-10 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer border-0 flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Activate Account & Complete Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="text-center text-[11px] text-slate-600 z-10">
        MySocialClan Platform Onboarding System
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Loading Portal...</p>
        </div>
      }
    >
      <ActivateContent />
    </Suspense>
  );
}
