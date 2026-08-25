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
  Lock,
  Zap,
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

type SupportedLang = "en" | "es" | "fr" | "de" | "ja" | "pt" | "fil" | "ar" | "hi" | "ur" | "ml";

const translations: Record<
  SupportedLang,
  {
    badge: string;
    heroTitle: string;
    heroHighlight: string;
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
    statMembers: string;
    statCommunities: string;
    statLanguages: string;
    ctaTitle: string;
    ctaDesc: string;
  }
> = {
  en: {
    badge: "Language-Agnostic SaaS Platform for Global Communities & Institutions",
    heroTitle: "Your Private Social Network,",
    heroHighlight: "Live in Minutes",
    minutes: "Minutes",
    heroDesc:
      "Empower your college, alumni network, industry association, social group, or NGO with a verified private network — featuring member directories, social feeds, event RSVPs, venue bookings, and cultural calendars under your custom subdomain.",
    buildSubdomain: "Build Your Community",
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
      "MySocialClan is 100% language-agnostic. Whether your global members converse in Arabic, English, Hindi, Urdu, Malayalam, Spanish, French, German, Japanese, Portuguese, or Filipino, your community feed adapts seamlessly.",
    modulesBadge: "Social Engine Modules",
    modulesTitle: "Powerful Features Included",
    modulesSubtitle: "Configure exactly which engagement tools your organization needs.",
    showcaseBadge: "Live Community Network",
    showcaseTitle: "Active Clans & Organizations",
    createClan: "Create Clan",
    superAdmin: "Super Admin Portal",
    statMembers: "Members Worldwide",
    statCommunities: "Active Communities",
    statLanguages: "Languages Supported",
    ctaTitle: "Ready to Launch Your Community?",
    ctaDesc: "Set up your private social network in minutes — no technical expertise required.",
  },
  ar: {
    badge: "منصة SaaS مستقلة عن اللغة للمجتمعات والمؤسسات العالمية والخليجية",
    heroTitle: "شبكتك الاجتماعية الخاصة،",
    heroHighlight: "تنطلق في دقائق",
    minutes: "دقائق",
    heroDesc:
      "مكّن كليتك، أو شبكة الخريجين، أو جمعيتك المهنية، أو مجموعتك الاجتماعية، أو منظمتك غير الحكومية بشبكة خاصة موثقة تحت نطاقك الفرعي المخصص.",
    buildSubdomain: "إنشاء نطاق فرعي للمجتمع",
    exploreCommunities: "استكشاف المجتمعات الحية",
    verifiedBadge: "شبكات خاصة موثقة 100%",
    verifiedSub: "محل ثقة الكليات وشبكات الخريجين والصناديق الدولية",
    audiencesBadge: "الجمهور المستهدف",
    audiencesTitle: "مصممة لتناسب كل أنواع الشبكات والمؤسسات",
    audiencesSubtitle:
      "توفير تواصل اجتماعي خاص وعالي الثقة عبر المؤسسات التعليمية، والهيئات المهنية، والجمعيات العالمية.",
    whyClosedBadge: "ميزة الشبكة المغلقة",
    whyClosedTitle: "لماذا تختار شبكة خاصة مغلقة بدلاً من المنصات العامة؟",
    whyClosedSubtitle:
      "تعطي المنصات العامة الأولوية لتتبع الإعلانات وجمع البيانات. يوفر MySocialClan ملاذاً آمناً وخالياً من الإعلانات لمجتمعك.",
    langAgnosticBadge: "منصة مستقلة عن اللغة",
    langAgnosticTitle: "عمل بسلاسة بأي لغة عالمية",
    langAgnosticDesc:
      "منصة MySocialClan مستقلة تماماً عن اللغة. سواء يتحدث أعضاؤك بالعربية، الإنجليزية، الهندية، أردو، أو أي لغة أخرى، يتكيف التطبيق بسلاسة.",
    modulesBadge: "وحدات المحرك الاجتماعي",
    modulesTitle: "ميزات قوية متضمنة",
    modulesSubtitle: "قم بإعداد أدوات التفاعل التي تحتاجها مؤسستك بالضبط.",
    showcaseBadge: "شبكة المجتمعات الحية",
    showcaseTitle: "المجتمعات والمؤسسات النشطة",
    createClan: "إنشاء مجتمع (Clan)",
    superAdmin: "بوابة المسؤول الفائق",
    statMembers: "أعضاء حول العالم",
    statCommunities: "مجتمعات نشطة",
    statLanguages: "لغات مدعومة",
    ctaTitle: "هل أنت مستعد لإطلاق مجتمعك؟",
    ctaDesc: "أنشئ شبكتك الاجتماعية الخاصة في دقائق — دون الحاجة إلى خبرة تقنية.",
  },
  hi: {
    badge: "वैश्विक समुदायों और संस्थानों के लिए भाषा-स्वतंत्र SaaS प्लेटफ़ॉर्म",
    heroTitle: "आपका प्राइवेट सोशल नेटवर्क,",
    heroHighlight: "मिनटों में तैयार",
    minutes: "मिनटों में",
    heroDesc:
      "अपने कॉलेज, पूर्व छात्र नेटवर्क, पेशेवर संघ या एनजीओ को अपने कस्टम सबडोमेन के तहत एक सत्यापित निजी नेटवर्क के साथ सशक्त बनाएं।",
    buildSubdomain: "समुदाय सबडोमेन बनाएं",
    exploreCommunities: "लाइव समुदाय देखें",
    verifiedBadge: "100% सत्यापित निजी नेटवर्क",
    verifiedSub: "कॉलेजों, पूर्व छात्रों और अंतरराष्ट्रीय ट्रस्टों द्वारा विश्वसनीय",
    audiencesBadge: "लक्षित दर्शक",
    audiencesTitle: "हर प्रकार के संगठन के लिए अनुकूलित",
    audiencesSubtitle:
      "शैक्षणिक संस्थानों, पेशेवर निकायों और वैश्विक संघों में निजी और सुरक्षित जुड़ाव प्रदान करना।",
    whyClosedBadge: "बंद नेटवर्क के लाभ",
    whyClosedTitle: "सार्वजनिक सोशल मीडिया के बजाय बंद नेटवर्क क्यों चुनें?",
    whyClosedSubtitle:
      "सार्वजनिक प्लेटफॉर्म विज्ञापनों और डेटा ट्रैकिंग को प्राथमिकता देते हैं। MySocialClan आपके समुदाय के लिए एक विज्ञापन-मुक्त, सुरक्षित स्थान प्रदान करता है।",
    langAgnosticBadge: "भाषा-स्वतंत्र प्लेटफ़ॉर्म",
    langAgnosticTitle: "किसी भी अंतरराष्ट्रीय भाषा में आराम से काम करें",
    langAgnosticDesc:
      "MySocialClan 100% भाषा-स्वतंत्र है। आपके सदस्य अरबी, हिंदी, अंग्रेजी, उर्दू, मलयालम या किसी भी भाषा में संवाद कर सकते हैं।",
    modulesBadge: "सोशल इंजन मॉड्यूल",
    modulesTitle: "शक्तिशाली सुविधाएं शामिल",
    modulesSubtitle: "अपनी आवश्यकतानुसार टूल कॉन्फ़िगर करें।",
    showcaseBadge: "लाइव समुदाय नेटवर्क",
    showcaseTitle: "सक्रिय क्लैन और संगठन",
    createClan: "क्लैन बनाएं",
    superAdmin: "सुपर एडमिन पोर्टल",
    statMembers: "विश्वभर में सदस्य",
    statCommunities: "सक्रिय समुदाय",
    statLanguages: "समर्थित भाषाएं",
    ctaTitle: "अपना समुदाय लॉन्च करने के लिए तैयार हैं?",
    ctaDesc: "मिनटों में अपना प्राइवेट सोशल नेटवर्क सेट करें — कोई तकनीकी ज्ञान जरूरी नहीं।",
  },
  ur: {
    badge: "عالمی برادریوں اور جی سی سی خطے کے لیے زبان سے آزاد SaaS پلیٹ فارم",
    heroTitle: "آپ کا پرائیویٹ سوشل نیٹ ورک،",
    heroHighlight: "چند منٹوں میں تیار",
    minutes: "شروع کریں",
    heroDesc:
      "اپنے کالج، ایلومنائی نیٹ ورک، پیشہ ورانہ تنظیم، یا این جی او کو اپنے کسٹم سب ڈومین کے تحت ایک تصدیق شدہ پرائیویٹ نیٹ ورک سے بااختیار بنائیں۔",
    buildSubdomain: "سب ڈومین بنائیں",
    exploreCommunities: "لائیو کمیونٹیز دیکھیں",
    verifiedBadge: "100% تصدیق شدہ پرائیویٹ نیٹ ورکس",
    verifiedSub: "کالجوں، ایلومنائی اور بین الاقوامی ٹرسٹ کا قابل اعتماد پلیٹ فارم",
    audiencesBadge: "ہدف گروپس",
    audiencesTitle: "ہر قسم کی تنظیم کے لیے موزوں",
    audiencesSubtitle:
      "تعلیمی اداروں، پیشہ ورانہ اداروں اور عالمی تنظیموں میں پرائیویٹ اور محفوظ رابطے فراہم کرنا۔",
    whyClosedBadge: "پرائیویٹ نیٹ ورک کے فوائد",
    whyClosedTitle: "پبلک سوشل میڈیا کے بجائے پرائیویٹ نیٹ ورک کیوں منتخب کریں؟",
    whyClosedSubtitle:
      "پبلک پلیٹ فارم اشتہارات اور ڈیٹا ٹریکنگ کو ترجیح دیتے ہیں۔ MySocialClan آپ کی کمیونٹی کے لیے اشتہارات سے پاک محفوظ ماحول فراہم کرتا ہے۔",
    langAgnosticBadge: "ہر زبان کے لیے موزوں پلیٹ فارم",
    langAgnosticTitle: "کسی بھی عالمی زبان میں آسانی سے کام کریں",
    langAgnosticDesc:
      "MySocialClan 100% زبان سے آزاد ہے۔ آپ کے اراکین عربی، اردو، ہندی، انگریزی یا کسی بھی زبان میں بات چیت کر سکتے ہیں۔",
    modulesBadge: "سوشل انجن ماڈیولز",
    modulesTitle: "طاقتور خصوصیات شامل ہیں",
    modulesSubtitle: "اپنی ضرورت کے مطابق خصوصیات کا انتخاب کریں۔",
    showcaseBadge: "لائیو کمیونٹی نیٹ ورک",
    showcaseTitle: "فعال کلینز اور تنظیمیں",
    createClan: "کلین بنائیں",
    superAdmin: "سپر ایڈمن پورٹل",
    statMembers: "دنیا بھر میں اراکین",
    statCommunities: "فعال کمیونٹیز",
    statLanguages: "حمایت یافتہ زبانیں",
    ctaTitle: "کیا آپ اپنی کمیونٹی شروع کرنے کے لیے تیار ہیں؟",
    ctaDesc: "چند منٹوں میں اپنا پرائیویٹ سوشل نیٹ ورک ترتیب دیں — کوئی تکنیکی مہارت ضروری نہیں۔",
  },
  ml: {
    badge: "ഗ്ലോബൽ & ജിസിസി കമ്മ്യൂണിറ്റികൾക്കായുള്ള ഭാഷാ-സ്വതന്ത്ര SaaS പ്ലാറ്റ്ഫോം",
    heroTitle: "നിങ്ങളുടെ സ്വകാര്യ സോഷ്യൽ നെറ്റ്‌വർക്ക്,",
    heroHighlight: "മിനിറ്റുകൾക്കുള്ളിൽ",
    minutes: "മിനിറ്റുകൾക്കുള്ളിൽ",
    heroDesc:
      "നിങ്ങളുടെ കോളേജ്, അലുമിനൈ നെറ്റ്‌വർക്ക്, പ്രൊഫഷണൽ ഓർഗനൈസേഷൻ അല്ലെങ്കിൽ എൻ‌ജി‌ഓകൾക്കായി നിങ്ങളുടെ സ്വന്തം സബ്‌ഡൊമെയ്‌നിൽ ഒരു സ്വകാര്യ നെറ്റ്‌വർക്ക് നിർമ്മിക്കൂ.",
    buildSubdomain: "സബ്‌ഡൊമെയ്‌ൻ നിർമ്മിക്കുക",
    exploreCommunities: "കമ്മ്യൂണിറ്റികൾ കാണുക",
    verifiedBadge: "100% വെരിഫൈഡ് പ്രൈവറ്റ് നെറ്റ്‌വർക്കുകൾ",
    verifiedSub: "കോളേജുകളും അലുമിനൈ ഓർഗനൈസേഷനുകളും വിശ്വസിക്കുന്ന പ്ലാറ്റ്‌ഫോം",
    audiencesBadge: "ടാർഗെറ്റ് ഗ്രൂപ്പുകൾ",
    audiencesTitle: "എല്ലാ തരം ഓർഗനൈസേഷനുകൾക്കും അനുയോജ്യം",
    audiencesSubtitle:
      "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ, പ്രൊഫഷണൽ ഗ്രൂപ്പുകൾ, സാമൂഹിക കൂട്ടായ്മകൾ എന്നിവയ്ക്ക് സുരക്ഷിതമായ സോഷ്യൽ നെറ്റ്‌വർക്ക്.",
    whyClosedBadge: "പ്രൈവറ്റ് നെറ്റ്‌വർക്കിന്റെ നേട്ടങ്ങൾ",
    whyClosedTitle: "പൊതു സോഷ്യൽ മീഡിയകൾക്ക് പകരം പ്രൈവറ്റ് നെറ്റ്‌വർക്ക് തിരഞ്ഞെടുക്കുന്നത് എന്തുകൊണ്ട്?",
    whyClosedSubtitle:
      "പൊതു പ്ലാറ്റ്‌ഫോമുകൾ പരസ്യങ്ങൾക്കും ഡാറ്റ ട്രാക്കിംഗിനും മുൻഗണന നൽകുന്നു. MySocialClan പരസ്യങ്ങളില്ലാത്ത സുരക്ഷിത ഇടം നൽകുന്നു.",
    langAgnosticBadge: "ഭാഷാ-സ്വതന്ത്ര പ്ലാറ്റ്‌ഫോം",
    langAgnosticTitle: "ഏത് അന്താരാഷ്ട്ര ഭാഷയിലും എളുപ്പത്തിൽ ഉപയോഗിക്കാം",
    langAgnosticDesc:
      "MySocialClan പൂർണ്ണമായും ഭാഷാ-സ്വതന്ത്രമാണ്. അറബിക്, മലയാളം, ഹിന്ദി, ഉർദു, ഇംഗ്ലീഷ് തുടങ്ങി ഏത് ഭാഷയിലും അംഗങ്ങൾക്ക് ആശയവിനിമയം നടത്താം.",
    modulesBadge: "സോഷ്യൽ എഞ്ചിൻ മൊഡ്യൂളുകൾ",
    modulesTitle: "ശക്തമായ സവിശേഷതകൾ ഉൾപ്പെടുത്തിയിരിക്കുന്നു",
    modulesSubtitle: "നിങ്ങളുടെ ഓർഗനൈസേഷന് ആവശ്യമായ ടൂളുകൾ തിരഞ്ഞെക്കുക.",
    showcaseBadge: "ലൈവ് കമ്മ്യൂണിറ്റി നെറ്റ്‌വർക്ക്",
    showcaseTitle: "ആക്ടീവ് കൂട്ടായ്മകൾ",
    createClan: "ക്ലാൻ ഉണ്ടാക്കുക",
    superAdmin: "സൂപ്പർ അഡ്മിൻ പോർട്ടൽ",
    statMembers: "ലോകമെമ്പാടുമുള്ള അംഗങ്ങൾ",
    statCommunities: "സജീവ കൂട്ടായ്മകൾ",
    statLanguages: "പിന്തുണയ്ക്കുന്ന ഭാഷകൾ",
    ctaTitle: "നിങ്ങളുടെ കമ്മ്യൂണിറ്റി ആരംഭിക്കാൻ തയ്യാറാണോ?",
    ctaDesc: "മിനിറ്റുകൾക്കുള്ളിൽ നിങ്ങളുടെ പ്രൈവറ്റ് സോഷ്യൽ നെറ്റ്‌വർക്ക് സജ്ജമാക്കുക — സാങ്കേതിക വൈദഗ്ദ്ധ്യം ആവശ്യമില്ല.",
  },
  es: {
    badge: "Plataforma SaaS Multilingüe para Comunidades e Instituciones Globales",
    heroTitle: "Tu Red Social Privada,",
    heroHighlight: "en Pocos Minutos",
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
      "MySocialClan es 100% independiente del idioma. Sus miembros pueden publicar y comunicarse en español, árabe, hindi, urdu, malayalam, inglés, francés, alemán, japonés, portugués o filipino.",
    modulesBadge: "Módulos Sociales",
    modulesTitle: "Características Potentes Incluidas",
    modulesSubtitle: "Configure exactamente las herramientas que necesita.",
    showcaseBadge: "Redes en Vivo",
    showcaseTitle: "Comunidades Activas",
    createClan: "Crear Clan",
    superAdmin: "Portal Super Admin",
    statMembers: "Miembros en el Mundo",
    statCommunities: "Comunidades Activas",
    statLanguages: "Idiomas Soportados",
    ctaTitle: "¿Listo para lanzar tu comunidad?",
    ctaDesc: "Configura tu red social privada en minutos — sin necesidad de experiencia técnica.",
  },
  fr: {
    badge: "Plateforme SaaS Multilingue pour Communautés et Institutions Globales",
    heroTitle: "Votre Réseau Social Privé,",
    heroHighlight: "en Quelques Minutes",
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
      "MySocialClan s'adapte à n'importe quelle langue internationale : arabe, hindi, ourdou, malayalam, français, anglais, espagnol, allemand, japonais, portugais, filipino, etc.",
    modulesBadge: "Modules sociaux",
    modulesTitle: "Fonctionnalités puissantes incluses",
    modulesSubtitle: "Configurez les outils adaptés à vos besoins.",
    showcaseBadge: "Réseaux en direct",
    showcaseTitle: "Communautés actives",
    createClan: "Créer un clan",
    superAdmin: "Portail Super Admin",
    statMembers: "Membres dans le Monde",
    statCommunities: "Communautés Actives",
    statLanguages: "Langues Supportées",
    ctaTitle: "Prêt à lancer votre communauté ?",
    ctaDesc: "Configurez votre réseau social privé en quelques minutes — aucune expertise technique requise.",
  },
  de: {
    badge: "Sprachenunabhängige SaaS-Plattform für globale Gemeinschaften",
    heroTitle: "Ihr privates soziales Netzwerk,",
    heroHighlight: "in wenigen Minuten",
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
      "MySocialClan ist vollständig sprachenunabhängig und unterstützt Arabisch, Hindi, Urdu, Malayalam, Deutsch, Englisch, Spanisch, Französisch, Japanisch, Portugiesisch und Filipino.",
    modulesBadge: "Soziale Module",
    modulesTitle: "Leistungsstarke Funktionen enthalten",
    modulesSubtitle: "Konfigurieren Sie genau die Tools, die Sie benötigen.",
    showcaseBadge: "Live-Netzwerk",
    showcaseTitle: "Aktive Communities",
    createClan: "Clan erstellen",
    superAdmin: "Super Admin Portal",
    statMembers: "Mitglieder weltweit",
    statCommunities: "Aktive Gemeinschaften",
    statLanguages: "Unterstützte Sprachen",
    ctaTitle: "Bereit, Ihre Community zu starten?",
    ctaDesc: "Richten Sie Ihr privates soziales Netzwerk in Minuten ein — kein technisches Fachwissen erforderlich.",
  },
  ja: {
    badge: "グローバルコミュニティおよび機関向け言語非依存SaaSプラットフォーム",
    heroTitle: "プライベートSNSを、",
    heroHighlight: "わずか数分で開設",
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
      "アラビア語、ヒンディー語、ウルドゥー語、マラヤーラム語、日本語、英語、フィリピン語、ポルトガル語、スペイン語、フランス語、ドイツ語など、グローバルな言語に完全対応しています。",
    modulesBadge: "ソーシャル機能",
    modulesTitle: "充実したモジュール機能",
    modulesSubtitle: "組織のニーズに合わせて必要な機能を自由に設定できます。",
    showcaseBadge: "ライブネットワーク",
    showcaseTitle: "アクティブなコミュニティ",
    createClan: "クランを作成",
    superAdmin: "スーパー管理者ポータル",
    statMembers: "世界中のメンバー",
    statCommunities: "アクティブコミュニティ",
    statLanguages: "対応言語数",
    ctaTitle: "コミュニティを始める準備はできましたか？",
    ctaDesc: "数分でプライベートSNSをセットアップ — 技術的な専門知識は不要です。",
  },
  pt: {
    badge: "Plataforma SaaS Multilíngue para Comunidades e Instituições Globais",
    heroTitle: "Sua Rede Social Privada,",
    heroHighlight: "no Ar em Minutos",
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
      "O MySocialClan suporta nativamente árabe, híndi, urdu, malaiala, português do Brasil, inglês, espanhol, francês, alemão, japonês, filipino e qualquer outro idioma internacional.",
    modulesBadge: "Módulos Sociais",
    modulesTitle: "Recursos Potentes Incluídos",
    modulesSubtitle: "Configure exatamente as ferramentas que sua organização precisa.",
    showcaseBadge: "Redes em Destaque",
    showcaseTitle: "Comunidades Ativas",
    createClan: "Criar Clan",
    superAdmin: "Portal Super Admin",
    statMembers: "Membros no Mundo",
    statCommunities: "Comunidades Ativas",
    statLanguages: "Idiomas Suportados",
    ctaTitle: "Pronto para lançar sua comunidade?",
    ctaDesc: "Configure sua rede social privada em minutos — sem necessidade de experiência técnica.",
  },
  fil: {
    badge: "Platform na Hindi Nakadepende sa Wika para sa mga Pandaigdigang Komunidad",
    heroTitle: "Ang Iyong Pribadong Social Network,",
    heroHighlight: "Handa sa Ilang Minuto",
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
      "100% hindi nakadepende sa wika ang MySocialClan. Ang iyong mga miyembro ay makakapag-usap sa Arabic, Hindi, Urdu, Malayalam, Filipino, Ingles, Hapon, Portuges, Espanyol, at higit pa.",
    modulesBadge: "Mga Modyul ng Social Engine",
    modulesTitle: "Kasama ang mga Makapangyarihang Tampok",
    modulesSubtitle: "I-configure ang eksaktong mga tool na kailangan ng iyong organisasyon.",
    showcaseBadge: "Live na Network ng Komunidad",
    showcaseTitle: "Mga Aktibong Clan at Organisasyon",
    createClan: "Lumikha ng Clan",
    superAdmin: "Super Admin Portal",
    statMembers: "Miyembro sa Buong Mundo",
    statCommunities: "Mga Aktibong Komunidad",
    statLanguages: "Mga Wikang Sinusuportahan",
    ctaTitle: "Handa ka na bang ilunsad ang iyong komunidad?",
    ctaDesc: "I-set up ang iyong pribadong social network sa ilang minuto — walang kinakailangang teknikal na kaalaman.",
  },
};

