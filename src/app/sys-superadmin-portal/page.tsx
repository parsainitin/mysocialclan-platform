"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronRight,
  ImagePlus,
  Plus,
  Calendar,
  ShoppingBag,
  Landmark,
  Megaphone,
  AlertCircle,
  Upload,
  GraduationCap,
  Award,
  Briefcase,
  HeartHandshake,
  BookOpen,
} from "lucide-react";

import { useLanguage, LanguageDropdown } from "@/context/LanguageContext";
import { COUNTRY_OPTIONS } from "@/lib/countryOptions";

interface Community {
  _id: string;
  name: string;
  subdomain: string;
  communityType?: string;
  description?: string;
  logo?: string;
  website?: string;
  primaryLanguage?: string;
  country?: string;
  cities?: string[];
  taxonomy1Title?: string;
  taxonomy1Items?: string[];
  taxonomy2Title?: string;
  taxonomy2Items?: string[];
  gotras?: string[];
  kulDevis?: string[];
  upiId?: string;
  adminName?: string;
  adminEmail?: string;
  adminMobile?: string;
  adminRole?: string;
  modules?: {
    directory?: boolean;
    opportunities?: boolean;
    calendar?: boolean;
    booking?: boolean;
    events?: boolean;
    donations?: boolean;
    marketplace?: boolean;
    panchang?: boolean;
  };
  isActive: boolean;
  createdAt: string;
}

interface CommunityRequestItem {
  _id: string;
  name: string;
  subdomain: string;
  communityType?: string;
  description?: string;
  website?: string;
  primaryLanguage?: string;
  taxonomy1Title?: string;
  taxonomy1Items?: string[];
  taxonomy2Title?: string;
  taxonomy2Items?: string[];
  gotras?: string[];
  kulDevis?: string[];
  adminName: string;
  adminEmail?: string;
  adminMobile: string;
  adminRole?: string;
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

