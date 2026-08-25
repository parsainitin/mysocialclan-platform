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
  MapPin,
  Plus,
  X,
  RotateCcw,
  GraduationCap,
  Award,
  Briefcase,
  HeartHandshake,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useLanguage, LanguageDropdown } from "@/context/LanguageContext";
import { COUNTRY_OPTIONS } from "@/lib/countryOptions";

export type CommunityTypeKey = "college" | "alumni" | "cultural" | "industry" | "ngo" | "custom";

interface CommunityTypeConfig {
  id: CommunityTypeKey;
  title: string;
  badge: string;
  icon: any;
  desc: string;
  nameLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  taxonomy1Title: string;
  defaultTaxonomy1Items: string[];
  taxonomy2Title: string;
  defaultTaxonomy2Items: string[];
  adminRoles: string[];
  defaultModules: {
    directory: boolean;
    opportunities: boolean;
    calendar: boolean;
    booking: boolean;
    events: boolean;
    donations: boolean;
    panchang: boolean;
    marketplace: boolean;
  };
  moduleLabels: {
    directory: { label: string; desc: string; icon: any };
    opportunities: { label: string; desc: string; icon: any };
    calendar: { label: string; desc: string; icon: any };
    booking: { label: string; desc: string; icon: any };
    events: { label: string; desc: string; icon: any };
    donations: { label: string; desc: string; icon: any };
  };
}