import { useLanguage, LanguageDropdown } from "@/context/LanguageContext";

export default function LandingPage() {
  const [communities, setCommunities] = useState<CommunityPublic[]>([]);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { lang, setLang, isRtl } = useLanguage();

  // Use local translations map so we can access our extended fields
  const tt = translations[lang] ?? translations["en"];

  useEffect(() => {
    setMounted(true);
  }, []);

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
      gradient: "from-blue-500 to-blue-700",
      lightBg: "bg-blue-500/10",
      border: "border-blue-500/20",
      desc: "Department boards, student clubs, campus event hubs, placement cells, and academic notifications.",
    },
    {
      id: "alumni",
      title: "Alumni Associations",
      icon: Award,
      gradient: "from-violet-500 to-violet-700",
      lightBg: "bg-violet-500/10",
      border: "border-violet-500/20",
      desc: "Global graduation chapters, career mentorship, reunion drives, career referrals, and alumni registries.",
    },
    {
      id: "industry",
      title: "Industry & Trade Guilds",
      icon: Briefcase,
      gradient: "from-indigo-500 to-indigo-700",
      lightBg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      desc: "Professional syndicates, trade associations, corporate alumni networks, and verified member directories.",
    },
    {
      id: "social",
      title: "Social Groups & Cultural Clans",
      icon: Users,
      gradient: "from-emerald-500 to-emerald-700",
      lightBg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      desc: "Community trusts, cultural event RSVPs, member directories, and family trees.",
    },
    {
      id: "ngos",
      title: "NGOs & Non-Profits",
      icon: HeartHandshake,
      gradient: "from-rose-500 to-rose-700",
      lightBg: "bg-rose-500/10",
      border: "border-rose-500/20",
      desc: "Volunteer coordination, fundraising campaigns, direct zero-fee member donations, and impact news.",
    },
    {
      id: "languages",
      title: "Global Language Communities",
      icon: Languages,
      gradient: "from-cyan-500 to-cyan-700",
      lightBg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      desc: "MySocialClan is 100% language-agnostic. Arabic, Hindi, Urdu, Malayalam, English, Spanish — your feed adapts seamlessly.",
    },
  ];

  const closedNetworkBenefits = [
    {
      icon: Shield,
      title: "100% Data Privacy & No Algorithmic Tracking",
      desc: "Unlike public social networks, your clan's data is strictly private and never indexed by external search engines.",
    },
    {
      icon: UserCheck,
      title: "Mandatory Admin Verification & Zero Spammers",
      desc: "Every member is verified by clan admins before gaining access. Eliminates anonymous trolls and fake profiles.",
    },
    {
      icon: Sliders,
      title: "Distraction-Free Community Feed",
      desc: "No viral clickbait algorithms, doomscrolling traps, or third-party sponsored ads competing for attention.",
    },
    {
      icon: Globe,
      title: "Dedicated Custom Subdomain Branding",
      desc: "Own your independent digital ecosystem under your custom subdomain with full logo branding.",
    },
    {
      icon: DollarSign,
      title: "Direct Member Support Payments (0% Fee)",
      desc: "Collect member dues, event tickets, or contributions directly into your account with zero middleman fees.",
    },
    {
      icon: Lock,
      title: "Fully Closed & Invite-Only Access",
      desc: "No public sign-ups, no discoverable profiles. Your community remains a trusted, members-only sanctuary.",
    },
  ];

  const moduleItems = [
    {
      key: "directory" as const,
      title: "Verified Member & Student Directory",
      desc: "Private member profiles, student/alumni batches, roll-number verification, and secure campus feeds.",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      key: "marketplace" as const,
      title: "Internships, Career Referrals & Opportunity Hub",
      desc: "Verified campus placement drives, off-campus internships, peer interview prep, and alumni job referrals.",
      icon: Briefcase,
      color: "text-indigo-600",
      bg: "bg-indigo-500/10",
    },
    {
      key: "panchang" as const,
      title: "Academic Timelines & Community Calendars",
      desc: "Semester schedules, exam timetables, hackathons, or optional cultural panchang & festive observances.",
      icon: Calendar,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
    {
      key: "booking" as const,
      title: "Labs, Auditoriums & Facility Bookings",
      desc: "Campus computer labs, seminar halls, sports facilities, and meeting spaces bookable with instant approval.",
      icon: Landmark,
      color: "text-violet-600",
      bg: "bg-violet-500/10",
    },
    {
      key: "events" as const,
      title: "Official Notices & Student Club Events",
      desc: "Dean/Principal broadcasts, annual fests, club activities, RSVP tracking, and QR check-ins.",
      icon: Megaphone,
      color: "text-pink-600",
      bg: "bg-pink-500/10",
    },
    {
      key: "donations" as const,
      title: "Direct 0% Fee Grants & Fest Sponsorships",
      desc: "0% platform fee collections directly to your institution bank/UPI for campus fests and club activities.",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen font-sans"
      style={{
        background: "linear-gradient(160deg, #f8f5ff 0%, #fef9f5 40%, #f0f7ff 70%, #fdf4ff 100%)",
        color: "#1e1b4b",
      }}
    >
      {/* Ambient Background Glows */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "-10%", left: "-5%", width: "50rem", height: "50rem",
          background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%)",
          borderRadius: "50%"
        }} />
        <div style={{
          position: "absolute", top: "35%", right: "-10%", width: "40rem", height: "40rem",
          background: "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 65%)",
          borderRadius: "50%"
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "25%", width: "38rem", height: "38rem",
          background: "radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 65%)",
          borderRadius: "50%"
        }} />
      </div>

      {/* ─── NAVIGATION ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(167,139,250,0.15)",
        boxShadow: "0 1px 24px rgba(167,139,250,0.08)",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "12px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 60%, #f97316 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(139,92,246,0.3)",
            }}>
              <Globe style={{ width: "20px", height: "20px", color: "white" }} />
            </div>
            <div>
              <span style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.5px", color: "#1e1b4b" }}>
                MySocialClan
              </span>
              <span style={{
                display: "none", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "#a78bfa", marginLeft: "8px"
              }} className="sm-show">
                Private Social SaaS
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Language Switcher */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)",
              borderRadius: "10px", padding: "8px 12px",
            }}>
              <Languages style={{ width: "15px", height: "15px", color: "#8b5cf6", flexShrink: 0 }} />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as SupportedLang)}
                style={{
                  background: "transparent", color: "#4c1d95", fontSize: "12px", fontWeight: 600,
                  outline: "none", cursor: "pointer", border: "none",
                }}
              >
                <option value="en">English (EN)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="ml">മലയാളം</option>
                <option value="es">Español (ES)</option>
                <option value="fr">Français (FR)</option>
                <option value="de">Deutsch (DE)</option>
                <option value="ja">日本語</option>
                <option value="pt">Português</option>
                <option value="fil">Filipino</option>
              </select>
            </div>

            {/* CTA Button */}
            <a
              href="/create-clan"
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                color: "white", padding: "9px 18px", borderRadius: "10px",
                fontSize: "13px", fontWeight: 700, textDecoration: "none",
                boxShadow: "0 4px 16px rgba(139,92,246,0.3)",
                transition: "all 0.2s ease", border: "none",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(139,92,246,0.45)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(139,92,246,0.3)";
              }}
            >
              <Plus style={{ width: "15px", height: "15px", strokeWidth: 3 }} />
              <span>{tt.createClan || "Create Clan"}</span>
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 1.5rem 80px", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.22)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "32px",
          }}>
            <Sparkles style={{ width: "13px", height: "13px", color: "#8b5cf6" }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#7c3aed", letterSpacing: "0.02em" }}>
              {tt.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.1,
            letterSpacing: "-2px", color: "#1e1b4b", marginBottom: "16px",
          }}>
            {tt.heroTitle || "Your Private Social Network,"}
          </h1>
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.1,
            letterSpacing: "-2px", marginBottom: "28px",
            background: "linear-gradient(135deg, #8b5cf6 0%, #f97316 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {tt.heroHighlight || "Live in Minutes"}
          </h1>

          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "#64748b",
            maxWidth: "680px", margin: "0 auto 40px", lineHeight: 1.75, fontWeight: 400,
          }}>
            {tt.heroDesc}
          </p>

          {/* Social Proof */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
            marginBottom: "40px",
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[220, 250, 280].map((hue, i) => (
                <div key={i} style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  border: "2.5px solid white",
                  background: `hsl(${hue}, 65%, 58%)`,
                  marginLeft: i > 0 ? "-10px" : "0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: 700, color: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}>
                  {["CU", "AL", "NG"][i]}
                </div>
              ))}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <ShieldCheck style={{ width: "14px", height: "14px", color: "#14b8a6" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e1b4b" }}>{tt.verifiedBadge}</span>
              </div>
              <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "1px" }}>{tt.verifiedSub}</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a
              href="/create-clan"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                color: "white", padding: "14px 28px", borderRadius: "14px",
                fontSize: "15px", fontWeight: 800, textDecoration: "none",
                boxShadow: "0 8px 28px rgba(139,92,246,0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 44px rgba(139,92,246,0.45)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(139,92,246,0.35)";
              }}
            >
              <span>{tt.buildSubdomain}</span>
              <ArrowRight style={{ width: "16px", height: "16px", strokeWidth: 2.5 }} />
            </a>
            <a
              href="#showcase"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "white", border: "1.5px solid rgba(139,92,246,0.2)",
                color: "#4c1d95", padding: "14px 28px", borderRadius: "14px",
                fontSize: "15px", fontWeight: 700, textDecoration: "none",
                transition: "all 0.25s ease",
                boxShadow: "0 2px 12px rgba(139,92,246,0.1)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.4)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(139,92,246,0.18)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.2)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(139,92,246,0.1)";
              }}
            >
              <Globe style={{ width: "15px", height: "15px", color: "#8b5cf6" }} />
              <span>{tt.exploreCommunities}</span>
            </a>
          </div>
        </div>
      </section>



      {/* ─── TARGET AUDIENCES ─── */}
      <section id="audiences" style={{ position: "relative", zIndex: 1, padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: "100px", padding: "5px 14px", marginBottom: "16px",
            }}>
              <Users style={{ width: "13px", height: "13px", color: "#8b5cf6" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {tt.audiencesBadge}
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#1e1b4b",
              letterSpacing: "-1px", marginBottom: "14px",
            }}>
              {tt.audiencesTitle}
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", maxWidth: "540px", margin: "0 auto", lineHeight: 1.65 }}>
              {tt.audiencesSubtitle}
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}>
            {targetAudiences.map((aud) => {
              const Icon = aud.icon;
              const iconBg = aud.gradient.includes("blue") ? "#3b82f6" : aud.gradient.includes("violet") ? "#8b5cf6" : aud.gradient.includes("indigo") ? "#6366f1" : aud.gradient.includes("emerald") ? "#10b981" : aud.gradient.includes("rose") ? "#f43f5e" : "#06b6d4";
              return (
                <div
                  key={aud.id}
                  style={{
                    background: "white", border: "1.5px solid rgba(139,92,246,0.1)",
                    borderRadius: "20px", padding: "28px", cursor: "pointer",
                    transition: "all 0.25s ease", position: "relative", overflow: "hidden",
                    boxShadow: "0 2px 16px rgba(139,92,246,0.06)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(139,92,246,0.3)";
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = "0 16px 40px rgba(139,92,246,0.12)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(139,92,246,0.1)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 2px 16px rgba(139,92,246,0.06)";
                  }}
                >
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "14px",
                    background: `linear-gradient(135deg, ${iconBg} 0%, ${iconBg}cc 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "18px", boxShadow: `0 4px 14px ${iconBg}44`,
                  }}>
                    <Icon style={{ width: "24px", height: "24px", color: "white" }} />
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1e1b4b", marginBottom: "10px" }}>
                    {aud.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65, marginBottom: "20px" }}>
                    {aud.desc}
                  </p>
                  <a
                    href="/create-clan"
                    style={{
                      display: "flex", alignItems: "center", gap: "6px", textDecoration: "none",
                      fontSize: "12px", fontWeight: 700, color: "#7c3aed",
                    }}
                  >
                    <span>Get Started</span>
                    <ChevronRight style={{ width: "14px", height: "14px" }} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CLOSED NETWORK BENEFITS ─── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.22)",
              borderRadius: "100px", padding: "5px 14px", marginBottom: "16px",
            }}>
              <Shield style={{ width: "13px", height: "13px", color: "#0d9488" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {tt.whyClosedBadge}
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#1e1b4b",
              letterSpacing: "-1px", marginBottom: "14px", maxWidth: "680px", margin: "0 auto 14px",
            }}>
              {tt.whyClosedTitle}
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", maxWidth: "580px", margin: "0 auto", lineHeight: 1.65 }}>
              {tt.whyClosedSubtitle}
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px",
          }}>
            {closedNetworkBenefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex", gap: "16px", padding: "24px",
                    background: "white", border: "1.5px solid rgba(20,184,166,0.12)",
                    borderRadius: "16px", transition: "all 0.2s ease",
                    boxShadow: "0 2px 12px rgba(20,184,166,0.06)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.3)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(20,184,166,0.12)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.12)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(20,184,166,0.06)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "12px",
                    background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon style={{ width: "18px", height: "18px", color: "#0d9488" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1e1b4b", marginBottom: "6px" }}>
                      {b.title}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.6 }}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURE MODULES ─── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.22)",
              borderRadius: "100px", padding: "5px 14px", marginBottom: "16px",
            }}>
              <Zap style={{ width: "13px", height: "13px", color: "#f97316" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {tt.modulesBadge}
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#1e1b4b",
              letterSpacing: "-1px", marginBottom: "14px",
            }}>
              {tt.modulesTitle}
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
              {tt.modulesSubtitle}
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px",
          }}>
            {moduleItems.map((m) => {
              const Icon = m.icon;
              const iconColor = m.color.includes("blue") ? "#3b82f6" : m.color.includes("emerald") ? "#10b981" : m.color.includes("amber") ? "#f59e0b" : m.color.includes("violet") ? "#8b5cf6" : m.color.includes("pink") ? "#ec4899" : "#f43f5e";
              const iconBgColor = m.color.includes("blue") ? "rgba(59,130,246,0.1)" : m.color.includes("emerald") ? "rgba(16,185,129,0.1)" : m.color.includes("amber") ? "rgba(245,158,11,0.1)" : m.color.includes("violet") ? "rgba(139,92,246,0.1)" : m.color.includes("pink") ? "rgba(236,72,153,0.1)" : "rgba(244,63,94,0.1)";
              return (
                <div
                  key={m.key}
                  style={{
                    padding: "28px", background: "white",
                    border: "1.5px solid rgba(139,92,246,0.1)", borderRadius: "20px",
                    transition: "all 0.25s ease", boxShadow: "0 2px 16px rgba(139,92,246,0.06)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(249,115,22,0.25)";
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = "0 16px 40px rgba(249,115,22,0.1)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(139,92,246,0.1)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 2px 16px rgba(139,92,246,0.06)";
                  }}
                >
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "14px",
                    background: iconBgColor, border: `1px solid ${iconColor}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px",
                  }}>
                    <Icon style={{ width: "22px", height: "22px", color: iconColor }} />
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#1e1b4b", marginBottom: "10px" }}>
                    {m.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65 }}>
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── LANGUAGE AGNOSTIC BANNER ─── */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 1.5rem 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.07) 0%, rgba(99,102,241,0.05) 50%, rgba(249,115,22,0.06) 100%)",
            border: "1.5px solid rgba(139,92,246,0.15)", borderRadius: "24px",
            padding: "48px 40px", display: "flex", flexWrap: "wrap", gap: "32px",
            alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 4px 32px rgba(139,92,246,0.08)",
          }}>
            <div style={{ flex: "1", minWidth: "260px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.22)",
                borderRadius: "100px", padding: "5px 14px", marginBottom: "18px",
              }}>
                <Languages style={{ width: "13px", height: "13px", color: "#8b5cf6" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {tt.langAgnosticBadge}
                </span>
              </div>
              <h2 style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: "#1e1b4b",
                letterSpacing: "-0.5px", marginBottom: "14px", lineHeight: 1.2,
              }}>
                {tt.langAgnosticTitle}
              </h2>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, maxWidth: "480px" }}>
                {tt.langAgnosticDesc}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", maxWidth: "340px" }}>
              {[
                { flag: "🇬🇧", label: "English" }, { flag: "🇸🇦", label: "العربية" }, { flag: "🇮🇳", label: "हिन्दी" },
                { flag: "🇵🇰", label: "اردو" }, { flag: "🇮🇳", label: "മലയാളം" }, { flag: "🇪🇸", label: "Español" },
                { flag: "🇫🇷", label: "Français" }, { flag: "🇩🇪", label: "Deutsch" }, { flag: "🇯🇵", label: "日本語" },
                { flag: "🇧🇷", label: "Português" }, { flag: "🇵🇭", label: "Filipino" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "white", border: "1px solid rgba(139,92,246,0.15)",
                  borderRadius: "100px", padding: "5px 10px",
                  boxShadow: "0 1px 4px rgba(139,92,246,0.08)",
                }}>
                  <span style={{ fontSize: "14px" }}>{item.flag}</span>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#4c1d95" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIVE COMMUNITIES SHOWCASE ─── */}
      <section id="showcase" style={{ position: "relative", zIndex: 1, padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "flex-end",
            justifyContent: "space-between", gap: "16px", marginBottom: "40px",
          }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                marginBottom: "12px",
              }}>
                <Activity style={{ width: "14px", height: "14px", color: "#0d9488" }} />
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {tt.showcaseBadge}
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.25)",
                  borderRadius: "100px", padding: "2px 8px",
                  fontSize: "10px", fontWeight: 700, color: "#0d9488",
                }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#14b8a6", display: "inline-block", animation: "pulse 2s infinite" }} />
                  LIVE
                </span>
              </div>
              <h2 style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: "#1e1b4b", letterSpacing: "-1px",
              }}>
                {tt.showcaseTitle}
              </h2>
            </div>
            <a
              href="/create-clan"
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                fontSize: "13px", fontWeight: 700, color: "#7c3aed", textDecoration: "none",
              }}
            >
              <span>{tt.buildSubdomain}</span>
              <ChevronRight style={{ width: "15px", height: "15px" }} />
            </a>
          </div>

          {loadingCommunities ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 0" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                border: "3px solid rgba(139,92,246,0.15)", borderTopColor: "#8b5cf6",
                animation: "spin 0.8s linear infinite",
              }} />
            </div>
          ) : communities.length === 0 ? (
            <div style={{
              background: "white", border: "1.5px solid rgba(139,92,246,0.12)",
              borderRadius: "20px", padding: "60px 32px", textAlign: "center", maxWidth: "420px", margin: "0 auto",
              boxShadow: "0 4px 24px rgba(139,92,246,0.08)",
            }}>
              <Globe style={{ width: "40px", height: "40px", color: "#8b5cf6", margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1e1b4b", marginBottom: "8px" }}>
                No Public Communities Yet
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "24px", lineHeight: 1.6 }}>
                Be the first clan to request your custom subdomain on MySocialClan!
              </p>
              <a
                href="/create-clan"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                  color: "white", padding: "11px 24px", borderRadius: "12px",
                  fontSize: "13px", fontWeight: 700, textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
                }}
              >
                Request Community Setup
              </a>
            </div>
          ) : (
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px",
            }}>
              {communities.map((c) => {
                const originHost = mounted && typeof window !== "undefined" ? window.location.host : "mysocialclan.com";
                const isLocalhost = originHost.includes("localhost");
                const fullDomain = isLocalhost
                  ? `${c.subdomain}.localhost:3000`
                  : `${c.subdomain}.mysocialclan.com`;
                const fullUrl = isLocalhost ? `http://${fullDomain}` : `https://${fullDomain}`;

                return (
                  <div
                    key={c._id}
                    style={{
                      background: "white", border: "1.5px solid rgba(139,92,246,0.1)",
                      borderRadius: "18px", padding: "22px", transition: "all 0.25s ease",
                      display: "flex", flexDirection: "column", justifyContent: "space-between",
                      boxShadow: "0 2px 16px rgba(139,92,246,0.06)",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(139,92,246,0.3)";
                      el.style.transform = "translateY(-3px)";
                      el.style.boxShadow = "0 16px 40px rgba(139,92,246,0.12)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(139,92,246,0.1)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 2px 16px rgba(139,92,246,0.06)";
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                        <div style={{
                          width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0,
                          background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)",
                          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                        }}>
                          {c.logo ? (
                            <img src={c.logo} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <Building2 style={{ width: "22px", height: "22px", color: "#8b5cf6" }} />
                          )}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#1e1b4b", lineHeight: 1.2 }}>
                            {c.name}
                          </h3>
                          <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#7c3aed", fontWeight: 600, marginTop: "3px" }}>
                            {fullDomain}
                          </p>
                        </div>
                      </div>
                      {c.description && (
                        <p style={{
                          fontSize: "12px", color: "#64748b", lineHeight: 1.6,
                          marginBottom: "18px", display: "-webkit-box", WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical", overflow: "hidden",
                        }}>
                          {c.description}
                        </p>
                      )}
                    </div>

                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                        padding: "10px 18px", borderRadius: "10px",
                        background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)",
                        color: "#7c3aed", fontSize: "12px", fontWeight: 700, textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.15)";
                        (e.currentTarget as HTMLElement).style.color = "#4c1d95";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.07)";
                        (e.currentTarget as HTMLElement).style.color = "#7c3aed";
                      }}
                    >
                      <span>Open Community App</span>
                      <ExternalLink style={{ width: "13px", height: "13px" }} />
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(99,102,241,0.06) 50%, rgba(249,115,22,0.07) 100%)",
            border: "1.5px solid rgba(139,92,246,0.18)", borderRadius: "28px",
            padding: "64px 40px",
            boxShadow: "0 8px 60px rgba(139,92,246,0.1)",
          }}>
            <div style={{
              width: "60px", height: "60px", borderRadius: "20px", margin: "0 auto 24px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #f97316 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 28px rgba(139,92,246,0.35)",
            }}>
              <Sparkles style={{ width: "28px", height: "28px", color: "white" }} />
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "#1e1b4b",
              letterSpacing: "-1px", marginBottom: "16px",
            }}>
              {tt.ctaTitle || "Ready to Launch Your Community?"}
            </h2>
            <p style={{
              fontSize: "15px", color: "#64748b", maxWidth: "500px",
              margin: "0 auto 36px", lineHeight: 1.7,
            }}>
              {tt.ctaDesc || "Set up your private social network in minutes — no technical expertise required."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
              <a
                href="/create-clan"
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                  color: "white", padding: "14px 32px", borderRadius: "14px",
                  fontSize: "15px", fontWeight: 800, textDecoration: "none",
                  boxShadow: "0 8px 28px rgba(139,92,246,0.35)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 44px rgba(139,92,246,0.45)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(139,92,246,0.35)";
                }}
              >
                <span>{tt.buildSubdomain}</span>
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </a>
              <a
                href="#audiences"
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "white", border: "1.5px solid rgba(139,92,246,0.2)",
                  color: "#4c1d95", padding: "14px 28px", borderRadius: "14px",
                  fontSize: "15px", fontWeight: 700, textDecoration: "none",
                  transition: "all 0.25s ease",
                  boxShadow: "0 2px 12px rgba(139,92,246,0.1)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.35)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(139,92,246,0.16)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.2)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(139,92,246,0.1)";
                }}
              >
                <Users style={{ width: "15px", height: "15px", color: "#8b5cf6" }} />
                <span>See Who It's For</span>
              </a>
            </div>

            <div style={{
              display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center",
              gap: "20px", marginTop: "36px", paddingTop: "28px",
              borderTop: "1px solid rgba(139,92,246,0.12)",
            }}>
              {[
                { icon: ShieldCheck, label: "Admin-Verified Members" },
                { icon: Lock, label: "No Public Sign-ups" },
                { icon: Zap, label: "Instant Setup" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <Icon style={{ width: "15px", height: "15px", color: "#0d9488" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(139,92,246,0.1)",
        padding: "40px 1.5rem",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "center",
            justifyContent: "space-between", gap: "20px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "10px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #f97316 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(139,92,246,0.25)",
              }}>
                <Globe style={{ width: "16px", height: "16px", color: "white" }} />
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#1e1b4b" }}>MySocialClan</div>
                <div style={{ fontSize: "10px", color: "#94a3b8" }}>
                  © 2026 Vyanamics Technologies Pvt. Ltd. India
                </div>
              </div>
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.16)",
              borderRadius: "10px", padding: "8px 12px",
            }}>
              <Languages style={{ width: "14px", height: "14px", color: "#8b5cf6", flexShrink: 0 }} />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as SupportedLang)}
                style={{
                  background: "transparent", color: "#4c1d95", fontSize: "12px",
                  fontWeight: 600, outline: "none", cursor: "pointer", border: "none",
                }}
              >
                <option value="en">English (EN)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="ml">മലയാളം</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
                <option value="pt">Português</option>
                <option value="fil">Filipino</option>
              </select>
            </div>
          </div>
        </div>
      </footer>

      {/* Inline Keyframe Styles */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (min-width: 640px) { .sm-show { display: inline-block !important; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { transition: all 0.2s ease; }
      `}</style>
    </div>
  );
}
