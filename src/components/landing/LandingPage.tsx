"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Users,
  Sparkles,
  CheckCircle2,
  Plus,
  ChevronRight,
  Building2,
  Calendar,
  ShoppingBag,
  Heart,
  Landmark,
  Megaphone,
  ArrowRight,
  ExternalLink,
  Share2,
  ShieldCheck,
  Activity,
  Award,
  GraduationCap,
  Briefcase,
  UserCheck,
  Languages,
  Shield,
  Sliders,
  DollarSign,
  HeartHandshake,
} from "lucide-react";

interface CommunityPublic {
  _id: string;
  name: string;
  subdomain: string;
  description?: string;
  logo?: string;
  cities?: string[];
  createdAt: string;
}

type SupportedLang = "en" | "es" | "fr" | "de" | "ja" | "pt" | "fil";

const translations: Record<
  SupportedLang,
  {
    badge: string;
    heroTitle: string;
    minutes: string;
    heroDesc: string;
    buildSubdomain: string;
    exploreCommunities: string;
    verifiedBadge: string;
    verifiedSub: string;
    audiencesBadge: string;
    audiencesTitle: string;
    audiencesSubtitle: string;
    whyClosedBadge: string;
    whyClosedTitle: string;
    whyClosedSubtitle: string;
    langAgnosticBadge: string;
    langAgnosticTitle: string;
    langAgnosticDesc: string;
    modulesBadge: string;
    modulesTitle: string;
    modulesSubtitle: string;
    showcaseBadge: string;
    showcaseTitle: string;
    createClan: string;
    superAdmin: string;
  }
