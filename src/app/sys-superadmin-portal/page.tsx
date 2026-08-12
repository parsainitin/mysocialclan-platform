"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Users,
  CheckCircle2,
  ShieldAlert,
  Heart,
  Building2,
  MapPin,
  Lock,
  User,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Edit3,
  Trash2,
  Mail,
  Phone,
  UserCheck,
  X,
  Save,
  Power,
  MessageSquare,
  Copy,
  ExternalLink,
  Check,
  Send,
  RotateCcw,
} from "lucide-react";

import { useLanguage, LanguageDropdown } from "@/context/LanguageContext";

interface Community {
  _id: string;
  name: string;
  subdomain: string;
  description?: string;
  logo?: string;
  primaryLanguage?: string;
  country?: string;
  cities?: string[];
  gotras?: string[];
  kulDevis?: string[];
  upiId?: string;
  adminName?: string;
  adminEmail?: string;
  adminMobile?: string;
  modules?: {
    directory?: boolean;
    marketplace?: boolean;
    panchang?: boolean;
    booking?: boolean;
    events?: boolean;
    donations?: boolean;
  };
  isActive: boolean;
  createdAt: string;
}

interface CommunityRequestItem {
  _id: string;
  name: string;
  subdomain: string;
  description?: string;
  primaryLanguage?: string;
  adminName: string;
  adminEmail?: string;
  adminMobile: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  activationToken?: string;
  activationUrl?: string;
  whatsappUrl?: string;
}

