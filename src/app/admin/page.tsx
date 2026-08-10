"use client";

import React, { useState, useEffect } from "react";
import { Globe, Users, CheckCircle2, ShieldAlert, Heart, Building2, MapPin } from "lucide-react";

interface Community {
  _id: string;
  name: string;
  subdomain: string;
  description?: string;
  logo?: string;
  cities?: string[];
  gotras?: string[];
  kulDevis?: string[];
  upiId?: string;
  adminMobile?: string;
  isActive: boolean;
  createdAt: string;
}

interface CommunityRequestItem {
  _id: string;
  name: string;
  subdomain: string;
  description?: string;
  adminName: string;
  adminMobile: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function PlatformAdminPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [creationRequests, setCreationRequests] = useState<CommunityRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCommunities = async () => {
    try {
      const res = await fetch("/api/communities/public");
      if (res.ok) setCommunities(await res.json());
    } catch {}
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/admin/community-requests");
      if (res.ok) setCreationRequests(await res.json());
    } catch {}
  };

  useEffect(() => {
    Promise.all([fetchCommunities(), fetchRequests()]).finally(() => setLoading(false));
  }, []);

  const handleApproveRequest = async (reqId: string, provisionNow: boolean = true) => {
    try {
      const res = await fetch(`/api/admin/community-requests/${reqId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "approved",
          provisionNow,
        }),
      });
      if (res.ok) {
        showToast("Request approved & showcase community registered!");
        fetchRequests();
        fetchCommunities();
      }
    } catch {}
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
        fetchRequests();
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 font-sans">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-black animate-bounce">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h1 className="text-xl font-black text-slate-900">MySocialClan Platform Administration</h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">Standalone SaaS Platform Portal & Offline Provisioning Queue</p>
        </div>
        <a
          href="/"
          className="text-xs font-bold text-slate-600 hover:text-indigo-600 px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-decoration-none shadow-2xs hover:bg-slate-50 transition-colors"
        >
          ← Back to Homepage
        </a>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Pending Offline Creation Requests */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              <h2 className="text-base font-black text-slate-900">
                Pending Community Creation Requests ({creationRequests.filter((r) => r.status === "pending").length})
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-6 text-xs text-slate-500">Loading requests...</div>
          ) : creationRequests.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">No pending community creation requests.</p>
          ) : (
            <div className="space-y-3">
              {creationRequests.map((req) => (
                <div
                  key={req._id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-slate-900 text-sm">{req.name}</span>
                      <span className="font-mono text-indigo-600 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-md text-[11px] border border-indigo-200/60">
                        {req.subdomain}.mysocialclan.com
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1.5">
                      Applicant: <strong className="text-slate-900">{req.adminName}</strong> ({req.adminMobile})
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
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

                  {req.status === "pending" && (
                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => handleApproveRequest(req._id, true)}
                        className="py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-xl text-xs border-0 cursor-pointer transition-all shadow-md shadow-indigo-500/20"
                      >
                        Approve & Register
                      </button>
                      <button
                        onClick={() => handleRejectRequest(req._id)}
                        className="py-2 px-3 bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-700 font-bold rounded-xl text-xs border-0 cursor-pointer transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Provisioned Active Communities Showcase */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-black text-slate-900">Active Provisioned Communities ({communities.length})</h2>

          {communities.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">No provisioned communities registered yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((c) => (
                <div key={c._id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-sm">{c.name}</h3>
                    <span className="text-[10px] font-mono text-indigo-600 font-bold">{c.subdomain}.mysocialclan.com</span>
                  </div>
                  {c.description && <p className="text-xs text-slate-600">{c.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