const COMMUNITY_TYPE_CONFIGS: Record<CommunityTypeKey, CommunityTypeConfig> = {
  college: {
    id: "college",
    title: "Colleges & Academic Institutions",
    badge: "Universities & Campuses",
    icon: GraduationCap,
    desc: "Department boards, student clubs, placement cell, internship & referral networks, and exam schedules.",
    nameLabel: "College / University Name *",
    namePlaceholder: "e.g. Stanford University / Indian Institute of Technology / Oxford College",
    emailPlaceholder: "e.g. dean.office@university.edu or admin@college.ac.in",
    taxonomy1Title: "Academic Departments & Batches",
    defaultTaxonomy1Items: [
      "Computer Science & Engg",
      "Data Science & AI",
      "Electronics & Comm",
      "Mechanical Engg",
      "MBA & Management",
      "Information Tech",
    ],
    taxonomy2Title: "Campus Blocks & Research Centers",
    defaultTaxonomy2Items: [
      "Main Academic Block",
      "Innovation & Lab Center",
      "North Campus Wing",
      "Central Auditorium",
    ],
    adminRoles: [
      "Dean / Principal",
      "Campus Placement Officer (TPO)",
      "Head of Department (HOD)",
      "Student Council President",
      "Faculty Administrator",
    ],
    defaultModules: {
      directory: true,
      opportunities: true,
      calendar: true,
      booking: true,
      events: true,
      donations: true,
      panchang: false,
      marketplace: false,
    },
    moduleLabels: {
      directory: {
        label: "Verified Student, Faculty & Alumni Directory",
        desc: "Private student profiles, batch tags, roll-number verification, and campus feeds.",
        icon: Users,
      },
      opportunities: {
        label: "Campus Placement, Internships & Career Referrals Hub",
        desc: "Share verified internship opportunities, campus drives, interview experiences, and peer job referrals.",
        icon: Briefcase,
      },
      calendar: {
        label: "Academic Calendar & Exam/Fest Timelines",
        desc: "Semester schedules, exam timetables, assignment deadlines, and hackathon dates.",
        icon: Calendar,
      },
      booking: {
        label: "Lab, Seminar Hall & Auditorium Bookings",
        desc: "Real-time reservation system for college auditoriums, computer labs, and conference rooms.",
        icon: Landmark,
      },
      events: {
        label: "Campus Notice Board & Student Club Announcements",
        desc: "Official dean notices, tech fests, cultural events, and club RSVP tracking.",
        icon: Megaphone,
      },
      donations: {
        label: "Fest Sponsorships, Club Funds & Alumni Grants",
        desc: "Direct 0% platform fee collections for campus clubs, annual fests, and research grants.",
        icon: Heart,
      },
    },
  },
  alumni: {
    id: "alumni",
    title: "Alumni Associations",
    badge: "Graduates & Mentors",
    icon: Award,
    desc: "Global graduation chapters, career mentorship, job referrals, reunion drives, and alumni registries.",
    nameLabel: "Alumni Association Name *",
    namePlaceholder: "e.g. Global Alumni Network / Harvard Alumni Association",
    emailPlaceholder: "e.g. alumni.relations@network.org",
    taxonomy1Title: "Graduation Batches & Programs",
    defaultTaxonomy1Items: [
      "Batch of 2024",
      "Batch of 2020",
      "Batch of 2015",
      "Batch of 2010",
      "MBA Cohort",
    ],
    taxonomy2Title: "Global Chapters & Regions",
    defaultTaxonomy2Items: [
      "Bay Area Chapter",
      "London & Europe Chapter",
      "Bangalore Chapter",
      "Singapore Chapter",
    ],
    adminRoles: [
      "Alumni Relations Director",
      "Alumni Association President",
      "Chapter Lead",
      "Alumni Coordinator",
    ],
    defaultModules: {
      directory: true,
      opportunities: true,
      calendar: true,
      booking: true,
      events: true,
      donations: true,
      panchang: false,
      marketplace: false,
    },
    moduleLabels: {
      directory: {
        label: "Global Alumni Directory & Career Registry",
        desc: "Verified graduate profiles, current company affiliations, and batch search.",
        icon: Users,
      },
      opportunities: {
        label: "Alumni Job Referrals & Mentorship Board",
        desc: "Direct employee referrals, 1-on-1 mentorship requests, and executive opportunities.",
        icon: Briefcase,
      },
      calendar: {
        label: "Reunion Schedules & Global Webinars",
        desc: "Annual alumni meets, homecoming dates, and keynote webinars.",
        icon: Calendar,
      },
      booking: {
        label: "Alumni Lounge & Event Venue Reservations",
        desc: "Book alumni clubhouses and reunion banquet spaces.",
        icon: Landmark,
      },
      events: {
        label: "Homecoming Fests & Regional Meetups",
        desc: "Official reunion RSVPs, chapter dinners, and networking drives.",
        icon: Megaphone,
      },
      donations: {
        label: "Alumni Endowment & Scholarship Fund",
        desc: "Direct donations towards university infrastructure and student scholarships.",
        icon: Heart,
      },
    },
  },
  cultural: {
    id: "cultural",
    title: "Cultural Clans & Regional Trusts",
    badge: "Heritage & Community",
    icon: Users,
    desc: "Community trusts, family directories, gotra lineages, cultural calendars, and community halls.",
    nameLabel: "Clan / Community Trust Name *",
    namePlaceholder: "e.g. Global Maheshwari Clan / Rajput Mahasabha / Heritage Foundation",
    emailPlaceholder: "e.g. trust.office@community.org",
    taxonomy1Title: "Gotras / Guild Chapters",
    defaultTaxonomy1Items: ["Chapter A", "Chapter B", "Chapter C", "Guild North", "Guild South"],
    taxonomy2Title: "KulDevis / Regional Hubs",
    defaultTaxonomy2Items: ["Primary Hub", "Secondary Hub", "Regional Board"],
    adminRoles: ["Community Trust President", "General Secretary", "Clan Coordinator", "Trustee"],
    defaultModules: {
      directory: true,
      opportunities: false,
      calendar: true,
      booking: true,
      events: true,
      donations: true,
      panchang: true,
      marketplace: true,
    },
    moduleLabels: {
      directory: {
        label: "Family & Community Member Directory",
        desc: "Verified member profiles, family lineage records, and elder badges.",
        icon: Users,
      },
      opportunities: {
        label: "Community Business & Classifieds Marketplace",
        desc: "Trusted member business directory, trade offers, and community services.",
        icon: ShoppingBag,
      },
      calendar: {
        label: "Cultural Panchang & Hijri Calendar",
        desc: "Auspicious tithis, festival timings, and regional observance alerts.",
        icon: Calendar,
      },
      booking: {
        label: "Community Hall & Venue Bookings",
        desc: "Reserve community dharamshalas, banquet halls, and meeting rooms.",
        icon: Landmark,
      },
      events: {
        label: "Cultural Festivals & Community Gatherings",
        desc: "Annual sabha notices, festival invitations, and RSVP management.",
        icon: Megaphone,
      },
      donations: {
        label: "Community Welfare & Trust Contributions",
        desc: "Direct support for trust welfare projects and community development.",
        icon: Heart,
      },
    },
  },
  industry: {
    id: "industry",
    title: "Industry & Trade Associations",
    badge: "Professional Syndicates",
    icon: Briefcase,
    desc: "Professional syndicates, trade associations, corporate alumni networks, and verified member directories.",
    nameLabel: "Industry Association Name *",
    namePlaceholder: "e.g. National Tech Guild / Healthcare Syndicate / Chamber of Commerce",
    emailPlaceholder: "e.g. secretariat@industryguild.org",
    taxonomy1Title: "Industry Sectors & Verticals",
    defaultTaxonomy1Items: [
      "Software & Tech",
      "Healthcare & Biotech",
      "Manufacturing",
      "Finance & Fintech",
      "Consulting",
    ],
    taxonomy2Title: "Regional Chapters & Zones",
    defaultTaxonomy2Items: ["National HQ", "North Zone Chapter", "West Zone Chapter", "Global Liaison"],
    adminRoles: [
      "Executive Director",
      "Association Secretary",
      "Trade Committee Lead",
      "Industry President",
    ],
    defaultModules: {
      directory: true,
      opportunities: true,
      calendar: true,
      booking: true,
      events: true,
      donations: true,
      panchang: false,
      marketplace: false,
    },
    moduleLabels: {
      directory: {
        label: "Verified Professional Directory",
        desc: "Credentialed industry members, company profiles, and executive credentials.",
        icon: Users,
      },
      opportunities: {
        label: "B2B Deals, RFPs & High-Value Job Openings",
        desc: "Post industry RFPs, trade contracts, and executive job openings.",
        icon: Briefcase,
      },
      calendar: {
        label: "Conference & Expo Timelines",
        desc: "Annual industry summits, trade expos, and regulatory deadlines.",
        icon: Calendar,
      },
      booking: {
        label: "Conference Rooms & Exhibition Booths",
        desc: "Reserve syndicate halls, booth spaces, and private boardrooms.",
        icon: Landmark,
      },
      events: {
        label: "Trade Summits & Networking Roundtables",
        desc: "Official association communiqués, webinars, and delegate RSVPs.",
        icon: Megaphone,
      },
      donations: {
        label: "Industry Development & Research Fund",
        desc: "Sponsorships and contributions for policy research and training.",
        icon: Heart,
      },
    },
  },
  ngo: {
    id: "ngo",
    title: "NGOs & Non-Profit Foundations",
    badge: "Social Impact",
    icon: HeartHandshake,
    desc: "Volunteer networks, donation drives with 0% fee, campaign coordination, and impact reports.",
    nameLabel: "NGO / Foundation Name *",
    namePlaceholder: "e.g. Hope Global Foundation / Clean Earth Initiative",
    emailPlaceholder: "e.g. contact@foundation.org",
    taxonomy1Title: "Causes & Initiative Wings",
    defaultTaxonomy1Items: [
      "Education & Literacy",
      "Healthcare Drives",
      "Environment & Green",
      "Disaster Relief",
      "Youth Empowerment",
    ],
    taxonomy2Title: "Field Units & Operation Centers",
    defaultTaxonomy2Items: ["Central Operations Hub", "Regional Field Unit A", "Regional Field Unit B"],
    adminRoles: ["Managing Trustee", "Program Director", "Volunteer Coordinator", "Founder"],
    defaultModules: {
      directory: true,
      opportunities: true,
      calendar: true,
      booking: true,
      events: true,
      donations: true,
      panchang: false,
      marketplace: false,
    },
    moduleLabels: {
      directory: {
        label: "Verified Volunteers & Donors Network",
        desc: "Volunteer profiles, skill sets, and contributor badges.",
        icon: Users,
      },
      opportunities: {
        label: "Volunteer Openings & NGO Partnerships",
        desc: "Post volunteer requirements, CSR partnerships, and grant requests.",
        icon: Briefcase,
      },
      calendar: {
        label: "Drive Dates & Campaign Timelines",
        desc: "Field drive schedules, training sessions, and campaign milestones.",
        icon: Calendar,
      },
      booking: {
        label: "Field Vehicles & Community Space Reservations",
        desc: "Reserve logistics equipment, relief centers, and workshop spaces.",
        icon: Landmark,
      },
      events: {
        label: "Volunteer Drives & Public Campaigns",
        desc: "Relief drives, fundraising galas, and volunteer attendance.",
        icon: Megaphone,
      },
      donations: {
        label: "Direct 0% Fee Impact Donations",
        desc: "Direct member donations into NGO bank/UPI with instant receipt records.",
        icon: Heart,
      },
    },
  },
  custom: {
    id: "custom",
    title: "Custom Community / Private Club",
    badge: "Flexible Network",
    icon: Layers,
    desc: "Tailored private social network with fully customizable modules for residential societies, clubs, and creator hubs.",
    nameLabel: "Community / Club Name *",
    namePlaceholder: "e.g. Palm Meadows Residents Club / Apex Creators Network",
    emailPlaceholder: "e.g. admin@mycommunity.com",
    taxonomy1Title: "Primary Sections / Categories",
    defaultTaxonomy1Items: ["Section A", "Section B", "Section C", "Core Group"],
    taxonomy2Title: "Regional Hubs / Units",
    defaultTaxonomy2Items: ["Main Unit", "Sub Unit 1", "Sub Unit 2"],
    adminRoles: ["Community Lead", "General Secretary", "Coordinator", "Founder"],
    defaultModules: {
      directory: true,
      opportunities: true,
      calendar: true,
      booking: true,
      events: true,
      donations: true,
      panchang: false,
      marketplace: true,
    },
    moduleLabels: {
      directory: {
        label: "Verified Member Feed & Directory",
        desc: "Private member profiles, badges, and verified network feeds.",
        icon: Users,
      },
      opportunities: {
        label: "Opportunities, Jobs & Referrals Hub",
        desc: "Community opportunities, career referrals, and collaboration boards.",
        icon: Briefcase,
      },
      calendar: {
        label: "Community Timelines & Calendar",
        desc: "Event schedules, key milestones, and group deadlines.",
        icon: Calendar,
      },
      booking: {
        label: "Facilities & Space Bookings",
        desc: "Community facility, room, and space reservations with instant approval.",
        icon: Landmark,
      },
      events: {
        label: "Announcements & Event RSVPs",
        desc: "Official broadcasts, community meetups, and RSVP tracking.",
        icon: Megaphone,
      },
      donations: {
        label: "Direct Member Support Payments",
        desc: "0% fee contributions directly into your organization's bank/UPI.",
        icon: Heart,
      },
    },
  },
};