export default function PlatformAdminPage() {
  const { t } = useLanguage();

  // Auth State
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");

  // Login Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Admin Data State
  const [communities, setCommunities] = useState<Community[]>([]);
  const [creationRequests, setCreationRequests] = useState<CommunityRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Community Edit Modal State
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);
  const [editTab, setEditTab] = useState<"identity" | "admin" | "modules">("identity");
  const [editName, setEditName] = useState("");
  const [editSubdomain, setEditSubdomain] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrimaryLanguage, setEditPrimaryLanguage] = useState("en");
  const [editCountry, setEditCountry] = useState("");
  const [editCities, setEditCities] = useState("");
  const [editUpiId, setEditUpiId] = useState("");

  const [editAdminName, setEditAdminName] = useState("");
  const [editAdminEmail, setEditAdminEmail] = useState("");
  const [editAdminMobile, setEditAdminMobile] = useState("");

  const [editModules, setEditModules] = useState({
    directory: true,
    marketplace: true,
    panchang: true,
    booking: true,
    events: true,
    donations: true,
  });
  const [editIsActive, setEditIsActive] = useState(true);
  const [savingAdmin, setSavingAdmin] = useState(false);

  // WhatsApp & Onboarding Dispatch Modal State
  const [dispatchData, setDispatchData] = useState<{
    communityName: string;
    subdomain: string;
    adminName: string;
    adminEmail: string;
    adminMobile: string;
    activationUrl: string;
    whatsappUrl: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Onboarding link copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Check auth status on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setAdminUsername(data.username || "Super Admin");
            fetchData();
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkSession();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [comRes, reqRes] = await Promise.all([
        fetch("/api/admin/communities"),
        fetch("/api/admin/community-requests"),
      ]);
      if (comRes.ok) setCommunities(await comRes.json());
      if (reqRes.ok) setCreationRequests(await reqRes.json());
    } catch (e) {
      console.error("Failed to fetch admin data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAdminUsername(data.username || username);
        setPassword("");
        fetchData();
      } else {
        setLoginError(data.error || t.invalidCredentialsMsg || "Invalid username or password");
      }
    } catch {
      setLoginError("Authentication failed. Please check your server connection.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    setAdminUsername("");
    setUsername("");
    setPassword("");
  };

  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [reinvitingId, setReinvitingId] = useState<string | null>(null);

  const handleRegenerateInvite = async (id: string) => {
    setReinvitingId(id);
    try {
      const res = await fetch(`/api/admin/communities/${id}/reinvite`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Fresh onboarding invite link generated!");
        setDispatchData({
          communityName: data.communityName,
          subdomain: data.subdomain,
          adminName: data.adminName,
          adminEmail: data.adminEmail,
          adminMobile: data.adminMobile,
          activationUrl: data.activationUrl,
          whatsappUrl: data.whatsappUrl,
        });
        fetchData();
      } else {
        alert(data.error || "Failed to regenerate invite link");
      }
    } catch (e: any) {
      alert("Network Error: " + e.message);
    } finally {
      setReinvitingId(null);
    }
  };


  const handleApproveRequest = async (reqId: string, provisionNow: boolean = true) => {
    setApprovingId(reqId);
    try {
      const res = await fetch(`/api/admin/community-requests/${reqId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "approved",
          provisionNow,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Request approved & Community Admin account provisioned!");
        fetchData();

        if (data.activationUrl && data.whatsappUrl) {
          setDispatchData({
            communityName: data.name || data.subdomain,
            subdomain: data.subdomain,
            adminName: data.adminName || "Admin",
            adminEmail: data.adminEmail || "",
            adminMobile: data.adminMobile || "",
            activationUrl: data.activationUrl,
            whatsappUrl: data.whatsappUrl,
          });
        }
      } else {
        alert("Approval failed: " + (data.error || "Server returned error status " + res.status));
      }
    } catch (err: any) {
      alert("Network Error: " + err.message);
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectRequest = async (reqId: string) => {
    if (!confirm("Reject this community creation request?")) return;
    try {
      const res = await fetch(`/api/admin/community-requests/${reqId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (res.ok) {
        showToast("Request rejected");
        fetchData();
      }
    } catch {}
  };

  const handleDeleteRequest = async (reqId: string, reqName: string) => {
    if (!confirm(`Are you sure you want to permanently delete the community request for "${reqName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/community-requests/${reqId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("Community creation request deleted");
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete request");
      }
    } catch {
      alert("Failed to delete request. Please check network connection.");
    }
  };

  const openEditModal = (c: Community) => {
    setEditingCommunity(c);
    setEditName(c.name || "");
    setEditSubdomain(c.subdomain || "");
    setEditDescription(c.description || "");
    setEditPrimaryLanguage(c.primaryLanguage || "en");
    setEditCountry(c.country || "");
    setEditCities(Array.isArray(c.cities) ? c.cities.join(", ") : "");
    setEditUpiId(c.upiId || "");

    setEditAdminName(c.adminName || "");
    setEditAdminEmail(c.adminEmail || "");
    setEditAdminMobile(c.adminMobile || "");

    setEditModules({
      directory: c.modules?.directory ?? true,
      marketplace: c.modules?.marketplace ?? true,
      panchang: c.modules?.panchang ?? true,
      booking: c.modules?.booking ?? true,
      events: c.modules?.events ?? true,
      donations: c.modules?.donations ?? true,
    });
    setEditIsActive(c.isActive !== false);
    setEditTab("identity");
  };

  const handleSaveCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommunity) return;

    setSavingAdmin(true);
    try {
      const res = await fetch(`/api/admin/communities/${editingCommunity._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          subdomain: editSubdomain,
          description: editDescription,
          primaryLanguage: editPrimaryLanguage,
          country: editCountry,
          cities: editCities.split(",").map((s) => s.trim()).filter(Boolean),
          upiId: editUpiId,
          adminName: editAdminName,
          adminEmail: editAdminEmail,
          adminMobile: editAdminMobile,
          modules: editModules,
          isActive: editIsActive,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Community details updated successfully!");
        setEditingCommunity(null);
        fetchData();
      } else {
        alert(data.error || "Failed to update community");
      }
    } catch {
      alert("Failed to update community. Please try again.");
    } finally {
      setSavingAdmin(false);
    }
  };


  const handleToggleCommunityStatus = async (c: Community) => {
    const newStatus = !c.isActive;
    try {
      const res = await fetch(`/api/admin/communities/${c._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });
      if (res.ok) {
        showToast(`Community ${newStatus ? "Activated" : "Deactivated"}`);
        fetchData();
      }
    } catch {}
  };

  const handleDeleteCommunity = async (c: Community) => {
    if (!confirm(`Are you sure you want to permanently delete community "${c.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/communities/${c._id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Community deleted");
        fetchData();
      }
    } catch {}
  };

  // Loading Screen while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4 font-sans">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Verifying Authorization...</p>
      </div>
    );
  }

  // Unauthenticated Login UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 font-sans relative overflow-hidden">
        {/* Background Subtle Gradient Spheres */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar */}
        <div className="max-w-5xl w-full mx-auto flex items-center justify-between z-10 py-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">MySocialClan</span>
          </div>
          <LanguageDropdown className="bg-slate-900/80 border-slate-800 text-white" />
        </div>

        {/* Main Login Form Container */}
        <div className="max-w-md w-full mx-auto my-auto z-10 py-8">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/50 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-black tracking-tight text-white">
                {t.adminLoginTitle || "Super Admin Portal"}
              </h1>
              <p className="text-xs text-slate-400">
                {t.adminLoginSub || "Please sign in with authorized credentials to access platform controls."}
              </p>
            </div>

            {loginError && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center space-x-3 text-rose-400 text-xs font-semibold animate-shake">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  {t.usernameLabel || "Admin Username"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  {t.passwordLabel || "Security Password"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security password"
                    className="w-full pl-10 pr-10 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all cursor-pointer border-0 flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-50"
              >
                {loggingIn ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{t.loginBtn || "Authenticate & Access Portal"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-600 z-10">
          Protected Area · Authorized Personnel Only
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 font-sans">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-black animate-bounce">
          {toast}
        </div>
      )}

      {/* WhatsApp & Onboarding Link Dispatch Modal */}
      {dispatchData && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">Community Approved!</h3>
                  <p className="text-xs text-slate-500">Admin Account Seeded & Onboarding Link Ready</p>
                </div>
              </div>
              <button
                onClick={() => setDispatchData(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-sm">{dispatchData.communityName}</span>
                <span className="font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                  {dispatchData.subdomain}.mysocialclan.com
                </span>
              </div>
              <p className="text-slate-600">
                Community Admin: <strong>{dispatchData.adminName}</strong>
              </p>
              <div className="flex items-center space-x-4 text-slate-600">
                <span>Phone: <strong className="text-slate-900">{dispatchData.adminMobile}</strong></span>
                <span>Email: <strong className="text-indigo-700">{dispatchData.adminEmail}</strong></span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-700">Choose Invitation Method:</p>

              {/* Direct WhatsApp Invite Button */}
              <a
                href={dispatchData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2.5 text-decoration-none cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>Send Invitation via WhatsApp ({dispatchData.adminMobile})</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* Copy Onboarding Link Button */}
              <button
                type="button"
                onClick={() => copyToClipboard(dispatchData.activationUrl, "modal-dispatch")}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-2xl text-xs border border-slate-300 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {copiedId === "modal-dispatch" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span className="text-emerald-700 font-black">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>Copy Onboarding Link Manually</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setDispatchData(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Edit Community Modal */}
      {editingCommunity && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5 relative my-8 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-indigo-600" />
                  <span>Edit Community Details</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Updating configuration for <strong>{editingCommunity.name}</strong> ({editingCommunity.subdomain})
                </p>
              </div>
              <button
                onClick={() => setEditingCommunity(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
              <button
                type="button"
                onClick={() => setEditTab("identity")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border-0 cursor-pointer ${
                  editTab === "identity"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                1. Identity & Config
              </button>
              <button
                type="button"
                onClick={() => setEditTab("admin")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border-0 cursor-pointer ${
                  editTab === "admin"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                2. Admin Contact
              </button>
              <button
                type="button"
                onClick={() => setEditTab("modules")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border-0 cursor-pointer ${
                  editTab === "modules"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                3. Feature Modules
              </button>
            </div>

            <form onSubmit={handleSaveCommunity} className="space-y-4 text-xs">
              {/* TAB 1: IDENTITY & CONFIG */}
              {editTab === "identity" && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Community Name *</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="e.g. NDS Clan"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subdomain Slug *</label>
                    <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 overflow-hidden focus-within:border-indigo-600">
                      <input
                        type="text"
                        required
                        value={editSubdomain}
                        onChange={(e) => setEditSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                        placeholder="nds"
                        className="w-full px-3.5 py-2.5 bg-transparent font-mono text-slate-900 outline-none border-0"
                      />
                      <span className="px-3 py-2.5 bg-slate-200/80 font-mono font-bold text-slate-600 select-none text-[11px] shrink-0">
                        .mysocialclan.com
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Country</label>
                      <input
                        type="text"
                        value={editCountry}
                        onChange={(e) => setEditCountry(e.target.value)}
                        placeholder="e.g. India 🇮🇳"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Primary Language</label>
                      <select
                        value={editPrimaryLanguage}
                        onChange={(e) => setEditPrimaryLanguage(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 transition-all font-bold cursor-pointer"
                      >
                        <option value="en">English (EN)</option>
                        <option value="ar">العربية (Arabic)</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                        <option value="ur">اردو (Urdu)</option>
                        <option value="ml">മലയാളം (Malayalam)</option>
                        <option value="es">Español (ES)</option>
                        <option value="fr">Français (FR)</option>
                        <option value="de">Deutsch (DE)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Predefined Regional Cities (comma separated)</label>
                    <input
                      type="text"
                      value={editCities}
                      onChange={(e) => setEditCities(e.target.value)}
                      placeholder="Mumbai, Delhi NCR, Bengaluru, Jaipur"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Community Description / Tagline</label>
                    <textarea
                      rows={2}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Brief overview of this clan network"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 transition-all font-medium resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">UPI ID (Member Donations / Fees)</label>
                    <input
                      type="text"
                      value={editUpiId}
                      onChange={(e) => setEditUpiId(e.target.value)}
                      placeholder="org@bank / upi"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-indigo-600 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: ADMIN CONTACT */}
              {editTab === "admin" && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Community Admin Name *</label>
                    <input
                      type="text"
                      required
                      value={editAdminName}
                      onChange={(e) => setEditAdminName(e.target.value)}
                      placeholder="Admin full name"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Admin Email Address *</label>
                    <input
                      type="email"
                      required
                      value={editAdminEmail}
                      onChange={(e) => setEditAdminEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Admin Mobile / WhatsApp Number *</label>
                    <input
                      type="text"
                      required
                      value={editAdminMobile}
                      onChange={(e) => setEditAdminMobile(e.target.value)}
                      placeholder="+1 234 567 890"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: MODULES & STATUS */}
              {editTab === "modules" && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-700 mb-2">Enable / Disable Community Feature Modules:</p>
                  <div className="grid grid-cols-2 gap-3.5 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    {[
                      { key: "directory", label: "Directory / Members" },
                      { key: "marketplace", label: "Marketplace / Jobs" },
                      { key: "panchang", label: "Panchang / Calendar" },
                      { key: "booking", label: "Venue Booking" },
                      { key: "events", label: "Events Hub" },
                      { key: "donations", label: "Member Donations" },
                    ].map((mod) => (
                      <label key={mod.key} className="flex items-center space-x-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(editModules as any)[mod.key]}
                          onChange={(e) =>
                            setEditModules({ ...editModules, [mod.key]: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="font-bold text-slate-800">{mod.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 mt-2">
                    <div>
                      <span className="font-bold text-slate-800 block">Community Active Status</span>
                      <span className="text-[11px] text-slate-500">Disabled communities cannot be accessed by members</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editIsActive}
                        onChange={(e) => setEditIsActive(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCommunity(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border-0 cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAdmin}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl border-0 cursor-pointer transition-all flex items-center space-x-1.5 shadow-md shadow-indigo-500/20 disabled:opacity-50"
                >
                  {savingAdmin ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Community Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4 flex-wrap sm:flex-nowrap">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Globe className="w-4 h-4 shrink-0" />
            </div>
            <h1 className="text-xl font-black text-slate-900">{t.adminPortalTitle}</h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">{t.adminPortalSub}</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-indigo-900 font-bold">Logged in: {adminUsername}</span>
          </div>
          <LanguageDropdown />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 text-xs font-bold text-rose-700 hover:text-white px-3.5 py-2 bg-rose-50 hover:bg-rose-600 rounded-xl border border-rose-200 transition-all cursor-pointer shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.logoutBtn || "Sign Out"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Pending Offline Creation Requests */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              <h2 className="text-base font-black text-slate-900">
                {t.pendingRequestsTitle} ({creationRequests.filter((r) => r.status === "pending").length})
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-6 text-xs text-slate-500">Loading requests...</div>
          ) : creationRequests.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">{t.noPendingRequests}</p>
          ) : (
            <div className="space-y-3">
              {creationRequests.map((req) => (
                <div
                  key={req._id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="font-black text-slate-900 text-sm">{req.name}</span>
                      <span className="font-mono text-indigo-600 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-md text-[11px] border border-indigo-200/60">
                        {req.subdomain}.mysocialclan.com
                      </span>
                      {req.primaryLanguage && (
                        <span className="uppercase text-[10px] font-extrabold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                          LANG: {req.primaryLanguage}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 mt-1.5">
                      Applicant: <strong className="text-slate-900">{req.adminName || "Community Admin"}</strong>
                      <span> · Email: <strong className={req.adminEmail ? "text-indigo-700 font-mono text-[11px]" : "text-rose-500 italic"}>{req.adminEmail || "Email missing"}</strong></span>
                      <span> · Phone: <strong className={req.adminMobile ? "text-slate-900" : "text-slate-400 italic"}>{req.adminMobile || "Phone missing"}</strong></span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1" suppressHydrationWarning>
                      Submitted: {new Date(req.createdAt).toLocaleString()} · Status:{" "}
                      <strong
                        className={
                          req.status === "approved"
                            ? "text-emerald-600"
                            : req.status === "rejected"
                            ? "text-rose-600"
                            : "text-amber-600"
                        }
                      >
                        {req.status.toUpperCase()}
                      </strong>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApproveRequest(req._id, true)}
                          disabled={approvingId === req._id}
                          className="py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-xl text-xs border-0 cursor-pointer transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50 flex items-center space-x-1.5"
                        >
                          {approvingId === req._id ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Approving...</span>
                            </>
                          ) : (
                            <span>{t.approveRegisterBtn}</span>
                          )}
                        </button>
                        <button
                          onClick={() => handleRejectRequest(req._id)}
                          className="py-2 px-3 bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-700 font-bold rounded-xl text-xs border-0 cursor-pointer transition-all"
                        >
                          {t.rejectBtn}
                        </button>
                      </>
                    )}

                    {req.status === "approved" && (
                      <>
                        <button
                          onClick={() => handleRegenerateInvite(req._id)}
                          disabled={reinvitingId === req._id}
                          title="Generate Fresh Onboarding Link"
                          className="py-2 px-3 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold rounded-xl border border-indigo-200 transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {reinvitingId === req._id ? (
                            <div className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Re-Invite</span>
                            </>
                          )}
                        </button>

                        {req.whatsappUrl && (
                          <a
                            href={req.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold rounded-xl border border-emerald-200 transition-all flex items-center space-x-1.5 text-decoration-none"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </>
                    )}

                    <button
                      onClick={() => handleDeleteRequest(req._id, req.name)}
                      title="Delete Request"
                      className="py-2 px-2.5 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Provisioned Active Communities & Community Admin Management */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900">
              {t.activeCommunitiesTitle} ({communities.length})
            </h2>
            <span className="text-xs text-slate-500 font-medium">Manage provisioned community admins & status</span>
          </div>

          {communities.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">{t.noCommunities}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((c) => (
                <div
                  key={c._id}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                        <span>{c.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            c.isActive !== false
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-200 text-slate-600 border-slate-300"
                          }`}
                        >
                          {c.isActive !== false ? "Active" : "Disabled"}
                        </span>
                      </h3>
                      <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60 shrink-0">
                        {c.subdomain}.mysocialclan.com
                      </span>
                    </div>

                    {c.description && <p className="text-xs text-slate-600">{c.description}</p>}

                    {/* Community Admin Contact Box */}
                    <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        <span className="flex items-center space-x-1">
                          <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Community Admin</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-slate-900 font-bold">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{c.adminName || "Not assigned"}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className={c.adminEmail ? "font-medium text-indigo-700 font-mono text-[11px]" : "text-rose-500 italic font-medium"}>
                          {c.adminEmail || "Email missing (Not set)"}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className={c.adminMobile ? "" : "text-slate-400 italic"}>
                          {c.adminMobile || "Phone missing"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-200/60 text-xs">
                    <button
                      onClick={() => openEditModal(c)}
                      className="py-1.5 px-3 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold rounded-xl border border-indigo-200/80 cursor-pointer transition-all flex items-center space-x-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Community</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRegenerateInvite(c._id)}
                        disabled={reinvitingId === c._id}
                        title="Generate Fresh Onboarding Link"
                        className="py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold rounded-xl border border-emerald-200 transition-all flex items-center space-x-1 cursor-pointer disabled:opacity-50"
                      >
                        {reinvitingId === c._id ? (
                          <div className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Re-Invite</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleCommunityStatus(c)}
                        title={c.isActive !== false ? "Disable Community" : "Activate Community"}
                        className={`py-1.5 px-2.5 font-bold rounded-xl border cursor-pointer transition-all flex items-center space-x-1 ${
                          c.isActive !== false
                            ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{c.isActive !== false ? "Disable" : "Enable"}</span>
                      </button>


                      <button
                        onClick={() => handleDeleteCommunity(c)}
                        title="Delete Community"
                        className="py-1.5 px-2 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-xl border border-slate-200 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