> = {
  en: {
    badge: "Language-Agnostic SaaS Platform for Global Communities & Institutions",
    heroTitle: "Launch Your Private Social Network in",
    minutes: "Minutes",
    heroDesc:
      "Empower your college, alumni network, industry association, social group, or NGO with a verified private network — featuring member directories, social feeds, event RSVPs, venue bookings, and cultural calendars under your custom subdomain.",
    buildSubdomain: "Build Community Subdomain",
    exploreCommunities: "Explore Live Communities",
    verifiedBadge: "100% Verified Closed Networks",
    verifiedSub: "Trusted by colleges, alumni & international trusts",
    audiencesBadge: "Target Audiences",
    audiencesTitle: "Tailored for Every Type of Network",
    audiencesSubtitle:
      "Powering private, high-trust social connection across educational institutions, professional bodies, global associations, and non-profits.",
    whyClosedBadge: "Closed Network Advantage",
    whyClosedTitle: "Why Choose a Closed Network Over Public Social Platforms?",
    whyClosedSubtitle:
      "Public social platforms prioritize ad tracking, viral clickbait, and public data harvesting. MySocialClan provides a high-trust, ad-free sanctuary built exclusively for your community.",
    langAgnosticBadge: "Language-Agnostic Platform",
    langAgnosticTitle: "Operate Comfortably in Any International Language",
    langAgnosticDesc:
      "MySocialClan is 100% language-agnostic. Whether your global members converse in English, Spanish, French, German, Japanese, Portuguese, Filipino, or any script, your community feed adapts seamlessly.",
    modulesBadge: "Social Engine Modules",
    modulesTitle: "Powerful Features Included",
    modulesSubtitle: "Configure exactly which engagement tools your organization needs.",
    showcaseBadge: "Live Community Network",
    showcaseTitle: "Active Clans & Organizations",
    createClan: "Create Clan",
    superAdmin: "Super Admin Portal",
  },
  es: {
    badge: "Plataforma SaaS Multilingüe para Comunidades e Instituciones Globales",
    heroTitle: "Cree su Red Social Privada en tan solo",
    minutes: "Minutos",
    heroDesc:
      "Potencie su universidad, red de exalumnos, asociación industrial, grupo social o ONG con una red privada verificada bajo su propio subdominio.",
    buildSubdomain: "Crear Subdominio",
    exploreCommunities: "Explorar Comunidades",
    verifiedBadge: "Redes Privadas 100% Verificadas",
    verifiedSub: "Confianza garantizada para instituciones y exalumnos",
    audiencesBadge: "Audiencias Objetivo",
    audiencesTitle: "Diseñado para Todo Tipo de Organizaciones",
    audiencesSubtitle: "Conectando instituciones educativas, gremios profesionales, grupos culturales y ONGs.",
    whyClosedBadge: "Ventajas de una Red Cerrada",
    whyClosedTitle: "¿Por qué elegir una Red Privada Cerrada frente a Redes Públicas?",
    whyClosedSubtitle:
      "Las redes públicas rastrean datos y muestran publicidad masiva. MySocialClan ofrece un espacio seguro, privado y sin anuncios.",
    langAgnosticBadge: "Plataforma Independiente del Idioma",
    langAgnosticTitle: "Opere Cómodamente en Cualquier Idioma Internacional",
    langAgnosticDesc:
      "MySocialClan es 100% independiente del idioma. Sus miembros pueden publicar y comunicarse en español, inglés, francés, alemán, japonés, portugués o filipino.",
    modulesBadge: "Módulos Sociales",
    modulesTitle: "Características Potentes Incluidas",
    modulesSubtitle: "Configure exactamente las herramientas que necesita.",
    showcaseBadge: "Redes en Vivo",
    showcaseTitle: "Comunidades Activas",
    createClan: "Crear Clan",
    superAdmin: "Portal Super Admin",
  },
  fr: {
    badge: "Plateforme SaaS Multilingue pour Communautés et Institutions Globales",
    heroTitle: "Lancez votre réseau social privé en quelques",
    minutes: "Minutes",
    heroDesc:
      "Offrez à votre université, réseau d'anciens élèves, association professionnelle ou ONG un réseau privé sécurisé sous votre sous-domaine personnalisé.",
    buildSubdomain: "Créer un sous-domaine",
    exploreCommunities: "Explorer les communautés",
    verifiedBadge: "Réseaux privés 100% vérifiés",
    verifiedSub: "Adopté par les universités et réseaux d'anciens élèves",
    audiencesBadge: "Publics cibles",
    audiencesTitle: "Conçu pour tous les types d'organisations",
    audiencesSubtitle: "Connectez vos étudiants, réseaux d'anciens élèves, guildes et associations.",
    whyClosedBadge: "Avantage du réseau fermé",
    whyClosedTitle: "Pourquoi choisir un réseau fermé plutôt que des réseaux publics ?",
    whyClosedSubtitle:
      "Les réseaux publics exploitent les données des utilisateurs. MySocialClan offre un espace privé, sans publicité et sécurisé.",
    langAgnosticBadge: "Plateforme indépendante de la langue",
    langAgnosticTitle: "Fonctionne dans toutes les langues internationales",
    langAgnosticDesc:
      "MySocialClan s'adapte à n'importe quelle langue internationale : français, anglais, espagnol, allemand, japonais, portugais, filipino, etc.",
    modulesBadge: "Modules sociaux",
    modulesTitle: "Fonctionnalités puissantes incluses",
    modulesSubtitle: "Configurez les outils adaptés à vos besoins.",
    showcaseBadge: "Réseaux en direct",
    showcaseTitle: "Communautés actives",
    createClan: "Créer un clan",
    superAdmin: "Portail Super Admin",
  },
  de: {
    badge: "Sprachenunabhängige SaaS-Plattform für globale Gemeinschaften",
    heroTitle: "Starten Sie Ihr privates soziales Netzwerk in",
    minutes: "Minuten",
    heroDesc:
      "Ermöglichen Sie Ihrer Hochschule, Ihrem Alumni-Netzwerk, Branchenverband oder Ihrer NGO ein verifiziertes privates Netzwerk unter Ihrer eigenen Subdomain.",
    buildSubdomain: "Subdomain erstellen",
    exploreCommunities: "Live-Communities erkunden",
    verifiedBadge: "100% verifizierte geschlossene Netzwerke",
    verifiedSub: "Vertraut von Universitäten und internationalen Netzwerken",
    audiencesBadge: "Zielgruppen",
    audiencesTitle: "Maßgeschneidert für jede Art von Netzwerk",
    audiencesSubtitle: "Verbindet Bildungseinrichtungen, Berufsverbände und gemeinnützige Organisationen.",
    whyClosedBadge: "Vorteile eines geschlossenen Netzwerks",
    whyClosedTitle: "Warum ein geschlossenes Netzwerk statt öffentlicher Plattformen?",
    whyClosedSubtitle:
      "Öffentliche Plattformen nutzen Nutzerdaten für Werbung. MySocialClan bietet einen werbefreien, geschützten Raum für Ihre Community.",
    langAgnosticBadge: "Sprachenunabhängige Plattform",
    langAgnosticTitle: "Nativ in jeder internationalen Sprache nutzbar",
    langAgnosticDesc:
      "MySocialClan ist vollständig sprachenunabhängig und unterstützt Deutsch, Englisch, Spanisch, Französisch, Japanisch, Portugiesisch und Filipino.",
    modulesBadge: "Soziale Module",
    modulesTitle: "Leistungsstarke Funktionen enthalten",
    modulesSubtitle: "Konfigurieren Sie genau die Tools, die Sie benötigen.",
    showcaseBadge: "Live-Netzwerk",
    showcaseTitle: "Aktive Communities",
    createClan: "Clan erstellen",
    superAdmin: "Super Admin Portal",
  },
  ja: {
    badge: "グローバルコミュニティおよび機関向け言語非依存SaaSプラットフォーム",
    heroTitle: "プライベートなSNSをわずか数",
    minutes: "分で開設",
    heroDesc:
      "大学、同窓会、業界団体、ソーシャルグループ、NGO向けに、専用サブドメイン下で認証付きプライベートネットワークを提供します。",
    buildSubdomain: "サブドメインを作成",
    exploreCommunities: "ライブコミュニティを見る",
    verifiedBadge: "100%認証済み非公開ネットワーク",
    verifiedSub: "大学や世界的な同窓会組織が信頼する安全なプラットフォーム",
    audiencesBadge: "対象組織",
    audiencesTitle: "あらゆる組織の形態に対応",
    audiencesSubtitle: "教育機関、専門団体、同窓会、NPOのプライベートな交流を支援します。",
    whyClosedBadge: "非公開ネットワークの強み",
    whyClosedTitle: "パブリックSNSではなく非公開ネットワークを選ぶ理由",
    whyClosedSubtitle:
      "パブリックSNSは広告追跡と拡散アルゴリズムを優先します。MySocialClanは広告のない安全で信頼性の高い環境を提供します。",
    langAgnosticBadge: "言語非依存プラットフォーム",
    langAgnosticTitle: "あらゆる国際言語で快適に運用",
    langAgnosticDesc:
      "日本語、英語、フィリピン語、ポルトガル語、スペイン語、フランス語、ドイツ語など、グローバルな言語に完全対応しています。",
    modulesBadge: "ソーシャル機能",
    modulesTitle: "充実したモジュール機能",
    modulesSubtitle: "組織のニーズに合わせて必要な機能を自由に設定できます。",
    showcaseBadge: "ライブネットワーク",
    showcaseTitle: "アクティブなコミュニティ",
    createClan: "クランを作成",
    superAdmin: "スーパー管理者ポータル",
  },
  pt: {
    badge: "Plataforma SaaS Multilíngue para Comunidades e Instituições Globais",
    heroTitle: "Crie sua Rede Social Privada em apenas",
    minutes: "Minutos",
    heroDesc:
      "Capacite sua universidade, rede de ex-alunos, associação comercial, grupo social ou ONG com uma rede privada verificada no seu próprio subdomínio.",
    buildSubdomain: "Criar Subdomínio",
    exploreCommunities: "Explorar Comunidades",
    verifiedBadge: "Redes Privadas 100% Verificadas",
    verifiedSub: "Confiança garantida para faculdades, ex-alunos e associações",
    audiencesBadge: "Públicos-Alvo",
    audiencesTitle: "Projetado para Todos os Tipos de Organizações",
    audiencesSubtitle: "Conectando instituições de ensino, associações profissionais, grupos culturais e ONGs.",
    whyClosedBadge: "Vantagens da Rede Fechada",
    whyClosedTitle: "Por que escolher uma Rede Privada Fechada em vez de Redes Públicas?",
    whyClosedSubtitle:
      "Plataformas públicas rastreiam dados e exibem anúncios. O MySocialClan oferece um espaço seguro, privado e livre de anúncios construído para sua comunidade.",
    langAgnosticBadge: "Plataforma Independente de Idioma",
    langAgnosticTitle: "Opere em Qualquer Idioma Internacional",
    langAgnosticDesc:
      "O MySocialClan suporta nativamente português do Brasil, inglês, espanhol, francês, alemão, japonês, filipino e qualquer outro idioma internacional.",
    modulesBadge: "Módulos Sociais",
    modulesTitle: "Recursos Potentes Incluídos",
    modulesSubtitle: "Configure exatamente as ferramentas que sua organização precisa.",
    showcaseBadge: "Redes em Destaque",
    showcaseTitle: "Comunidades Ativas",
    createClan: "Criar Clan",
    superAdmin: "Portal Super Admin",
  },
  fil: {
    badge: "Platform na Hindi Nakadepende sa Wika para sa mga Pandaigdigang Komunidad",
    heroTitle: "Simulan ang Iyong Pribadong Social Network sa Loob Lamang ng Ilang",
    minutes: "Minuto",
    heroDesc:
      "Bigyan ng kapangyarihan ang iyong kolehiyo, alumni network, asosasyon, o NGO gamit ang isang na-verify na pribadong network sa ilalim ng iyong sariling subdomain.",
    buildSubdomain: "Gumawa ng Subdomain",
    exploreCommunities: "Tuklasin ang mga Komunidad",
    verifiedBadge: "100% Na-verify na Pribadong Network",
    verifiedSub: "Pinagkakatiwalaan ng mga kolehiyo at alumni network",
    audiencesBadge: "Mga Target na Grupo",
    audiencesTitle: "Idinisenyo para sa Lahat ng Uri ng Organisasyon",
    audiencesSubtitle:
      "Paghahatid ng pribado at ligtas na koneksyon sa mga institusyong pang-edukasyon, propesyonal na grupo, at NGO.",
    whyClosedBadge: "Kalamangan ng Pribadong Network",
    whyClosedTitle: "Bakit Piliin ang Pribadong Network Kaysa sa Pampublikong Social Media?",
    whyClosedSubtitle:
      "Ang mga pampublikong platform ay nagpapakita ng mga ad at nag-oorganisa ng data. Ang MySocialClan ay nagbibigay ng ligtas at walang ad na lugar para sa iyong komunidad.",
    langAgnosticBadge: "Platform na Suportado ang Lahat ng Wika",
    langAgnosticTitle: "Gumana nang Kumportable sa Anumang Wikang Pandaigdig",
    langAgnosticDesc:
      "100% hindi nakadepende sa wika ang MySocialClan. Ang iyong mga miyembro ay makakapag-usap sa Filipino, Ingles, Hapon, Portuges, Espanyol, at higit pa.",
    modulesBadge: "Mga Modyul ng Social Engine",
    modulesTitle: "Kasama ang mga Makapangyarihang Tampok",
    modulesSubtitle: "I-configure ang eksaktong mga tool na kailangan ng iyong organisasyon.",
    showcaseBadge: "Live na Network ng Komunidad",
    showcaseTitle: "Mga Aktibong Clan at Organisasyon",
    createClan: "Lumikha ng Clan",
    superAdmin: "Super Admin Portal",
  },
};