  // Community Edit Wizard State
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);
  const [editStep, setEditStep] = useState<1 | 2 | 3 | 4>(1);
  const [editName, setEditName] = useState("");
  const [editSubdomain, setEditSubdomain] = useState("");
  const [editCommunityType, setEditCommunityType] = useState("college");
  const [editLogo, setEditLogo] = useState("");
  const [editLogoPreview, setEditLogoPreview] = useState<string | null>(null);
  const editLogoInputRef = useRef<HTMLInputElement>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [editPrimaryLanguage, setEditPrimaryLanguage] = useState("en");
  const [editCountryCode, setEditCountryCode] = useState("IN");
  const [editSelectedCities, setEditSelectedCities] = useState<string[]>([]);
  const [editCustomCityInput, setEditCustomCityInput] = useState("");

  const [editTaxonomy1Title, setEditTaxonomy1Title] = useState("Academic Departments & Batches");
  const [editTaxonomy1, setEditTaxonomy1] = useState("");
  const [editTaxonomy2Title, setEditTaxonomy2Title] = useState("Campus Blocks & Centers");
  const [editTaxonomy2, setEditTaxonomy2] = useState("");
  const [editUpiId, setEditUpiId] = useState("");

  const [editAdminName, setEditAdminName] = useState("");
  const [editAdminEmail, setEditAdminEmail] = useState("");
  const [editAdminMobile, setEditAdminMobile] = useState("");
  const [editAdminRole, setEditAdminRole] = useState("Dean / Principal");

  const [editModules, setEditModules] = useState({
    directory: true,
    opportunities: true,
    calendar: true,
    booking: true,
    events: true,
    donations: true,
    panchang: false,
    marketplace: false,
  });
  const [editIsActive, setEditIsActive] = useState(true);
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Request Action Loading States
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [reinvitingId, setReinvitingId] = useState<string | null>(null);
  const [dispatchData, setDispatchData] = useState<{
    communityName: string;
    subdomain: string;
    adminName: string;
    adminEmail: string;
    adminMobile: string;
    activationUrl: string;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin/communities");
      if (res.ok) {
        setIsAuthenticated(true);
        setAdminUsername("SuperAdmin");
        fetchData();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        setAdminUsername(data.username || username);
        fetchData();
      } else {
        setLoginError(data.error || "Authentication failed. Please verify credentials.");
      }
    } catch {
      setLoginError("Failed to connect to authentication server.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } catch {}
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setCommunities([]);
    setCreationRequests([]);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [commsRes, reqsRes] = await Promise.all([
        fetch("/api/admin/communities"),
        fetch("/api/admin/community-requests"),
      ]);

      if (commsRes.ok) {
        const commsData = await commsRes.json();
        setCommunities(commsData);
      }
      if (reqsRes.ok) {
        const reqsData = await reqsRes.json();
        setCreationRequests(reqsData);
      }
    } catch {}
    setLoading(false);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleEditLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Logo file size must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setEditLogo(base64);
      setEditLogoPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const openEditModal = (c: Community) => {
    setEditingCommunity(c);
    setEditStep(1);
    setEditError(null);
    setEditName(c.name || "");
    setEditSubdomain(c.subdomain || "");
    setEditCommunityType(c.communityType || "college");
    setEditLogo(c.logo || "");
    setEditLogoPreview(c.logo || null);
    setEditDescription(c.description || "");
    setEditWebsite(c.website || "");
    setEditPrimaryLanguage(c.primaryLanguage || "en");

    const foundCountry = COUNTRY_OPTIONS.find(
      (co) => co.label.toLowerCase() === (c.country || "").toLowerCase() || co.code === c.country
    );
    setEditCountryCode(foundCountry?.code || "IN");

    setEditSelectedCities(
      Array.isArray(c.cities) && c.cities.length > 0
        ? [...c.cities]
        : foundCountry
        ? [...foundCountry.cities]
        : [...COUNTRY_OPTIONS[0].cities]
    );
    setEditCustomCityInput("");

    setEditTaxonomy1Title(c.taxonomy1Title || (c.communityType === "college" ? "Academic Departments & Batches" : "Gotras / Chapters"));
    const tax1 = Array.isArray(c.taxonomy1Items) && c.taxonomy1Items.length > 0
      ? c.taxonomy1Items
      : Array.isArray(c.gotras) ? c.gotras : [];
    setEditTaxonomy1(tax1.join(", "));

    setEditTaxonomy2Title(c.taxonomy2Title || (c.communityType === "college" ? "Campus Blocks & Centers" : "Regional Hubs"));
    const tax2 = Array.isArray(c.taxonomy2Items) && c.taxonomy2Items.length > 0
      ? c.taxonomy2Items
      : Array.isArray(c.kulDevis) ? c.kulDevis : [];
    setEditTaxonomy2(tax2.join(", "));

    setEditUpiId(c.upiId || "");
    setEditAdminName(c.adminName || "");
    setEditAdminEmail(c.adminEmail || "");
    setEditAdminMobile(c.adminMobile || "");
    setEditAdminRole(c.adminRole || "Dean / Principal");

    const opps = c.modules?.opportunities ?? c.modules?.marketplace ?? true;
    const cal = c.modules?.calendar ?? c.modules?.panchang ?? true;

    setEditModules({
      directory: c.modules?.directory ?? true,
      opportunities: opps,
      calendar: cal,
      booking: c.modules?.booking ?? true,
      events: c.modules?.events ?? true,
      donations: c.modules?.donations ?? true,
      panchang: c.modules?.panchang ?? false,
      marketplace: c.modules?.marketplace ?? false,
    });
    setEditIsActive(c.isActive !== false);
  };

  const handleSaveCommunity = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingCommunity) return;

    setSavingAdmin(true);
    setEditError(null);

    const selectedCountryObj = COUNTRY_OPTIONS.find((c) => c.code === editCountryCode);

    try {
      const parsedTax1 = editTaxonomy1.split(",").map((s) => s.trim()).filter(Boolean);
      const parsedTax2 = editTaxonomy2.split(",").map((s) => s.trim()).filter(Boolean);

      const res = await fetch(`/api/admin/communities/${editingCommunity._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          communityType: editCommunityType,
          logo: editLogo.trim() || undefined,
          description: editDescription.trim(),
          website: editWebsite.trim() || undefined,
          primaryLanguage: editPrimaryLanguage,
          country: selectedCountryObj?.label || editCountryCode,
          cities: editSelectedCities,
          taxonomy1Title: editTaxonomy1Title.trim(),
          taxonomy1Items: parsedTax1,
          taxonomy2Title: editTaxonomy2Title.trim(),
          taxonomy2Items: parsedTax2,
          gotras: parsedTax1,
          kulDevis: parsedTax2,
          upiId: editUpiId.trim(),
          adminName: editAdminName.trim(),
          adminEmail: editAdminEmail.trim().toLowerCase(),
          adminMobile: editAdminMobile.trim(),
          adminRole: editAdminRole.trim(),
          modules: editModules,
          isActive: editIsActive,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Community configuration updated successfully!");
        setEditingCommunity(null);
        fetchData();
      } else {
        setEditError(data.error || "Failed to update community");
      }
    } catch {
      setEditError("Failed to update community. Please check your network connection.");
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
        showToast("Community deleted permanently");
        fetchData();
      }
    } catch {}
  };

  const handleApproveRequest = async (id: string, provisionNow = true) => {
    setApprovingId(id);
    try {
      const res = await fetch(`/api/admin/community-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved", provisionNow }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Request Approved & Admin Account Seeded!");
        if (data.activationUrl) {
          setDispatchData({
            communityName: data.name,
            subdomain: data.subdomain,
            adminName: data.adminName || "Community Admin",
            adminEmail: data.adminEmail || "",
            adminMobile: data.adminMobile || "",
            activationUrl: data.activationUrl,
            whatsappUrl: data.whatsappUrl,
          });
        }
        fetchData();
      } else {
        alert(data.error || "Approval failed");
      }
    } catch {
      alert("Failed to connect to approval service");
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectRequest = async (id: string) => {
    if (!confirm("Are you sure you want to reject this community creation request?")) return;
    try {
      const res = await fetch(`/api/admin/community-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (res.ok) {
        showToast("Request Rejected");
        fetchData();
      }
    } catch {}
  };

  const handleDeleteRequest = async (id: string, name: string) => {
    if (!confirm(`Delete creation request for "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/community-requests/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Request deleted");
        fetchData();
      }
    } catch {}
  };

  const handleRegenerateInvite = async (requestIdOrCommId: string) => {
    setReinvitingId(requestIdOrCommId);
    try {
      const res = await fetch(`/api/admin/community-requests/${requestIdOrCommId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.activationUrl) {
          setDispatchData({
            communityName: data.name,
            subdomain: data.subdomain,
            adminName: data.adminName || "Admin",
            adminEmail: data.adminEmail || "",
            adminMobile: data.adminMobile || "",
            activationUrl: data.activationUrl,
            whatsappUrl: data.whatsappUrl,
          });
        } else {
          showToast("Admin account already active or link expired. Please regenerate via reset.");
        }
      }
    } catch {}
    setReinvitingId(null);
  };

  const getCommunityTypeBadge = (type?: string) => {
    switch (type) {
      case "college":
        return { label: "College / Campus", color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "alumni":
        return { label: "Alumni Network", color: "bg-violet-50 text-violet-700 border-violet-200" };
      case "cultural":
        return { label: "Cultural Clan", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "industry":
        return { label: "Industry Guild", color: "bg-indigo-50 text-indigo-700 border-indigo-200" };
      case "ngo":
        return { label: "NGO / Impact", color: "bg-rose-50 text-rose-700 border-rose-200" };
      default:
        return { label: "Community", color: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Verifying super admin security authorization...</span>
        </div>
      </div>
    );
  }

  // Unauthenticated Login Modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden font-sans">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between z-10 max-w-5xl mx-auto w-full">
          <a
            href="/"
            className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition-colors text-decoration-none"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>{t.backHome}</span>
          </a>
          <LanguageDropdown />
        </div>

        <div className="max-w-md w-full mx-auto my-auto z-10 py-10">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 mx-auto shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
              <h1 className="text-xl font-black text-white tracking-tight">Super Admin Portal</h1>
              <p className="text-xs text-slate-400">Restricted multi-tenant SaaS provisioning & control</p>
            </div>

            {loginError && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-xs flex items-center space-x-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Admin Username</label>
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Security Password</label>
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

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer border-0 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loggingIn ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Authenticate & Access Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

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

      {/* Comprehensive Edit Community Wizard Modal */}
      {editingCommunity && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-slate-200 space-y-6 relative my-8 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center space-x-2">
                    <span>Edit Community Wizard</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Updating configuration for <strong className="text-slate-800">{editingCommunity.name}</strong> ({editingCommunity.subdomain}.mysocialclan.com)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingCommunity(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { num: 1 as const, title: "Subdomain (Locked)" },
                { num: 2 as const, title: "Organization Info" },
                { num: 3 as const, title: "Admin Contact" },
                { num: 4 as const, title: "Modules & Status" },
              ].map((tab) => (
                <button
                  key={tab.num}
                  type="button"
                  onClick={() => setEditStep(tab.num)}
                  className={`flex items-center space-x-2 p-2 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                    editStep === tab.num
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-extrabold ${
                      editStep === tab.num ? "bg-white text-indigo-600" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {tab.num}
                  </div>
                  <span className="truncate">{tab.title}</span>
                </button>
              ))}
            </div>

            {editError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            {/* STEP 1: SUBDOMAIN */}
            {editStep === 1 && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-lg font-black text-slate-900">Community Subdomain Hostname</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Subdomains are permanent tenant identifiers bound to offline DB routing.
                  </p>
                </div>

                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-100/90 overflow-hidden opacity-90">
                  <input
                    type="text"
                    disabled
                    value={editSubdomain}
                    className="w-full px-4 py-3.5 bg-transparent text-sm font-mono font-bold text-slate-700 outline-none border-0"
                  />
                  <span className="px-4 py-3.5 bg-slate-200/80 border-l border-slate-200 text-xs font-mono font-bold text-indigo-700 whitespace-nowrap select-none shrink-0">
                    .mysocialclan.com
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditStep(2)}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-xs shadow-md border-0 cursor-pointer"
                  >
                    <span>Next: Organization Details</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ORG DETAILS & DYNAMIC TAXONOMY */}
            {editStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Community / Network Type
                    </label>
                    <select
                      value={editCommunityType}
                      onChange={(e) => setEditCommunityType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-indigo-600 cursor-pointer"
                    >
                      <option value="college">Colleges & Academic Institutions</option>
                      <option value="alumni">Alumni Associations</option>
                      <option value="cultural">Cultural & Clan Trusts</option>
                      <option value="industry">Industry & Trade Associations</option>
                      <option value="ngo">NGOs & Non-Profits</option>
                      <option value="custom">Custom Network</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Community Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={editWebsite}
                      onChange={(e) => setEditWebsite(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Description / Motto
                    </label>
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                {/* Dynamic Taxonomy 1 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Taxonomy 1 (e.g. Departments / Batches / Gotras)
                    </label>
                    <input
                      type="text"
                      value={editTaxonomy1Title}
                      onChange={(e) => setEditTaxonomy1Title(e.target.value)}
                      className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200 outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Comma-separated items (e.g. Computer Science, Mechanical, MBA)"
                    value={editTaxonomy1}
                    onChange={(e) => setEditTaxonomy1(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600"
                  />
                </div>

                {/* Dynamic Taxonomy 2 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Taxonomy 2 (e.g. Campus Blocks / Regional Hubs / Chapters)
                    </label>
                    <input
                      type="text"
                      value={editTaxonomy2Title}
                      onChange={(e) => setEditTaxonomy2Title(e.target.value)}
                      className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200 outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Comma-separated items (e.g. Main Academic Block, North Wing)"
                    value={editTaxonomy2}
                    onChange={(e) => setEditTaxonomy2(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setEditStep(1)}
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs border-0 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditStep(3)}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs border-0 cursor-pointer"
                  >
                    Next: Admin Contact
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ADMIN CONTACT */}
            {editStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Admin Full Name
                    </label>
                    <input
                      type="text"
                      value={editAdminName}
                      onChange={(e) => setEditAdminName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Admin Role / Designation
                    </label>
                    <input
                      type="text"
                      value={editAdminRole}
                      onChange={(e) => setEditAdminRole(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={editAdminEmail}
                      onChange={(e) => setEditAdminEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Admin Mobile / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={editAdminMobile}
                      onChange={(e) => setEditAdminMobile(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setEditStep(2)}
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs border-0 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditStep(4)}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs border-0 cursor-pointer"
                  >
                    Next: Modules & Status
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: MODULES & STATUS */}
            {editStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {[
                    { key: "directory" as const, label: "Verified Member / Student Directory", desc: "Private profiles, batch tags, roll-number verification, and campus feeds." },
                    { key: "opportunities" as const, label: "Internships, Career Referrals & Opportunities Hub", desc: "Campus drives, verified internships, and peer job referrals." },
                    { key: "calendar" as const, label: "Academic Calendar, Timelines & Schedules", desc: "Exam schedules, deadlines, hackathons, and fest calendars." },
                    { key: "booking" as const, label: "Labs, Auditoriums & Venue Bookings", desc: "Reserve campus labs, halls, and meeting spaces." },
                    { key: "events" as const, label: "Campus Notices & Announcements Hub", desc: "Official updates, fest announcements, and event RSVPs." },
                    { key: "donations" as const, label: "0% Fee Direct Contributions & Grants", desc: "Direct support for fests, clubs, and research grants." },
                  ].map((mod) => {
                    const isChecked = editModules[mod.key];
                    return (
                      <label
                        key={mod.key}
                        onClick={() => setEditModules({ ...editModules, [mod.key]: !isChecked })}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                          isChecked ? "bg-indigo-50/80 border-indigo-300 text-slate-900" : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold block">{mod.label}</span>
                          <span className="text-[10px] text-slate-500">{mod.desc}</span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            isChecked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-xs text-slate-800">Community Active Status</span>
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

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setEditStep(3)}
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs border-0 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={savingAdmin}
                    onClick={() => handleSaveCommunity()}
                    className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl border-0 cursor-pointer flex items-center space-x-2"
                  >
                    {savingAdmin ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Community Updates</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
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
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Pending Creation Requests */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              <h2 className="text-base font-black text-slate-900">
                Pending Creation Requests ({creationRequests.filter((r) => r.status === "pending").length})
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-6 text-xs text-slate-500">Loading requests...</div>
          ) : creationRequests.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">{t.noPendingRequests}</p>
          ) : (
            <div className="space-y-3">
              {creationRequests.map((req) => {
                const typeBadge = getCommunityTypeBadge(req.communityType);
                return (
                  <div
                    key={req._id}
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className="font-black text-slate-900 text-sm">{req.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${typeBadge.color}`}>
                          {typeBadge.label}
                        </span>
                        <span className="font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md text-[11px] border border-indigo-200/60">
                          {req.subdomain}.mysocialclan.com
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1.5">
                        Applicant: <strong className="text-slate-900">{req.adminName}</strong>
                        {req.adminRole && <span> ({req.adminRole})</span>}
                        <span> · Email: <strong className="text-indigo-700 font-mono text-[11px]">{req.adminEmail || "Email missing"}</strong></span>
                        <span> · Phone: <strong className="text-slate-900">{req.adminMobile}</strong></span>
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
                            className="py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl text-xs border-0 cursor-pointer disabled:opacity-50 flex items-center space-x-1.5"
                          >
                            {approvingId === req._id ? <span>Approving...</span> : <span>Approve & Provision</span>}
                          </button>
                          <button
                            onClick={() => handleRejectRequest(req._id)}
                            className="py-2 px-3 bg-slate-200 hover:bg-rose-100 text-slate-700 font-bold rounded-xl text-xs border-0 cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {req.status === "approved" && (
                        <>
                          <button
                            onClick={() => handleRegenerateInvite(req._id)}
                            disabled={reinvitingId === req._id}
                            className="py-2 px-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl border border-indigo-200 flex items-center space-x-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Re-Invite</span>
                          </button>

                          {req.whatsappUrl && (
                            <a
                              href={req.whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2 px-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200 flex items-center space-x-1.5 text-decoration-none"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          )}
                        </>
                      )}

                      <button
                        onClick={() => handleDeleteRequest(req._id, req.name)}
                        className="py-2 px-2.5 bg-slate-100 hover:bg-rose-100 text-slate-500 rounded-xl border border-slate-200 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Provisioned Active Communities */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900">
              Active Community Networks ({communities.length})
            </h2>
            <span className="text-xs text-slate-500 font-medium">Manage provisioned community admins & status</span>
          </div>

          {communities.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">{t.noCommunities}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((c) => {
                const typeBadge = getCommunityTypeBadge(c.communityType);
                return (
                  <div
                    key={c._id}
                    className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                          <span>{c.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeBadge.color}`}>
                            {typeBadge.label}
                          </span>
                        </h3>
                        <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60 shrink-0">
                          {c.subdomain}.mysocialclan.com
                        </span>
                      </div>

                      {c.description && <p className="text-xs text-slate-600">{c.description}</p>}

                      <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          <span className="flex items-center space-x-1">
                            <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Community Admin</span>
                          </span>
                          {c.adminRole && <span className="text-indigo-600 font-semibold">{c.adminRole}</span>}
                        </div>

                        <div className="flex items-center space-x-2 text-slate-900 font-bold">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{c.adminName || "Not assigned"}</span>
                        </div>

                        <div className="flex items-center space-x-2 text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium text-indigo-700 font-mono text-[11px]">
                            {c.adminEmail || "Email missing"}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{c.adminMobile || "Phone missing"}</span>
                        </div>
                      </div>
                    </div>

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
                          className="py-1.5 px-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleCommunityStatus(c)}
                          className={`py-1.5 px-2.5 font-bold rounded-xl border cursor-pointer ${
                            c.isActive !== false
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                          <span>{c.isActive !== false ? "Disable" : "Enable"}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteCommunity(c)}
                          className="py-1.5 px-2 bg-slate-100 hover:bg-rose-100 text-slate-500 rounded-xl border border-slate-200 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
