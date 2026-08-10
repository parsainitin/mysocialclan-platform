"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Users,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ImagePlus,
  Building2,
  Calendar,
  ShoppingBag,
  Heart,
  Landmark,
  Megaphone,
  Lock,
  ArrowRight,
  Check,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

import { useLanguage, LanguageDropdown } from "@/context/LanguageContext";

export default function CreateClanPage() {
  const { t, isRtl } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Subdomain
  const [subdomain, setSubdomain] = useState("");
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [subdomainError, setSubdomainError] = useState<string | null>(null);

  // Step 2: Community Details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [primaryLanguage, setPrimaryLanguage] = useState<string>("en");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [cities, setCities] = useState("New York, London, Tokyo, Berlin, Paris, Sydney");
  const [gotras, setGotras] = useState("Chapter A, Chapter B, Chapter C, Guild North, Guild South");
  const [kulDevis, setKulDevis] = useState("Primary Hub, Secondary Hub, Regional Board");
  const [upiId, setUpiId] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Step 3: Admin Account
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminMobile, setAdminMobile] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Step 4: Modules Configuration
  const [modules, setModules] = useState({
    directory: true,
    marketplace: true,
    panchang: true,
    booking: true,
    events: true,
    donations: true,
  });

  // Step 5: Submission & Result
  const [submitting, setSubmitting] = useState(false);
  const [creationError, setCreationError] = useState<string | null>(null);
  const [createdCommunityName, setCreatedCommunityName] = useState<string | null>(null);

  // Debounced subdomain availability check
  useEffect(() => {
    if (step !== 1) return;
    const clean = subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!clean) {
      setSubdomainAvailable(null);
      setSubdomainError(null);
      return;
    }

    setCheckingSubdomain(true);
    setSubdomainError(null);

    const timer = setTimeout(() => {
      fetch(`/api/communities/check-subdomain?subdomain=${clean}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.available) {
            setSubdomainAvailable(true);
            setSubdomainError(null);
          } else {
            setSubdomainAvailable(false);
            setSubdomainError(data.error || "Subdomain is unavailable");
          }
        })
        .catch(() => {
          setSubdomainAvailable(false);
          setSubdomainError("Network error checking availability");
        })
        .finally(() => setCheckingSubdomain(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [subdomain, step]);

  const handleLogoUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("Logo image must be under 5MB");
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRegisterCommunity = async () => {
    setSubmitting(true);
    setCreationError(null);

    try {
      let logoUrl: string | undefined = undefined;

      const res = await fetch("/api/communities/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subdomain: subdomain.trim().toLowerCase(),
          description,
          logo: logoUrl,
          primaryLanguage,
          cities: cities.split(",").map((s) => s.trim()).filter(Boolean),
          gotras: gotras.split(",").map((s) => s.trim()).filter(Boolean),
          kulDevis: kulDevis.split(",").map((s) => s.trim()).filter(Boolean),
          upiId: upiId.trim(),
          modules,
          adminName,
          adminEmail,
          adminMobile,
          adminPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Community registration failed");
      }

      setCreatedCommunityName(name);
      setStep(5);
    } catch (err: any) {
      setCreationError(err.message || "An error occurred submitting creation request");
    } finally {
      setSubmitting(false);
    }
  };

  const stepTabs = [
    { num: 1, title: "Subdomain" },
    { num: 2, title: "Organization Info" },
    { num: 3, title: "Admin Contact" },
    { num: 4, title: "Social Modules" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white relative overflow-hidden flex flex-col justify-between">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-indigo-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <a
            href="/"
            className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 transition-colors text-xs font-extrabold text-decoration-none group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t.backHome}</span>
          </a>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <span className="hidden md:inline-block text-sm font-black tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-900 bg-clip-text text-transparent">
                {t.wizardTitle}
              </span>
            </div>
            <LanguageDropdown />
          </div>

          <div className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80">
            Step {step} of {step === 5 ? 5 : 4}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-10">
        {/* Wizard Card Wrapper */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden">
          {/* Progress Bar Header */}
          {step < 5 && (
            <div className="bg-slate-50/80 border-b border-slate-100 p-6">
              {/* Step Tab Indicators */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {stepTabs.map((tab) => (
                  <div
                    key={tab.num}
                    onClick={() => {
                      if (tab.num < step) setStep(tab.num as any);
                    }}
                    className={`flex items-center space-x-2 p-2 rounded-xl border text-xs font-bold transition-all ${
                      step === tab.num
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                        : step > tab.num
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700 cursor-pointer"
                        : "bg-slate-100 border-slate-200 text-slate-400 select-none"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-extrabold ${
                        step === tab.num
                          ? "bg-white text-indigo-600"
                          : step > tab.num
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step > tab.num ? <Check className="w-3 h-3 stroke-[3]" /> : tab.num}
                    </div>
                    <span className="hidden sm:inline truncate">{tab.title}</span>
                  </div>
                ))}
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 h-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Step Contents */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* STEP 1: SUBDOMAIN SELECTION */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{t.wizardSubdomainStep}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.wizardSubdomainTitle}</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t.wizardSubdomainDesc}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.subdomainLabel}
                  </label>
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                    <input
                      type="text"
                      autoFocus
                      placeholder="e.g. college"
                      value={subdomain}
                      onChange={(e) =>
                        setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                      }
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-transparent text-sm sm:text-base font-mono text-slate-900 placeholder:text-slate-400 outline-none border-0 min-w-0"
                    />
                    <span className="px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-100/90 border-l border-slate-200 text-xs sm:text-sm font-mono font-bold text-indigo-600 whitespace-nowrap select-none shrink-0">
                      .mysocialclan.com
                    </span>
                  </div>

                  {/* Availability Status */}
                  <div className="mt-3 min-h-[24px]">
                    {checkingSubdomain && (
                      <p className="text-xs text-slate-500 flex items-center space-x-2 animate-pulse font-semibold">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                        <span>{t.checkingAvailability}</span>
                      </p>
                    )}
                    {!checkingSubdomain && subdomainAvailable === true && (
                      <p className="text-xs text-emerald-600 font-bold flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4.5 h-4.5" />
                        <span>Subdomain <strong>{subdomain}.mysocialclan.com</strong> {t.subdomainAvailableMsg}</span>
                      </p>
                    )}
                    {!checkingSubdomain && subdomainAvailable === false && (
                      <p className="text-xs text-rose-600 font-bold flex items-center space-x-1.5">
                        <AlertCircle className="w-4.5 h-4.5" />
                        <span>{subdomainError || "Subdomain is unavailable"}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    disabled={!subdomainAvailable || checkingSubdomain}
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-600/25 border-0 cursor-pointer transition-all flex items-center justify-center space-x-2"
                  >
                    <span>{t.nextOrgDetails}</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: COMMUNITY DETAILS */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{t.wizardOrgStep}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.wizardOrgTitle}</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t.wizardOrgDesc} (<strong>{subdomain}.mysocialclan.com</strong>).
                  </p>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.orgLogoLabel}
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden shrink-0 shadow-2xs"
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImagePlus className="w-6 h-6 text-slate-400" />
                      )}
                    </button>
                    <div className="text-xs text-slate-600">
                      {logoPreview ? (
                        <span className="text-indigo-600 font-bold block mb-1">Logo image uploaded!</span>
                      ) : (
                        <span className="font-medium block mb-1">Click to select square logo</span>
                      )}
                      <span className="text-slate-400">PNG, JPG or WebP (Max 5MB)</span>
                    </div>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleLogoUpload(f);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.orgNameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Global Alumni Association / Tech Guild / NGO Foundation"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.primaryLanguageLabel}
                  </label>
                  <select
                    value={primaryLanguage}
                    onChange={(e) => setPrimaryLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="en">English (EN)</option>
                    <option value="ar">العربية (Arabic - GCC)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="ur">اردو (Urdu)</option>
                    <option value="ml">മലയാളം (Malayalam)</option>
                    <option value="es">Español (ES)</option>
                    <option value="fr">Français (FR)</option>
                    <option value="de">Deutsch (DE)</option>
                    <option value="ja">日本語 (Japanese)</option>
                    <option value="pt">Português (Brasil)</option>
                    <option value="fil">Filipino (Tagalog)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.orgDescLabel}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short description or tagline of this community network"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-600 focus:bg-white resize-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.orgCitiesLabel}
                  </label>
                  <input
                    type="text"
                    value={cities}
                    onChange={(e) => setCities(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.orgUpiLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. organization@bank / upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs border-0 cursor-pointer transition-colors"
                  >
                    {t.backBtn}
                  </button>
                  <button
                    disabled={!name.trim()}
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-xl font-extrabold text-xs border-0 cursor-pointer shadow-md shadow-indigo-500/20 transition-all flex items-center space-x-1.5"
                  >
                    <span>{t.nextAdminDetails}</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ADMIN DETAILS */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{t.wizardAdminStep}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.wizardAdminTitle}</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t.wizardAdminDesc}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.adminNameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe / Dr. Rajesh Shah"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.adminEmailLabel}
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. admin@organization.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.adminMobileLabel}
                  </label>
                  <input
                    type="tel"
                    placeholder="Contact mobile number"
                    value={adminMobile}
                    onChange={(e) => setAdminMobile(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs border-0 cursor-pointer transition-colors"
                  >
                    {t.backBtn}
                  </button>
                  <button
                    disabled={!adminName.trim() || !adminEmail.trim() || !adminMobile.trim()}
                    onClick={() => setStep(4)}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-xl font-extrabold text-xs border-0 cursor-pointer shadow-md shadow-indigo-500/20 transition-all flex items-center space-x-1.5"
                  >
                    <span>{t.nextModules}</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: MODULE SELECTION */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{t.wizardModulesStep}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.wizardModulesTitle}</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t.wizardModulesDesc} (<strong>{name}</strong>).
                  </p>
                </div>

                {creationError && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-xs font-semibold">
                    {creationError}
                  </div>
                )}

                <div className="space-y-3">
                  {[
                    { key: "directory" as const, label: "Verified Member Feed & Directory", icon: Users, desc: "Private member profiles, family trees, and verified identity badges." },
                    { key: "marketplace" as const, label: "Social Business & Opportunities", icon: ShoppingBag, desc: "Community marketplace, business directory, and job listings." },
                    { key: "panchang" as const, label: "Community Calendar & Timelines", icon: Calendar, desc: "Event schedules, daily updates, and auspicious dates." },
                    { key: "booking" as const, label: "Venue & Space Bookings", icon: Landmark, desc: "Community hall & venue reservations with instant approval." },
                    { key: "events" as const, label: "Announcements & Events Hub", icon: Megaphone, desc: "Official updates, member discussions, and event RSVPs." },
                    { key: "donations" as const, label: "Direct Member Support Payments", icon: Heart, desc: "0% fee contributions directly into your organization's account." },
                  ].map((mod) => {
                    const Icon = mod.icon;
                    const isChecked = modules[mod.key];
                    return (
                      <label
                        key={mod.key}
                        onClick={() => setModules({ ...modules, [mod.key]: !isChecked })}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                          isChecked
                            ? "bg-indigo-50/80 border-indigo-300 text-slate-900 shadow-2xs"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center space-x-3.5">
                          <div className={`p-2.5 rounded-xl ${isChecked ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-sm font-bold block">{mod.label}</span>
                            <span className="text-xs text-slate-500">{mod.desc}</span>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                            isChecked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs border-0 cursor-pointer transition-colors"
                  >
                    {t.backBtn}
                  </button>
                  <button
                    disabled={submitting}
                    onClick={handleRegisterCommunity}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-xl font-black text-xs shadow-lg shadow-indigo-600/25 border-0 cursor-pointer transition-all flex items-center space-x-2"
                  >
                    {submitting ? (
                      <span>{t.submittingRequest}</span>
                    ) : (
                      <>
                        <span>{t.submitSetupRequest}</span>
                        <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: SUCCESS CONFIRMATION */}
            {step === 5 && (
              <div className="text-center py-8 space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 animate-bounce shadow-sm">
                  <CheckCircle className="w-12 h-12 stroke-[2.5]" />
                </div>

                <h2 className="text-2xl font-black text-slate-900">{t.wizardSuccessTitle}</h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {t.wizardSuccessDesc} (<strong>{createdCommunityName}</strong>)
                </p>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3 max-w-md mx-auto">
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Requested Subdomain URL</div>
                    <div className="text-sm font-mono text-indigo-600 font-bold overflow-hidden text-ellipsis">
                      {subdomain}.mysocialclan.com
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                    <Lock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>
                      Our platform team will provision your <strong>dedicated database & subdomain hosting</strong> offline and notify you at <strong>{adminMobile}</strong> as soon as your deployment is live!
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <a
                    href="/"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-black text-xs border-0 text-decoration-none transition-all shadow-lg shadow-indigo-600/25"
                  >
                    {t.doneReturnHome}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 Vyanamics Technologies Pvt. Ltd India</p>
      </footer>
    </div>
  );
}