export default function LandingPage() {
  const [communities, setCommunities] = useState<CommunityPublic[]>([]);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const [lang, setLang] = useState<SupportedLang>("en");

  const t = translations[lang] || translations.en;

  // Load public communities for live showcase
  useEffect(() => {
    fetch("/api/communities/public")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCommunities(data);
      })
      .catch(() => {})
      .finally(() => setLoadingCommunities(false));
  }, []);

  const targetAudiences = [
    {
      id: "colleges",
      title: "Colleges & Institutions",
      icon: GraduationCap,
      color: "from-blue-500 to-indigo-600",
      desc: "Department boards, student clubs, campus event hubs, placement cells, and academic notifications.",
    },
    {
      id: "alumni",
      title: "Alumni Associations",
      icon: Award,
      color: "from-indigo-600 to-violet-600",
      desc: "Global graduation chapters, career mentorship, reunion drives, career referrals, and alumni registries.",
    },
    {
      id: "industry",
      title: "Industry & Trade Guilds",
      icon: Briefcase,
      color: "from-violet-600 to-purple-600",
      desc: "Professional syndicates, trade associations, corporate alumni networks, and verified member directories.",
    },
    {
      id: "social",
      title: "Social Groups & Cultural Clans",
      icon: Users,
      color: "from-emerald-500 to-teal-600",
      desc: "Community trusts, cultural event RSVPs, member directories, and family trees.",
    },
    {
      id: "ngos",
      title: "NGOs & Non-Profits",
      icon: HeartHandshake,
      color: "from-pink-500 to-rose-600",
      desc: "Volunteer coordination, fundraising campaigns, direct zero-fee member donations, and impact news.",
    },
  ];

  const closedNetworkBenefits = [
    {
      icon: Shield,
      title: "100% Data Privacy & No Algorithmic Tracking",
      desc: "Unlike public social networks that sell user activity for ads, your clan's data is strictly private and never indexed by external search engines.",
    },
    {
      icon: UserCheck,
      title: "Mandatory Admin Verification & Zero Spammers",
      desc: "Every member is verified by clan admins before gaining access. Eliminates anonymous trolls, fake profiles, and unwanted sales bots.",
    },
    {
      icon: Sliders,
      title: "Distraction-Free Community Feed",
      desc: "No viral clickbait algorithms, doomscrolling traps, or third-party sponsored ads competing for members' attention.",
    },
    {
      icon: Globe,
      title: "Dedicated Custom Subdomain Branding",
      desc: "Own your independent digital ecosystem under your custom subdomain (e.g. yourclan.mysocialclan.com) with full logo branding.",
    },
    {
      icon: DollarSign,
      title: "Direct Member Support Payments (0% Fee)",
      desc: "Collect member dues, event tickets, or charitable contributions directly into your organization's account with zero middleman fees.",
    },
  ];

  const moduleItems = [
    {
      key: "directory" as const,
      title: "Verified Member Feed & Directory",
      desc: "Private member profiles, family connection trees, occupation filters, and verified identity badges.",
      icon: Users,
    },
    {
      key: "marketplace" as const,
      title: "Social Business & Skill Hub",
      desc: "Community marketplace, local business listings, job referrals, and member service showcases.",
      icon: ShoppingBag,
    },
    {
      key: "panchang" as const,
      title: "Community Calendar & Event Schedule",
      desc: "Daily updates, auspicious schedules, community timelines, and festival alerts.",
      icon: Calendar,
    },
    {
      key: "booking" as const,
      title: "Venue & Event Space Bookings",
      desc: "Reserve community halls, guest rooms, and event spaces with real-time availability calendar.",
      icon: Landmark,
    },
    {
      key: "events" as const,
      title: "Announcements & Discussion Hubs",
      desc: "Broadcast official updates, manage event RSVPs, post social updates, and foster member engagement.",
      icon: Megaphone,
    },
    {
      key: "donations" as const,
      title: "Instant Direct Member Support",
      desc: "Collect member contributions and donations directly into community accounts with 0% platform fees.",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-indigo-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[32rem] h-[32rem] bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 p-0.5 shadow-md shadow-indigo-500/20">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-900 bg-clip-text text-transparent">
                MySocialClan
              </span>
              <span className="hidden sm:inline-block ml-2.5 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-indigo-50 border border-indigo-200/80 text-indigo-700 rounded-full shadow-2xs">
                SaaS Social Platform
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Switcher Selector */}
            <div className="relative flex items-center bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-1.5 space-x-1.5 shadow-2xs hover:bg-slate-200/60 transition-all">
              <Languages className="w-4 h-4 text-indigo-600 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as SupportedLang)}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer pr-1"
              >
                <option value="en">English (EN)</option>
                <option value="es">Español (ES)</option>
                <option value="fr">Français (FR)</option>
                <option value="de">Deutsch (DE)</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="pt">Português (Brasil)</option>
                <option value="fil">Filipino (Tagalog)</option>
              </select>
            </div>

            <a
              href="/admin"
              className="hidden md:inline-block text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 text-decoration-none"
            >
              {t.superAdmin}
            </a>

            <a
              href="/create-clan"
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center space-x-1.5 cursor-pointer border-0 text-decoration-none active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{t.createClan}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            {t.heroTitle}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {t.minutes}
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {t.heroDesc}
          </p>

          {/* Social Proof Strip */}
          <div className="pt-2 flex items-center justify-center space-x-3">
            <div className="flex -space-x-2 overflow-hidden p-0.5">
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                CU
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                AL
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br from-violet-500 to-pink-500 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                NG
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                +15k
              </span>
            </div>
            <div className="text-left text-xs">
              <div className="font-extrabold text-slate-800 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t.verifiedBadge}</span>
              </div>
              <p className="text-[11px] text-slate-500">{t.verifiedSub}</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/create-clan"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all flex items-center justify-center space-x-2 cursor-pointer border-0 text-decoration-none active:scale-95"
            >
              <span>{t.buildSubdomain}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </a>

            <a
              href="#audiences"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-sm transition-all shadow-sm flex items-center justify-center space-x-2 text-decoration-none"
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{t.audiencesTitle}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Target Audiences Grid Section */}
      <section id="audiences" className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-200/80">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold shadow-2xs">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t.audiencesBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">{t.audiencesTitle}</h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">{t.audiencesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetAudiences.map((aud) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.id}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${aud.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {aud.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{aud.desc}</p>
                </div>
                <a
                  href="/create-clan"
                  className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 text-decoration-none group-hover:text-indigo-700"
                >
                  <span>Custom Subdomain & Feed</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}

          {/* Language Agnostic Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Languages className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/80 inline-block mb-3">
                {t.langAgnosticBadge}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {t.langAgnosticTitle}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.langAgnosticDesc}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs font-bold text-indigo-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Native Multi-Lingual Interface Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Closed Network Benefits Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-200/80 bg-white/50 rounded-3xl my-8 border border-slate-200/60 shadow-xs">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t.whyClosedBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">{t.whyClosedTitle}</h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">{t.whyClosedSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {closedNetworkBenefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-400/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Modules Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-200/80">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t.modulesBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{t.modulesTitle}</h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">{t.modulesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moduleItems.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.key}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Communities Gallery Showcase */}
      <section id="showcase" className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-200/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>{t.showcaseBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{t.showcaseTitle}</h2>
          </div>
          <a
            href="/create-clan"
            className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1 cursor-pointer bg-transparent border-0 text-decoration-none"
          >
            <span>{t.buildSubdomain}</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {loadingCommunities ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : communities.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm">
            <Globe className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No Public Communities Provisioned Yet</h3>
            <p className="text-xs text-slate-600 mb-4">Be the first clan to request your custom subdomain on MySocialClan!</p>
            <a
              href="/create-clan"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs border-0 cursor-pointer shadow-md shadow-indigo-500/20 text-decoration-none inline-block"
            >
              Request Community Setup
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((c) => {
              const originHost = typeof window !== "undefined" ? window.location.host : "mysocialclan.com";
              const isLocalhost = originHost.includes("localhost");
              const fullDomain = isLocalhost
                ? `${c.subdomain}.localhost:3000`
                : `${c.subdomain}.mysocialclan.com`;
              const fullUrl = isLocalhost ? `http://${fullDomain}` : `https://${fullDomain}`;

              return (
                <div
                  key={c._id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-5 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center space-x-3.5 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 overflow-hidden flex items-center justify-center shrink-0 border border-indigo-100 group-hover:scale-105 transition-transform">
                        {c.logo ? (
                          <img src={c.logo} alt={c.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-6 h-6 text-indigo-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {c.name}
                        </h3>
                        <p className="text-[11px] font-mono text-indigo-600 font-semibold">{fullDomain}</p>
                      </div>
                    </div>

                    {c.description && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{c.description}</p>
                    )}
                  </div>

                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white text-slate-700 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-2 text-decoration-none shadow-2xs"
                  >
                    <span>Open Community App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500 space-y-3">
        <div className="flex items-center justify-center space-x-3">
          <Languages className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-slate-700">International Language Selector:</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as SupportedLang)}
            className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-lg px-2.5 py-1 outline-none cursor-pointer shadow-2xs"
          >
            <option value="en">English (EN)</option>
            <option value="es">Español (ES)</option>
            <option value="fr">Français (FR)</option>
            <option value="de">Deutsch (DE)</option>
            <option value="ja">日本語 (Japanese)</option>
            <option value="pt">Português (Brasil)</option>
            <option value="fil">Filipino (Tagalog)</option>
          </select>
        </div>
        <p>© 2026 Vyanamics Technologies Pvt. Ltd India</p>
      </footer>
    </div>
  );
}