export default function CreateClanPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Community Type & Subdomain
  const [communityType, setCommunityType] = useState<CommunityTypeKey>("college");
  const [subdomain, setSubdomain] = useState("");
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [subdomainError, setSubdomainError] = useState<string | null>(null);

  // Step 2: Community & Taxonomy Details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [primaryLanguage, setPrimaryLanguage] = useState<string>("en");
  const [countryCode, setCountryCode] = useState<string>("IN");
  const [selectedCities, setSelectedCities] = useState<string[]>(COUNTRY_OPTIONS[0].cities);
  const [customCityInput, setCustomCityInput] = useState<string>("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [upiId, setUpiId] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const subdomainInputRef = useRef<HTMLInputElement>(null);

  // Dynamic Taxonomies
  const [taxonomy1Title, setTaxonomy1Title] = useState(
    COMMUNITY_TYPE_CONFIGS.college.taxonomy1Title
  );
  const [taxonomy1Items, setTaxonomy1Items] = useState<string[]>(
    COMMUNITY_TYPE_CONFIGS.college.defaultTaxonomy1Items
  );
  const [newTaxonomy1Input, setNewTaxonomy1Input] = useState("");

  const [taxonomy2Title, setTaxonomy2Title] = useState(
    COMMUNITY_TYPE_CONFIGS.college.taxonomy2Title
  );
  const [taxonomy2Items, setTaxonomy2Items] = useState<string[]>(
    COMMUNITY_TYPE_CONFIGS.college.defaultTaxonomy2Items
  );
  const [newTaxonomy2Input, setNewTaxonomy2Input] = useState("");

  // Step 3: Admin Account
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminMobile, setAdminMobile] = useState("");
  const [adminRole, setAdminRole] = useState(
    COMMUNITY_TYPE_CONFIGS.college.adminRoles[0]
  );
  const [customRoleInput, setCustomRoleInput] = useState("");

  // Step 4: Modules Configuration
  const [modules, setModules] = useState({
    directory: true,
    opportunities: true,
    calendar: true,
    booking: true,
    events: true,
    donations: true,
    panchang: false,
    marketplace: false,
  });

  const [showAdvancedModules, setShowAdvancedModules] = useState(false);

  // Terms & Conditions State
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Step 5: Submission & Result
  const [submitting, setSubmitting] = useState(false);
  const [creationError, setCreationError] = useState<string | null>(null);
  const [createdCommunityName, setCreatedCommunityName] = useState<string | null>(null);

  const activeConfig = COMMUNITY_TYPE_CONFIGS[communityType];

  // When communityType changes, update default taxonomies, roles, and modules
  const handleCommunityTypeSelect = (type: CommunityTypeKey) => {
    setCommunityType(type);
    const cfg = COMMUNITY_TYPE_CONFIGS[type];
    setTaxonomy1Title(cfg.taxonomy1Title);
    setTaxonomy1Items([...cfg.defaultTaxonomy1Items]);
    setTaxonomy2Title(cfg.taxonomy2Title);
    setTaxonomy2Items([...cfg.defaultTaxonomy2Items]);
    setAdminRole(cfg.adminRoles[0]);
    setModules({ ...cfg.defaultModules });
  };

  useEffect(() => {
    subdomainInputRef.current?.focus();
    loadCountryCities("IN");
  }, []);

  const loadCountryCities = async (code: string) => {
    const countryObj = COUNTRY_OPTIONS.find((c) => c.code === code);
    const baseCities = countryObj ? [...countryObj.cities] : [];

    try {
      const res = await fetch(`/api/communities/cities?country=${encodeURIComponent(code)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.cities && Array.isArray(data.cities)) {
          data.cities.forEach((customCity: string) => {
            if (customCity && !baseCities.includes(customCity)) {
              baseCities.push(customCity);
            }
          });
        }
      }
    } catch {}

    setSelectedCities(baseCities);
  };

  const handleCountryChange = (newCode: string) => {
    setCountryCode(newCode);
    loadCountryCities(newCode);
  };

  const handleAddCustomCity = () => {
    const trimmed = customCityInput.trim();
    if (trimmed && !selectedCities.includes(trimmed)) {
      setSelectedCities([...selectedCities, trimmed]);
      setCustomCityInput("");
    }
  };

  const handleRemoveCity = (cityToRemove: string) => {
    setSelectedCities(selectedCities.filter((c) => c !== cityToRemove));
  };

  const handleRestoreDefaultCities = () => {
    loadCountryCities(countryCode);
  };

  const handleAddTaxonomy1 = () => {
    const trimmed = newTaxonomy1Input.trim();
    if (trimmed && !taxonomy1Items.includes(trimmed)) {
      setTaxonomy1Items([...taxonomy1Items, trimmed]);
      setNewTaxonomy1Input("");
    }
  };

  const handleRemoveTaxonomy1 = (item: string) => {
    setTaxonomy1Items(taxonomy1Items.filter((i) => i !== item));
  };

  const handleAddTaxonomy2 = () => {
    const trimmed = newTaxonomy2Input.trim();
    if (trimmed && !taxonomy2Items.includes(trimmed)) {
      setTaxonomy2Items([...taxonomy2Items, trimmed]);
      setNewTaxonomy2Input("");
    }
  };

  const handleRemoveTaxonomy2 = (item: string) => {
    setTaxonomy2Items(taxonomy2Items.filter((i) => i !== item));
  };

  // Debounced subdomain availability check
  useEffect(() => {
    if (step !== 1) return;
    const clean = subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!clean) {
      setSubdomainAvailable(null);
      setSubdomainError(null);
      setCheckingSubdomain(false);
      return;
    }

    setCheckingSubdomain(true);
    setSubdomainError(null);

    const controller = new AbortController();
    const abortTimeout = setTimeout(() => controller.abort(), 2000);

    const timer = setTimeout(() => {
      fetch(`/api/communities/check-subdomain?subdomain=${clean}`, { signal: controller.signal })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (data.available) {
            setSubdomainAvailable(true);
            setSubdomainError(null);
          } else {
            setSubdomainAvailable(false);
            setSubdomainError(data.error || "Subdomain is unavailable");
          }
        })
        .catch(() => {
          const reserved = ["www", "admin", "app", "api", "superadmin", "mail", "localhost", "mysocialclan"];
          if (reserved.includes(clean)) {
            setSubdomainAvailable(false);
            setSubdomainError(`Subdomain '${clean}' is reserved`);
          } else if (!/^[a-z0-9-]+$/.test(clean)) {
            setSubdomainAvailable(false);
            setSubdomainError("Subdomain can only contain lowercase letters, numbers, and hyphens");
          } else {
            setSubdomainAvailable(true);
            setSubdomainError(null);
          }
        })
        .finally(() => {
          clearTimeout(abortTimeout);
          setCheckingSubdomain(false);
        });
    }, 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(abortTimeout);
      controller.abort();
    };
  }, [subdomain, step]);

  const handleLogoUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("Logo image must be under 5MB");
      return;
    }
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRegisterCommunity = async () => {
    setSubmitting(true);
    setCreationError(null);

    try {
      const selectedCountryObj = COUNTRY_OPTIONS.find((c) => c.code === countryCode);

      const effectiveRole = adminRole === "Custom" ? customRoleInput.trim() : adminRole;

      const res = await fetch("/api/communities/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          subdomain: subdomain.trim().toLowerCase(),
          communityType,
          description: description.trim(),
          website: website.trim(),
          logo: logoPreview || undefined,
          primaryLanguage,
          country: selectedCountryObj?.label || countryCode,
          cities: selectedCities,

          taxonomy1Title: taxonomy1Title.trim(),
          taxonomy1Items,
          taxonomy2Title: taxonomy2Title.trim(),
          taxonomy2Items,

          gotras: taxonomy1Items,
          kulDevis: taxonomy2Items,

          upiId: upiId.trim(),
          modules,
          adminName: adminName.trim(),
          adminEmail: adminEmail.trim().toLowerCase(),
          adminMobile: adminMobile.trim(),
          adminRole: effectiveRole || "Administrator",
          termsAccepted: acceptedTerms,
        }),
      });

      const responseText = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(responseText);
      } catch {
        if (res.status === 504 || responseText.includes("504")) {
          throw new Error(
            "Server connection timed out (504 Gateway Timeout). Please verify MONGODB_URI connectivity or network whitelist."
          );
        }
        throw new Error(`Server returned status ${res.status}. Please try again later.`);
      }

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
    { num: 1, title: "Type & Subdomain" },
    { num: 2, title: "Network Details" },
    { num: 3, title: "Admin Contact" },
    { num: 4, title: "Select Modules" },
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
                Launch Private Community Network
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
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {/* Wizard Card Wrapper */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden">
          {/* Progress Bar Header */}
          {step < 5 && (
            <div className="bg-slate-50/80 border-b border-slate-100 p-5 sm:p-6">
              {/* Step Tab Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
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
                    <span className="truncate">{tab.title}</span>
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
            {/* STEP 1: COMMUNITY TYPE & SUBDOMAIN */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Choose Network Type & Subdomain</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    What type of private social network are you building?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Select your organization type. The platform will automatically customize modules,
                    departments, taxonomies, and permissions for your use-case.
                  </p>
                </div>

                {/* Community Type Cards */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    1. Select Community / Network Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(Object.keys(COMMUNITY_TYPE_CONFIGS) as CommunityTypeKey[]).map((key) => {
                      const cfg = COMMUNITY_TYPE_CONFIGS[key];
                      const Icon = cfg.icon;
                      const isSelected = communityType === key;
                      return (
                        <div
                          key={key}
                          onClick={() => handleCommunityTypeSelect(key)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                            isSelected
                              ? "bg-indigo-50/90 border-indigo-600 shadow-md ring-2 ring-indigo-500/20"
                              : "bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute top-3 right-3 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                          <div className="space-y-2">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                isSelected ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border border-slate-200"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-sm font-extrabold text-slate-900 block">
                                {cfg.title}
                              </span>
                              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md mt-0.5">
                                {cfg.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                              {cfg.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Subdomain Input */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    2. Choose Your Dedicated Subdomain *
                  </label>
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                    <input
                      ref={subdomainInputRef}
                      type="text"
                      placeholder={
                        communityType === "college"
                          ? "e.g. stanford, mit, iitdelhi, harvard"
                          : communityType === "alumni"
                          ? "e.g. oxford-alumni, stanford-grads"
                          : "e.g. apex-club, community"
                      }
                      value={subdomain}
                      onChange={(e) =>
                        setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                      }
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-transparent text-sm sm:text-base font-mono text-slate-900 placeholder:text-slate-400 outline-none border-0 min-w-0"
                      suppressHydrationWarning
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
                        <span>Checking subdomain availability...</span>
                      </p>
                    )}
                    {!checkingSubdomain && subdomainAvailable === true && (
                      <p className="text-xs text-emerald-600 font-bold flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4.5 h-4.5" />
                        <span>
                          Subdomain <strong>{subdomain}.mysocialclan.com</strong> is available!
                        </span>
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
                    <span>Continue to Organization Details</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: NETWORK & TAXONOMY DETAILS */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{activeConfig.title} Setup</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Network Profile & Structure
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Provide the official profile and organizational structure for{" "}
                    <strong>{subdomain}.mysocialclan.com</strong>.
                  </p>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Official Logo / Crest
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
                        <span className="text-indigo-600 font-bold block mb-1">Logo image selected!</span>
                      ) : (
                        <span className="font-medium block mb-1">Upload institution/community logo</span>
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

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {activeConfig.nameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={activeConfig.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    suppressHydrationWarning
                  />
                </div>

                {/* Website & Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Official Website (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://www.university.edu"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Description / Tagline
                    </label>
                    <input
                      type="text"
                      placeholder="Short motto, campus location, or description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Country & Language */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Country *
                    </label>
                    <select
                      value={countryCode}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all cursor-pointer"
                      suppressHydrationWarning
                    >
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Primary Interface Language
                    </label>
                    <select
                      value={primaryLanguage}
                      onChange={(e) => setPrimaryLanguage(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all cursor-pointer"
                      suppressHydrationWarning
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
                </div>

                {/* Dynamic Taxonomy 1 Editor (e.g. Academic Departments & Batches) */}
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{taxonomy1Title}</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {taxonomy1Items.length} items configured
                    </span>
                  </div>

                  {/* Active Chips */}
                  <div className="flex flex-wrap gap-2 min-h-[36px] items-center">
                    {taxonomy1Items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-indigo-200 text-indigo-900 text-xs font-bold shadow-2xs group"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTaxonomy1(item)}
                          className="w-4 h-4 rounded-full bg-slate-100 group-hover:bg-rose-500 group-hover:text-white text-slate-500 transition-colors flex items-center justify-center border-0 cursor-pointer text-[10px]"
                        >
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                        </button>
                      </span>
                    ))}
                    {taxonomy1Items.length === 0 && (
                      <span className="text-xs text-slate-400 italic">No entries added. Type below to add.</span>
                    )}
                  </div>

                  {/* Custom Input */}
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="text"
                      placeholder={`Add ${taxonomy1Title.toLowerCase()} (e.g. Computer Science, MBA)...`}
                      value={newTaxonomy1Input}
                      onChange={(e) => setNewTaxonomy1Input(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTaxonomy1();
                        }
                      }}
                      className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600 transition-all placeholder:text-slate-400"
                      suppressHydrationWarning
                    />
                    <button
                      type="button"
                      onClick={handleAddTaxonomy1}
                      disabled={!newTaxonomy1Input.trim()}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl border-0 cursor-pointer transition-all flex items-center space-x-1 shadow-2xs shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Taxonomy 2 Editor (e.g. Campus Blocks & Centers) */}
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                      <Landmark className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{taxonomy2Title}</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {taxonomy2Items.length} items configured
                    </span>
                  </div>

                  {/* Active Chips */}
                  <div className="flex flex-wrap gap-2 min-h-[36px] items-center">
                    {taxonomy2Items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-indigo-200 text-indigo-900 text-xs font-bold shadow-2xs group"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTaxonomy2(item)}
                          className="w-4 h-4 rounded-full bg-slate-100 group-hover:bg-rose-500 group-hover:text-white text-slate-500 transition-colors flex items-center justify-center border-0 cursor-pointer text-[10px]"
                        >
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                        </button>
                      </span>
                    ))}
                    {taxonomy2Items.length === 0 && (
                      <span className="text-xs text-slate-400 italic">No entries added. Type below to add.</span>
                    )}
                  </div>

                  {/* Custom Input */}
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="text"
                      placeholder={`Add ${taxonomy2Title.toLowerCase()} (e.g. Innovation Center, North Wing)...`}
                      value={newTaxonomy2Input}
                      onChange={(e) => setNewTaxonomy2Input(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTaxonomy2();
                        }
                      }}
                      className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600 transition-all placeholder:text-slate-400"
                      suppressHydrationWarning
                    />
                    <button
                      type="button"
                      onClick={handleAddTaxonomy2}
                      disabled={!newTaxonomy2Input.trim()}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl border-0 cursor-pointer transition-all flex items-center space-x-1 shadow-2xs shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* Cities & Locations */}
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Campus & Regional Cities</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRestoreDefaultCities}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center space-x-1 border-0 bg-transparent cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Defaults</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[36px] items-center">
                    {selectedCities.map((city) => (
                      <span
                        key={city}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-indigo-200 text-indigo-900 text-xs font-bold shadow-2xs group"
                      >
                        <span>{city}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCity(city)}
                          className="w-4 h-4 rounded-full bg-slate-100 group-hover:bg-rose-500 group-hover:text-white text-slate-500 transition-colors flex items-center justify-center border-0 cursor-pointer text-[10px]"
                        >
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add custom city (e.g. Boston, Cambridge, New Delhi)..."
                      value={customCityInput}
                      onChange={(e) => setCustomCityInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomCity();
                        }
                      }}
                      className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600 transition-all placeholder:text-slate-400"
                      suppressHydrationWarning
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomCity}
                      disabled={!customCityInput.trim()}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl border-0 cursor-pointer transition-all flex items-center space-x-1 shadow-2xs shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add City</span>
                    </button>
                  </div>
                </div>

                {/* Direct Payment / UPI ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Direct Payment / Fest / Donation Account ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. college.events@bank / payments@institution.org"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    suppressHydrationWarning
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    0% platform fee direct member support directly to your institution account.
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs border-0 cursor-pointer transition-colors"
                  >
                    Back
                  </button>
                  <button
                    disabled={!name.trim()}
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-xl font-extrabold text-xs border-0 cursor-pointer shadow-md shadow-indigo-500/20 transition-all flex items-center space-x-1.5"
                  >
                    <span>Next: Admin Account</span>
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
                    <span>Designated Administrator</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Administrator Profile & Role
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    The designated administrator receives primary authority and will be provisioned
                    an activation link for initial network governance.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Administrator Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Shah / Prof. John Smith / Sarah Adams"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    suppressHydrationWarning
                  />
                </div>

                {/* Admin Designation / Role */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Designation / Organizational Role *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    {activeConfig.adminRoles.map((role) => (
                      <button
                        type="button"
                        key={role}
                        onClick={() => setAdminRole(role)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                          adminRole === role
                            ? "bg-indigo-50 border-indigo-600 text-indigo-900 ring-2 ring-indigo-500/20"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setAdminRole("Custom")}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        adminRole === "Custom"
                          ? "bg-indigo-50 border-indigo-600 text-indigo-900 ring-2 ring-indigo-500/20"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Other / Custom Role...
                    </button>
                  </div>
                  {adminRole === "Custom" && (
                    <input
                      type="text"
                      placeholder="Enter custom designation (e.g. Campus Coordinator, Trustee)"
                      value={customRoleInput}
                      onChange={(e) => setCustomRoleInput(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-indigo-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-600 transition-all"
                      suppressHydrationWarning
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Official Admin Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={activeConfig.emailPlaceholder}
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    suppressHydrationWarning
                  />
                  {adminEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail.trim()) && (
                    <p className="text-[11px] text-rose-500 font-semibold mt-1">
                      Please enter a valid email address (e.g., admin@domain.com)
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 555-0199 or +91 98765 43210"
                    value={adminMobile}
                    onChange={(e) => setAdminMobile(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    suppressHydrationWarning
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Your direct activation link will be delivered via WhatsApp and email.
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs border-0 cursor-pointer transition-colors"
                  >
                    Back
                  </button>
                  <button
                    disabled={
                      !adminName.trim() ||
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail.trim()) ||
                      !adminMobile.trim()
                    }
                    onClick={() => setStep(4)}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-xl font-extrabold text-xs border-0 cursor-pointer shadow-md shadow-indigo-500/20 transition-all flex items-center space-x-1.5"
                  >
                    <span>Next: Select Modules</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: MODULE CONFIGURATION & PRIVACY */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Modular Feature Selector</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Enable Modules for {name || "Your Network"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Select exactly which features to activate for your community. Irrelevant modules
                    have been auto-excluded, and you can toggle each one freely.
                  </p>
                </div>

                {creationError && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-xs font-semibold">
                    {creationError}
                  </div>
                )}

                <div className="space-y-3">
                  {[
                    {
                      key: "directory" as const,
                      ...activeConfig.moduleLabels.directory,
                    },
                    {
                      key: "opportunities" as const,
                      ...activeConfig.moduleLabels.opportunities,
                    },
                    {
                      key: "calendar" as const,
                      ...activeConfig.moduleLabels.calendar,
                    },
                    {
                      key: "booking" as const,
                      ...activeConfig.moduleLabels.booking,
                    },
                    {
                      key: "events" as const,
                      ...activeConfig.moduleLabels.events,
                    },
                    {
                      key: "donations" as const,
                      ...activeConfig.moduleLabels.donations,
                    },
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
                          <div
                            className={`p-2.5 rounded-xl ${
                              isChecked ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-sm font-bold block">{mod.label}</span>
                            <span className="text-xs text-slate-500">{mod.desc}</span>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 ml-3 ${
                            isChecked
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Optional Advanced Modules toggle */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedModules(!showAdvancedModules)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1.5 border-0 bg-transparent cursor-pointer p-0"
                  >
                    <span>
                      {showAdvancedModules
                        ? "Hide additional specialized modules"
                        : "Show additional specialized modules (Panchang, Classifieds...)"}
                    </span>
                    {showAdvancedModules ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {showAdvancedModules && (
                    <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-in fade-in duration-150">
                      <label
                        onClick={() => setModules({ ...modules, panchang: !modules.panchang })}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            Cultural Panchang & Regional Lunar Calendar
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Traditional Hindu Panchang & Islamic Hijri tithis/timings.
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={modules.panchang}
                          onChange={() => {}}
                          className="w-4 h-4 text-indigo-600 rounded"
                        />
                      </label>

                      <label
                        onClick={() => setModules({ ...modules, marketplace: !modules.marketplace })}
                        className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-200/60"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            General Member Classifieds & Buy/Sell Listings
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Local member-to-member classifieds and business directory.
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={modules.marketplace}
                          onChange={() => {}}
                          className="w-4 h-4 text-indigo-600 rounded"
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Terms & Conditions Acceptance */}
                <div className="p-4 bg-amber-50/80 border border-amber-200/90 rounded-2xl space-y-2">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs text-slate-800 leading-relaxed font-medium">
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setShowTermsModal(true)}
                        className="font-bold text-indigo-600 hover:text-indigo-800 underline border-0 bg-transparent cursor-pointer p-0"
                      >
                        Terms & Conditions and Member Data Privacy Policy
                      </button>{" "}
                      for creating and administering this verified private network. *
                    </span>
                  </label>
                  <p className="text-[11px] text-amber-800/90 font-semibold pl-7">
                    <strong>Mandatory:</strong> Personal member/student data privacy, consent, and
                    department management are the designated responsibility of the network administrator.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs border-0 cursor-pointer transition-colors"
                  >
                    Back
                  </button>
                  <button
                    disabled={submitting || !acceptedTerms}
                    onClick={handleRegisterCommunity}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-xl font-black text-xs shadow-lg shadow-indigo-600/25 border-0 cursor-pointer transition-all flex items-center space-x-2"
                  >
                    {submitting ? (
                      <span>Submitting Provisioning Request...</span>
                    ) : (
                      <>
                        <span>Submit & Provision Network</span>
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

                <h2 className="text-2xl font-black text-slate-900">Network Created Successfully!</h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your private social network request for <strong>{createdCommunityName}</strong> (
                  <span className="capitalize">{communityType}</span> Network) has been registered.
                </p>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3 max-w-md mx-auto">
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                      Assigned Subdomain URL
                    </div>
                    <div className="text-sm font-mono text-indigo-600 font-bold overflow-hidden text-ellipsis">
                      {subdomain}.mysocialclan.com
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Network Type:</span>
                      <span className="font-bold text-slate-800 capitalize">{communityType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Admin Contact:</span>
                      <span className="font-bold text-slate-800">{adminEmail}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                    <Lock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>
                      Our platform team will provision your <strong>dedicated database & subdomain hosting</strong> and dispatch your activation link to <strong>{adminMobile}</strong>!
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <a
                    href="/"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-black text-xs border-0 text-decoration-none transition-all shadow-lg shadow-indigo-600/25"
                  >
                    Done - Return to Platform Home
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Terms & Conditions Modal Pop-up */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-5 relative my-8 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-black text-slate-900">
                  Terms of Service & Data Privacy Policy
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center border-0 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 text-xs text-slate-600 space-y-4 leading-relaxed font-normal">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. Private Network Administration</h4>
                <p>
                  By creating a private social network on MySocialClan, you represent that you are an
                  authorized representative (Dean, Placement Officer, Trustee, Executive Lead, or
                  Coordinator) of the respective college, alumni association, or organization.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. Member Data Privacy & Consent</h4>
                <p>
                  As the designated Community Admin, you explicitly represent and warrant that all
                  personal data, student directories, phone numbers, email addresses, department
                  records, and member media uploaded into this platform are collected with the express
                  knowledge and consent of the respective individuals.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">3. Zero Platform Fee Guarantee</h4>
                <p>
                  Direct institutional contributions, fest sponsorships, and department grants go 100%
                  directly to your organization bank/UPI account with zero platform commission or hidden cut.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">4. Community Content & Moderation</h4>
                <p>
                  The community administrator retains the full authority and responsibility to moderate
                  discussions, job postings, notice board broadcasts, and membership approvals.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setAcceptedTerms(true);
                  setShowTermsModal(false);
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs border-0 cursor-pointer shadow-sm transition-all"
              >
                I Understand & Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
