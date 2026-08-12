"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type SupportedLang =
  | "en"
  | "ar"
  | "hi"
  | "ur"
  | "ml"
  | "es"
  | "fr"
  | "de"
  | "ja"
  | "pt"
  | "fil";

export const LANGUAGE_OPTIONS: { code: SupportedLang; label: string; flag?: string }[] = [
  { code: "en", label: "English (EN)" },
  { code: "ar", label: "العربية (Arabic - GCC)" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "ur", label: "اردو (Urdu)" },
  { code: "ml", label: "മലയാളം (Malayalam)" },
  { code: "es", label: "Español (ES)" },
  { code: "fr", label: "Français (FR)" },
  { code: "de", label: "Deutsch (DE)" },
  { code: "ja", label: "日本語 (Japanese)" },
  { code: "pt", label: "Português (Brasil)" },
  { code: "fil", label: "Filipino (Tagalog)" },
];

export interface Translations {
  // Common Navigation
  superAdmin: string;
  createClan: string;
  backHome: string;
  languageSelectLabel: string;
  
  // Landing Page
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

  // Create Clan Wizard (Internal Page)
  wizardTitle: string;
  wizardSubdomainStep: string;
  wizardSubdomainTitle: string;
  wizardSubdomainDesc: string;
  subdomainLabel: string;
  checkingAvailability: string;
  subdomainAvailableMsg: string;
  nextOrgDetails: string;
  wizardOrgStep: string;
  wizardOrgTitle: string;
  wizardOrgDesc: string;
  orgLogoLabel: string;
  orgNameLabel: string;
  orgDescLabel: string;
  orgCitiesLabel: string;
  orgUpiLabel: string;
  nextAdminDetails: string;
  wizardAdminStep: string;
  wizardAdminTitle: string;
  wizardAdminDesc: string;
  primaryLanguageLabel: string;
  adminNameLabel: string;
  adminEmailLabel: string;
  adminMobileLabel: string;
  nextModules: string;
  wizardModulesStep: string;
  wizardModulesTitle: string;
  wizardModulesDesc: string;
  submitSetupRequest: string;
  submittingRequest: string;
  wizardSuccessTitle: string;
  wizardSuccessDesc: string;
  doneReturnHome: string;
  backBtn: string;

  // Admin Portal (Internal Page)
  adminPortalTitle: string;
  adminPortalSub: string;
  pendingRequestsTitle: string;
  noPendingRequests: string;
  approveRegisterBtn: string;
  rejectBtn: string;
  activeCommunitiesTitle: string;
  noCommunities: string;
  adminLoginTitle?: string;
  adminLoginSub?: string;
  usernameLabel?: string;
  passwordLabel?: string;
  loginBtn?: string;
  invalidCredentialsMsg?: string;
  logoutBtn?: string;
}

const translations: Record<SupportedLang, Translations> = {
  en: {
    superAdmin: "Super Admin Portal",
    createClan: "Create Clan",
    backHome: "Back to Homepage",
    languageSelectLabel: "International Language:",
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
      "MySocialClan is 100% language-agnostic. Whether your global members converse in Arabic, English, Hindi, Urdu, Malayalam, Spanish, French, German, Japanese, Portuguese, or Filipino, your community feed adapts seamlessly.",
    modulesBadge: "Social Engine Modules",
    modulesTitle: "Powerful Features Included",
    modulesSubtitle: "Configure exactly which engagement tools your organization needs.",
    showcaseBadge: "Live Community Network",
    showcaseTitle: "Active Clans & Organizations",
    wizardTitle: "MySocialClan Setup Wizard",
    wizardSubdomainStep: "Step 1 · Custom Subdomain Address",
    wizardSubdomainTitle: "Choose Your Community Subdomain",
    wizardSubdomainDesc:
      "Your members and organization will access your portal via this custom domain address.",
    subdomainLabel: "Subdomain Address *",
    checkingAvailability: "Checking domain availability...",
    subdomainAvailableMsg: "is available!",
    nextOrgDetails: "Next: Organization Details",
    wizardOrgStep: "Step 2 · Branding & Information",
    wizardOrgTitle: "Organization Information",
    wizardOrgDesc: "Configure public branding and regional filters for your clan.",
    orgLogoLabel: "Organization Logo",
    orgNameLabel: "Organization / Clan Name *",
    orgDescLabel: "Description & Tagline",
    orgCitiesLabel: "Predefined Regional Cities (Comma-separated)",
    orgUpiLabel: "UPI ID or Account for Direct Member Support (Optional)",
    nextAdminDetails: "Next: Admin Details",
    wizardAdminStep: "Step 3 · Applicant Contact Info",
    wizardAdminTitle: "Administrator Contact Details",
    wizardAdminDesc:
      "We will notify you at this phone number once your dedicated database and subdomain deployment is active.",
    primaryLanguageLabel: "Primary Community Language *",
    adminNameLabel: "Admin Full Name *",
    adminEmailLabel: "Contact Email Address *",
    adminMobileLabel: "Contact Mobile / Phone Number *",
    nextModules: "Next: Configure Modules",
    wizardModulesStep: "Step 4 · Feature Configuration",
    wizardModulesTitle: "Select Enabled Modules",
    wizardModulesDesc: "Choose which social feature modules should be provisioned.",
    submitSetupRequest: "Submit Setup Request",
    submittingRequest: "Submitting Setup Request...",
    wizardSuccessTitle: "Community Setup Request Submitted!",
    wizardSuccessDesc:
      "Your request has been successfully received by our platform team.",
    doneReturnHome: "Done & Return to Homepage",
    backBtn: "Back",
    adminPortalTitle: "MySocialClan Platform Administration",
    adminPortalSub: "Standalone SaaS Platform Portal & Offline Provisioning Queue",
    pendingRequestsTitle: "Pending Community Creation Requests",
    noPendingRequests: "No pending community creation requests.",
    approveRegisterBtn: "Approve & Register",
    rejectBtn: "Reject",
    activeCommunitiesTitle: "Active Provisioned Communities",
    noCommunities: "No provisioned communities registered yet.",
  },
  ar: {
    superAdmin: "بوابة المسؤول الفائق",
    createClan: "إنشاء مجتمع (Clan)",
    backHome: "العودة إلى الصفحة الرئيسية",
    languageSelectLabel: "اللغات العالمية والخليجية:",
    badge: "منصة SaaS مستقلة عن اللغة للمجتمعات والمؤسسات العالمية والخليجية",
    heroTitle: "أنشئ شبكتك الاجتماعية الخاصة في خلال",
    minutes: "دقائق",
    heroDesc:
      "مكّن كليتك، أو شبكة الخريجين، أو جمعيتك المهنية، أو مجموعتك الاجتماعية بشبكة خاصة موثقة تحت نطاقك الفرعي المخصص.",
    buildSubdomain: "إنشاء نطاق فرعي للمجتمع",
    exploreCommunities: "استكشاف المجتمعات الحية",
    verifiedBadge: "شبكات خاصة موثقة 100%",
    verifiedSub: "محل ثقة الكليات وشبكات الخريجين والصناديق الدولية",
    audiencesBadge: "الجمهور المستهدف",
    audiencesTitle: "مصممة لتناسب كل أنواع الشبكات والمؤسسات",
    audiencesSubtitle:
      "توفير تواصل اجتماعي خاص وعالي الثقة عبر المؤسسات التعليمية والهيئات المهنية.",
    whyClosedBadge: "ميزة الشبكة المغلقة",
    whyClosedTitle: "لماذا تختار شبكة خاصة مغلقة بدلاً من المنصات العامة؟",
    whyClosedSubtitle:
      "تعطي المنصات العامة الأولوية للإعلانات وجمع البيانات. يوفر MySocialClan ملاذاً خالياً من الإعلانات لمجتمعك.",
    langAgnosticBadge: "منصة مستقلة عن اللغة",
    langAgnosticTitle: "عمل بسلاسة بأي لغة عالمية",
    langAgnosticDesc:
      "منصة MySocialClan مستقلة تماماً عن اللغة. سواء يتحدث أعضاؤك بالعربية، الإنجليزية، الهندية، أردو، أو أي لغة أخرى.",
    modulesBadge: "وحدات المحرك الاجتماعي",
    modulesTitle: "ميزات قوية متضمنة",
    modulesSubtitle: "قم بإعداد أدوات التفاعل التي تحتاجها مؤسستك بالضبط.",
    showcaseBadge: "شبكة المجتمعات الحية",
    showcaseTitle: "المجتمعات والمؤسسات النشطة",
    wizardTitle: "معالج إعداد MySocialClan",
    wizardSubdomainStep: "الخطوة 1 · عنوان النطاق الفرعي المخصص",
    wizardSubdomainTitle: "اختر النطاق الفرعي لمجتمعك",
    wizardSubdomainDesc:
      "سيدخل أعضاؤك ومؤسستك إلى البوابة الخاصة بك عبر هذا العنوان المخصص.",
    subdomainLabel: "عنوان النطاق الفرعي *",
    checkingAvailability: "جاري التحقق من توفر النطاق...",
    subdomainAvailableMsg: "متاح للاستخدام!",
    nextOrgDetails: "التالي: تفاصيل المؤسسة",
    wizardOrgStep: "الخطوة 2 · الهوية والمعلومات",
    wizardOrgTitle: "معلومات المؤسسة",
    wizardOrgDesc: "قم بإعداد العلامة التجارية والفلاتر الإقليمية لمجتمعك.",
    orgLogoLabel: "شعار المؤسسة",
    orgNameLabel: "اسم المؤسسة / المجتمع *",
    orgDescLabel: "الوصف والشعار اللفظي",
    orgCitiesLabel: "المدن الإقليمية (مفصولة بفواصل)",
    orgUpiLabel: "الحساب أو المعرف للدعم المباشر (اختياري)",
    nextAdminDetails: "التالي: تفاصيل المسؤول",
    wizardAdminStep: "الخطوة 3 · معلومات الاتصال بالمتقدم",
    wizardAdminTitle: "بيانات الاتصال بالمسؤول",
    wizardAdminDesc:
      "سنخطرك عبر رقم الهاتف هذا بمجرد تفعيل قاعدة البيانات والنطاق الفرعي الخاص بك.",
    primaryLanguageLabel: "اللغة الرئيسية للمجتمع *",
    adminNameLabel: "الاسم الكامل للمسؤول *",
    adminEmailLabel: "البريد الإلكتروني للاتصال *",
    adminMobileLabel: "رقم جوال المسؤول *",
    nextModules: "التالي: تهيئة الوحدات",
    wizardModulesStep: "الخطوة 4 · تهيئة الميزات",
    wizardModulesTitle: "حدد الوحدات المفعّلة",
    wizardModulesDesc: "اختر الوحدات والميزات الاجتماعية المطلوبة.",
    submitSetupRequest: "إرسال طلب الإعداد",
    submittingRequest: "جاري إرسال طلب الإعداد...",
    wizardSuccessTitle: "تم إرسال طلب إعداد المجتمع بنجاح!",
    wizardSuccessDesc: "استلم فريق المنصة طلبك بنجاح وسيتواصل معك قريباً.",
    doneReturnHome: "تم والعودة للصفحة الرئيسية",
    backBtn: "رجوع",
    adminPortalTitle: "إدارة منصة MySocialClan",
    adminPortalSub: "بوابة منصة SaaS وقائمة الانتظار للتفعيل",
    pendingRequestsTitle: "طلبات إنشاء المجتمعات المعلقة",
    noPendingRequests: "لا توجد طلبات معلقة حالياً.",
    approveRegisterBtn: "موافقة وتسجيل",
    rejectBtn: "رفض",
    activeCommunitiesTitle: "المجتمعات المفعّلة النشطة",
    noCommunities: "لا توجد مجتمعات مفعّلة مسجلة حتى الآن.",
  },
  hi: {
    superAdmin: "सुपर एडमिन पोर्टल",
    createClan: "क्लैन बनाएं",
    backHome: "मुख्य पृष्ठ पर वापस जाएं",
    languageSelectLabel: "अंतरराष्ट्रीय भाषाएं:",
    badge: "वैश्विक और जीसीसी समुदायों के लिए भाषा-स्वतंत्र SaaS प्लेटफ़ॉर्म",
    heroTitle: "अपना निजी सोशल नेटवर्क शुरू करें केवल कुछ",
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
      "सार्वजनिक प्लेटफॉर्म विज्ञापनों और डेटा ट्रैकिंग को प्राथमिकता देते हैं। MySocialClan सुरक्षित स्थान प्रदान करता है।",
    langAgnosticBadge: "भाषा-स्वतंत्र प्लेटफ़ॉर्म",
    langAgnosticTitle: "किसी भी अंतरराष्ट्रीय भाषा में आराम से काम करें",
    langAgnosticDesc:
      "MySocialClan 100% भाषा-स्वतंत्र है। आपके सदस्य अरबी, हिंदी, अंग्रेजी, उर्दू, या किसी भी भाषा में संवाद कर सकते हैं।",
    modulesBadge: "सोशल इंजन मॉड्यूल",
    modulesTitle: "शक्तिशाली सुविधाएं शामिल",
    modulesSubtitle: "अपनी आवश्यकतानुसार टूल कॉन्फ़िगर करें।",
    showcaseBadge: "लाइव समुदाय नेटवर्क",
    showcaseTitle: "सक्रिय क्लैन और संगठन",
    wizardTitle: "MySocialClan सेटअप विज़ार्ड",
    wizardSubdomainStep: "चरण 1 · कस्टम सबडोमेन पता",
    wizardSubdomainTitle: "अपना समुदाय सबडोमेन चुनें",
    wizardSubdomainDesc: "आपके सदस्य और संगठन इस पते के माध्यम से पोर्टल एक्सेस करेंगे।",
    subdomainLabel: "सबडोमेन पता *",
    checkingAvailability: "उपलब्धता की जाँच की जा रही है...",
    subdomainAvailableMsg: "उपलब्ध है!",
    nextOrgDetails: "आगे: संगठन का विवरण",
    wizardOrgStep: "चरण 2 · ब्रांडिंग और जानकारी",
    wizardOrgTitle: "संगठन की जानकारी",
    wizardOrgDesc: "अपने क्लैन के लिए सार्वजनिक ब्रांडिंग कॉन्फ़िगर करें।",
    orgLogoLabel: "संगठन का लोगो",
    orgNameLabel: "संगठन / क्लैन का नाम *",
    orgDescLabel: "विवरण और टैगलाइन",
    orgCitiesLabel: "क्षेत्रीय शहर (कॉमा-पृथक)",
    orgUpiLabel: "यूपीआई आईडी या खाता विवरण (वैकल्पिक)",
    nextAdminDetails: "आगे: एडमिन का विवरण",
    wizardAdminStep: "चरण 3 · आवेदक संपर्क जानकारी",
    wizardAdminTitle: "प्रशासक संपर्क विवरण",
    wizardAdminDesc: "सबडोमेन चालू होने पर हम आपको इस नंबर पर सूचित करेंगे।",
    primaryLanguageLabel: "प्राथमिक समुदाय भाषा *",
    adminNameLabel: "एडमिन का पूरा नाम *",
    adminEmailLabel: "संपर्क ईमेल पता *",
    adminMobileLabel: "एडमिन मोबाइल नंबर *",
    nextModules: "आगे: मॉड्यूल कॉन्फ़िगर करें",
    wizardModulesStep: "चरण 4 · सुविधा कॉन्फ़िगरेशन",
    wizardModulesTitle: "सक्षम किए गए मॉड्यूल चुनें",
    wizardModulesDesc: "चुनें कि कौन से सोशल मॉड्यूल चाहिए।",
    submitSetupRequest: "सेटअप अनुरोध जमा करें",
    submittingRequest: "अनुरोध जमा हो रहा है...",
    wizardSuccessTitle: "समुदाय सेटअप अनुरोध सफलतापूर्वक जमा हुआ!",
    wizardSuccessDesc: "आपकी प्रार्थना टीम को प्राप्त हो गई है।",
    doneReturnHome: "पूर्ण और मुख्य पृष्ठ पर लौटें",
    backBtn: "पीछे",
    adminPortalTitle: "MySocialClan प्लेटफ़ॉर्म प्रशासन",
    adminPortalSub: "स्टैंडअलोन SaaS प्लेटफ़ॉर्म पोर्टल और प्रोविजनिंग कतार",
    pendingRequestsTitle: "लंबित समुदाय निर्माण अनुरोध",
    noPendingRequests: "कोई लंबित अनुरोध नहीं है।",
    approveRegisterBtn: "स्वीकृत करें और पंजीकृत करें",
    rejectBtn: "अस्वीकार करें",
    activeCommunitiesTitle: "सक्रिय पंजीकृत समुदाय",
    noCommunities: "कोई सक्रिय समुदाय पंजीकृत नहीं है।",
  },
  ur: {
    superAdmin: "سپر ایڈمن پورٹل",
    createClan: "کلین بنائیں",
    backHome: "ہوم پیج پر واپس جائیں",
    languageSelectLabel: "بین الاقوامی زبانیں:",
    badge: "عالمی برادریوں اور جی سی سی خطے کے لیے زبان سے آزاد SaaS پلیٹ فارم",
    heroTitle: "صرف چند منٹوں میں اپنا پرائیویٹ سوشل نیٹ ورک",
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
      "پبلک پلیٹ فارم اشتہارات اور ڈیٹا ٹریکنگ کو ترجیح دیتے ہیں۔ MySocialClan محفوظ ماحول فراہم کرتا ہے۔",
    langAgnosticBadge: "ہر زبان کے لیے موزوں پلیٹ فارم",
    langAgnosticTitle: "کسی بھی عالمی زبان میں آسانی سے کام کریں",
    langAgnosticDesc:
      "MySocialClan 100% زبان سے آزاد ہے۔ آپ کے اراکین عربی، اردو، ہندی، یا انگریزی میں بات چیت کر سکتے ہیں۔",
    modulesBadge: "سوشل انجن ماڈیولز",
    modulesTitle: "طاقتور خصوصیات شامل ہیں",
    modulesSubtitle: "اپنی ضرورت کے مطابق خصوصیات کا انتخاب کریں۔",
    showcaseBadge: "لائیو کمیونٹی نیٹ ورک",
    showcaseTitle: "فعال کلینز اور تنظیمیں",
    wizardTitle: "MySocialClan سیٹ اپ وزارڈ",
    wizardSubdomainStep: "مرحلہ 1 · کسٹم سب ڈومین پتہ",
    wizardSubdomainTitle: "اپنی کمیونٹی کا سب ڈومین منتخب کریں",
    wizardSubdomainDesc: "آپ کے اراکین اس پتہ کے ذریعے پورٹل تک رسائی حاصل کریں گے۔",
    subdomainLabel: "سب ڈومین پتہ *",
    checkingAvailability: "دستیابی چیک کی جا رہی ہے...",
    subdomainAvailableMsg: "دستیاب ہے!",
    nextOrgDetails: "آگے: تنظیم کی تفصیلات",
    wizardOrgStep: "مرحلہ 2 · برانڈنگ اور معلومات",
    wizardOrgTitle: "تنظیم کی معلومات",
    wizardOrgDesc: "اپنی کمیونٹی کے لیے برانڈنگ اور فلٹرز ترتیب دیں۔",
    orgLogoLabel: "تنظیم کا لوگو",
    orgNameLabel: "تنظیم / کلین کا نام *",
    orgDescLabel: "تفصیل اور ٹیگ لائن",
    orgCitiesLabel: "علاقائی شہر",
    orgUpiLabel: "براہ راست تعاون کے لیے اکاؤنٹ تفصیلی معلومات",
    nextAdminDetails: "آگے: ایڈمن کی تفصیلات",
    wizardAdminStep: "مرحلہ 3 · رابطہ کی معلومات",
    wizardAdminTitle: "ایڈمنسٹریٹر رابطہ تفصیلات",
    wizardAdminDesc: "سب ڈومین فعال ہونے پر ہم آپ کو اس نمبر پر مطلع کریں گے۔",
    primaryLanguageLabel: "کمیونٹی کی بنیادی زبان *",
    adminNameLabel: "ایڈمن کا مکمل نام *",
    adminEmailLabel: "رابطہ ای میل ایڈریس *",
    adminMobileLabel: "ایڈمن موبائل نمبر *",
    nextModules: "آگے: ماڈیولز سیٹ کریں",
    wizardModulesStep: "مرحلہ 4 · فیچر سیٹنگ",
    wizardModulesTitle: "فعال ماڈیولز منتخب کریں",
    wizardModulesDesc: "مطلوبہ سوشل ماڈیولز کا انتخاب کریں۔",
    submitSetupRequest: "سیٹ اپ درخواست جمع کریں",
    submittingRequest: "درخواست جمع ہو رہی ہے...",
    wizardSuccessTitle: "کمیونٹی سیٹ اپ درخواست جمع ہو گئی!",
    wizardSuccessDesc: "آپ کی درخواست موصول ہو گئی ہے۔",
    doneReturnHome: "مکمل اور ہوم پیج پر جائیں",
    backBtn: "واپس",
    adminPortalTitle: "MySocialClan پلیٹ فارم ایڈمنسٹریشن",
    adminPortalSub: "SaaS پلیٹ فارم پورٹل",
    pendingRequestsTitle: "زیر التواء درخواستیں",
    noPendingRequests: "کوئی زیر التواء درخواست نہیں ہے۔",
    approveRegisterBtn: "منظور اور رجسٹر کریں",
    rejectBtn: "مسترد کریں",
    activeCommunitiesTitle: "فعال کمیونٹیز",
    noCommunities: "کوئی رجسٹرڈ کمیونٹی نہیں ہے۔",
  },
  ml: {
    superAdmin: "സൂപ്പർ അഡ്മിൻ പോർട്ടൽ",
    createClan: "ക്ലാൻ ഉണ്ടാക്കുക",
    backHome: "ഹോം പേജിലേക്ക് മടങ്ങുക",
    languageSelectLabel: "അന്താരാഷ്ട്ര ഭാഷകൾ:",
    badge: "ഗ്ലോബൽ & ജിസിസി കമ്മ്യൂണിറ്റികൾക്കായുള്ള ഭാഷാ-സ്വതന്ത്ര SaaS പ്ലാറ്റ്ഫോം",
    heroTitle: "നിങ്ങളുടെ സ്വകാര്യ സോഷ്യൽ നെറ്റ്‌വർക്ക് ആരംഭിക്കൂ വെറും",
    minutes: "മിനിറ്റുകൾക്കുള്ളിൽ",
    heroDesc:
      "നിങ്ങളുടെ കോളേജ്, അലുമിനൈ നെറ്റ്‌വർക്ക്, പ്രൊഫഷണൽ ഓർഗനൈസേഷൻ എന്നിവയ്ക്ക് സുരക്ഷിതമായ സോഷ്യൽ നെറ്റ്‌വർക്ക് നിർമ്മിക്കൂ.",
    buildSubdomain: "സബ്‌ഡൊമെയ്‌ൻ നിർമ്മിക്കുക",
    exploreCommunities: "കമ്മ്യൂണിറ്റികൾ കാണുക",
    verifiedBadge: "100% വെരിഫൈഡ് പ്രൈവറ്റ് നെറ്റ്‌വർക്കുകൾ",
    verifiedSub: "കോളേജുകളും അലുമിനൈ ഓർഗനൈസേഷനുകളും വിശ്വസിക്കുന്ന പ്ലാറ്റ്‌ഫോം",
    audiencesBadge: "ടാർഗെറ്റ് ഗ്രൂപ്പുകൾ",
    audiencesTitle: "എല്ലാ തരം ഓർഗനൈസേഷനുകൾക്കും അനുയോജ്യം",
    audiencesSubtitle:
      "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ, പ്രൊഫഷണൽ ഗ്രൂപ്പുകൾ എന്നിവയ്ക്ക് സുരക്ഷിതമായ നെറ്റ്‌വർക്ക്.",
    whyClosedBadge: "പ്രൈവറ്റ് നെറ്റ്‌വർക്കിന്റെ നേട്ടങ്ങൾ",
    whyClosedTitle: "പൊതു സോഷ്യൽ മീഡിയകൾക്ക് പകരം പ്രൈവറ്റ് നെറ്റ്‌വർക്ക് തിരഞ്ഞെടുക്കുന്നത് എന്തുകൊണ്ട്?",
    whyClosedSubtitle:
      "പൊതു പ്ലാറ്റ്‌ഫോമുകൾ പരസ്യങ്ങൾക്ക് മുൻഗണന നൽകുന്നു. MySocialClan സുരക്ഷിത ഇടം നൽകുന്നു.",
    langAgnosticBadge: "ഭാഷാ-സ്വതന്ത്ര പ്ലാറ്റ്‌ഫോം",
    langAgnosticTitle: "ഏത് അന്താരാഷ്ട്ര ഭാഷയിലും എളുപ്പത്തിൽ ഉപയോഗിക്കാം",
    langAgnosticDesc:
      "MySocialClan പൂർണ്ണമായും ഭാഷാ-സ്വതന്ത്രമാണ്. അറബിക്, മലയാളം, ഹിന്ദി, ഉർദു തുടങ്ങി ഏത് ഭാഷയിലും ഉപയോഗിക്കാം.",
    modulesBadge: "സോഷ്യൽ എഞ്ചിൻ മൊഡ്യൂളുകൾ",
    modulesTitle: "ശക്തമായ സവിശേഷതകൾ ഉൾപ്പെടുത്തിയിരിക്കുന്നു",
    modulesSubtitle: "നിങ്ങളുടെ ഓർഗനൈസേഷന് ആവശ്യമായ ടൂളുകൾ തിരഞ്ഞെക്കുക.",
    showcaseBadge: "ലൈവ് കമ്മ്യൂണിറ്റി നെറ്റ്‌വർക്ക്",
    showcaseTitle: "ആക്ടീവ് കൂട്ടായ്മകൾ",
    wizardTitle: "MySocialClan സെറ്റപ്പ് വിസാർഡ്",
    wizardSubdomainStep: "ഘട്ടം 1 · കസ്റ്റം സബ്‌ഡൊമെയ്‌ൻ വിലാസം",
    wizardSubdomainTitle: "നിങ്ങളുടെ കമ്മ്യൂണിറ്റി സബ്‌ഡൊമെയ്‌ൻ തിരഞ്ഞെടുക്കുക",
    wizardSubdomainDesc: "അംഗങ്ങൾ ഈ വിലാസം വഴി പോർട്ടലിലേക്ക് പ്രവേശിക്കും.",
    subdomainLabel: "സബ്‌ഡൊമെയ്‌ൻ വിലാസം *",
    checkingAvailability: "പരിശോധിക്കുന്നു...",
    subdomainAvailableMsg: "ലഭ്യമാണ്!",
    nextOrgDetails: "അടുത്തത്: ഓർഗനൈസേഷൻ വിവരങ്ങൾ",
    wizardOrgStep: "ഘട്ടം 2 · ബ്രാൻഡിംഗും വിവരങ്ങളും",
    wizardOrgTitle: "ഓർഗനൈസേഷൻ വിവരങ്ങൾ",
    wizardOrgDesc: "നിങ്ങളുടെ ക്ലാനിനായുള്ള ബ്രാൻഡിംഗ് ക്രമീകരിക്കുക.",
    orgLogoLabel: "ഓർഗനൈസേഷൻ ലോഗോ",
    orgNameLabel: "ഓർഗനൈസേഷൻ / ക്ലാൻ പേര് *",
    orgDescLabel: "വിവരണം",
    orgCitiesLabel: "നഗരങ്ങൾ",
    orgUpiLabel: "അക്കൗണ്ട് വിവരങ്ങൾ (ഓപ്ഷണൽ)",
    nextAdminDetails: "അടുത്തത്: അഡ്മിൻ വിവരങ്ങൾ",
    wizardAdminStep: "ഘട്ടം 3 · ബന്ധപ്പെടേണ്ട വിവരങ്ങൾ",
    wizardAdminTitle: "അഡ്മിനിസ്ട്രേറ്റർ വിവരങ്ങൾ",
    wizardAdminDesc: "പോർട്ടൽ ലൈവാകുമ്പോൾ ഈ നമ്പറിലേക്ക് വിവരമറിയിക്കും.",
    primaryLanguageLabel: "പ്രധാന കമ്മ്യൂണിറ്റി ഭാഷ *",
    adminNameLabel: "അഡ്മിൻ പേര് *",
    adminEmailLabel: "ബന്ധപ്പെടേണ്ട ഇമെയിൽ വിലാസം *",
    adminMobileLabel: "ഫോൺ നമ്പർ *",
    nextModules: "അടുത്തത്: മൊഡ്യൂളുകൾ ക്രമീകരിക്കുക",
    wizardModulesStep: "ഘട്ടം 4 · ഫീച്ചറുകൾ",
    wizardModulesTitle: "ആവശ്യമായ മൊഡ്യൂളുകൾ തിരഞ്ഞെടുക്കുക",
    wizardModulesDesc: "സോഷ്യൽ മൊഡ്യൂളുകൾ തിരഞ്ഞെടുക്കുക.",
    submitSetupRequest: "അപേക്ഷ സമർപ്പിക്കുക",
    submittingRequest: "സമർപ്പിക്കുന്നു...",
    wizardSuccessTitle: "സെറ്റപ്പ് അപേക്ഷ സമർപ്പിച്ചു!",
    wizardSuccessDesc: "നിങ്ങളുടെ അപേക്ഷ വിജയകരമായി ലഭിച്ചു.",
    doneReturnHome: "പൂർത്തിയായി, ഹോം പേജിലേക്ക് പോകുക",
    backBtn: "പിന്നോട്ട്",
    adminPortalTitle: "MySocialClan പ്ലാറ്റ്‌ഫോം അഡ്മിനിസ്ട്രേഷൻ",
    adminPortalSub: "SaaS പ്ലാറ്റ്‌ഫോം പോർട്ടൽ",
    pendingRequestsTitle: "തീർപ്പുകൽപ്പിക്കാത്ത അപേക്ഷകൾ",
    noPendingRequests: "അപേക്ഷകളൊന്നുമില്ല.",
    approveRegisterBtn: "അംഗീകരിക്കുക",
    rejectBtn: "നിരസിക്കുക",
    activeCommunitiesTitle: "ആക്ടീവ് കമ്മ്യൂണിറ്റികൾ",
    noCommunities: "രജിസ്റ്റർ ചെയ്ത കമ്മ്യൂണിറ്റികളൊന്നുമില്ല.",
  },
  es: {
    superAdmin: "Portal Super Admin",
    createClan: "Crear Clan",
    backHome: "Volver a la Página Principal",
    languageSelectLabel: "Idioma Internacional:",
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
    audiencesSubtitle: "Conectando instituciones educativas, gremios profesionales y ONGs.",
    whyClosedBadge: "Ventajas de una Red Cerrada",
    whyClosedTitle: "¿Por qué elegir una Red Privada Cerrada frente a Redes Públicas?",
    whyClosedSubtitle:
      "Las redes públicas rastrean datos y muestran publicidad masiva. MySocialClan ofrece un espacio seguro.",
    langAgnosticBadge: "Plataforma Independiente del Idioma",
    langAgnosticTitle: "Opere Cómodamente en Cualquier Idioma Internacional",
    langAgnosticDesc:
      "MySocialClan es 100% independiente del idioma. Sus miembros pueden comunicarse en cualquier idioma.",
    modulesBadge: "Módulos Sociales",
    modulesTitle: "Características Potentes Incluidas",
    modulesSubtitle: "Configure exactamente las herramientas que necesita.",
    showcaseBadge: "Redes en Vivo",
    showcaseTitle: "Comunidades Activas",
    wizardTitle: "Asistente de Configuración MySocialClan",
    wizardSubdomainStep: "Paso 1 · Dirección de Subdominio",
    wizardSubdomainTitle: "Elija el Subdominio de su Comunidad",
    wizardSubdomainDesc: "Sus miembros accederán a su portal a través de esta dirección.",
    subdomainLabel: "Dirección de Subdominio *",
    checkingAvailability: "Comprobando disponibilidad...",
    subdomainAvailableMsg: "¡está disponible!",
    nextOrgDetails: "Siguiente: Detalles de la Organización",
    wizardOrgStep: "Paso 2 · Información y Marca",
    wizardOrgTitle: "Información de la Organización",
    wizardOrgDesc: "Configure la marca pública de su clan.",
    orgLogoLabel: "Logo de la Organización",
    orgNameLabel: "Nombre del Clan / Organización *",
    orgDescLabel: "Descripción",
    orgCitiesLabel: "Ciudades Regionales",
    orgUpiLabel: "Cuenta / UPI (Opcional)",
    nextAdminDetails: "Siguiente: Detalles del Administrador",
    wizardAdminStep: "Paso 3 · Información de Contacto",
    wizardAdminTitle: "Datos de Contacto del Administrador",
    wizardAdminDesc: "Le notificaremos a este número de teléfono cuando su subdominio esté activo.",
    primaryLanguageLabel: "Idioma Principal de la Comunidad *",
    adminNameLabel: "Nombre Completo del Administrador *",
    adminEmailLabel: "Correo Electrónico de Contacto *",
    adminMobileLabel: "Teléfono Móvil del Administrador *",
    nextModules: "Siguiente: Configurar Módulos",
    wizardModulesStep: "Paso 4 · Configuración de Módulos",
    wizardModulesTitle: "Seleccione Módulos Habilitados",
    wizardModulesDesc: "Elija las herramientas sociales requeridas.",
    submitSetupRequest: "Enviar Solicitud",
    submittingRequest: "Enviando solicitud...",
    wizardSuccessTitle: "¡Solicitud Enviada con Éxito!",
    wizardSuccessDesc: "Su solicitud ha sido recibida por nuestro equipo.",
    doneReturnHome: "Listo y Volver al Inicio",
    backBtn: "Atrás",
    adminPortalTitle: "Administración MySocialClan",
    adminPortalSub: "Portal SaaS de Administración",
    pendingRequestsTitle: "Solicitudes Pendientes",
    noPendingRequests: "No hay solicitudes pendientes.",
    approveRegisterBtn: "Aprobar y Registrar",
    rejectBtn: "Rechazar",
    activeCommunitiesTitle: "Comunidades Activas",
    noCommunities: "No hay comunidades registradas aún.",
  },
  fr: {
    superAdmin: "Portail Super Admin",
    createClan: "Créer un Clan",
    backHome: "Retour à l'accueil",
    languageSelectLabel: "Langue internationale:",
    badge: "Plateforme SaaS Multilingue pour Communautés et Institutions Globales",
    heroTitle: "Lancez votre réseau social privé en quelques",
    minutes: "Minutes",
    heroDesc:
      "Offrez à votre université, réseau d'anciens élèves ou ONG un réseau privé sécurisé.",
    buildSubdomain: "Créer un sous-domaine",
    exploreCommunities: "Explorer les communautés",
    verifiedBadge: "Réseaux privés 100% vérifiés",
    verifiedSub: "Adopté par les universités et réseaux d'anciens élèves",
    audiencesBadge: "Publics cibles",
    audiencesTitle: "Conçu pour tous les types d'organisations",
    audiencesSubtitle: "Connectez vos étudiants, réseaux d'anciens élèves et associations.",
    whyClosedBadge: "Avantage du réseau fermé",
    whyClosedTitle: "Pourquoi choisir un réseau fermé plutôt que des réseaux publics ?",
    whyClosedSubtitle: "MySocialClan offre un espace privé, sans publicité et sécurisé.",
    langAgnosticBadge: "Plateforme indépendante de la langue",
    langAgnosticTitle: "Fonctionne dans toutes les langues internationales",
    langAgnosticDesc: "MySocialClan s'adapte à n'importe quelle langue internationale.",
    modulesBadge: "Modules sociaux",
    modulesTitle: "Fonctionnalités puissantes incluses",
    modulesSubtitle: "Configurez les outils adaptés à vos besoins.",
    showcaseBadge: "Réseaux en direct",
    showcaseTitle: "Communautés actives",
    wizardTitle: "Assistant de configuration MySocialClan",
    wizardSubdomainStep: "Étape 1 · Sous-domaine personnalisé",
    wizardSubdomainTitle: "Choisissez le sous-domaine de votre communauté",
    wizardSubdomainDesc: "Vos membres accéderont à votre portail via cette adresse.",
    subdomainLabel: "Adresse du sous-domaine *",
    checkingAvailability: "Vérification de la disponibilité...",
    subdomainAvailableMsg: "est disponible !",
    nextOrgDetails: "Suivant: Informations sur l'organisation",
    wizardOrgStep: "Étape 2 · Marque et informations",
    wizardOrgTitle: "Informations sur l'organisation",
    wizardOrgDesc: "Configurez l'image de marque de votre clan.",
    orgLogoLabel: "Logo de l'organisation",
    orgNameLabel: "Nom de l'organisation *",
    orgDescLabel: "Description",
    orgCitiesLabel: "Villes régionales",
    orgUpiLabel: "Compte / UPI (Optionnel)",
    nextAdminDetails: "Suivant: Détails de l'administrateur",
    wizardAdminStep: "Étape 3 · Coordonnées de l'administrateur",
    wizardAdminTitle: "Détails du contact administrateur",
    wizardAdminDesc: "Nous vous informerons sur ce numéro une fois votre sous-domaine actif.",
    primaryLanguageLabel: "Langue Principale de la Communauté *",
    adminNameLabel: "Nom complet de l'administrateur *",
    adminEmailLabel: "Adresse E-mail de Contact *",
    adminMobileLabel: "Téléphone de l'administrateur *",
    nextModules: "Suivant: Configurer les modules",
    wizardModulesStep: "Étape 4 · Configuration des modules",
    wizardModulesTitle: "Sélectionnez les modules",
    wizardModulesDesc: "Choisissez les outils sociaux à activer.",
    submitSetupRequest: "Soumettre la demande",
    submittingRequest: "Envoi de la demande...",
    wizardSuccessTitle: "Demande soumise avec succès !",
    wizardSuccessDesc: "Votre demande a été bien reçue par notre équipe.",
    doneReturnHome: "Terminé & Retour à l'accueil",
    backBtn: "Retour",
    adminPortalTitle: "Administration MySocialClan",
    adminPortalSub: "Portail d'administration SaaS",
    pendingRequestsTitle: "Demandes en attente",
    noPendingRequests: "Aucune demande en attente.",
    approveRegisterBtn: "Approuver & Enregistrer",
    rejectBtn: "Refuser",
    activeCommunitiesTitle: "Communautés actives",
    noCommunities: "Aucune communauté enregistrée pour le moment.",
  },
  de: {
    superAdmin: "Super Admin Portal",
    createClan: "Clan erstellen",
    backHome: "Zurück zur Startseite",
    languageSelectLabel: "Internationale Sprache:",
    badge: "Sprachenunabhängige SaaS-Plattform für globale Gemeinschaften",
    heroTitle: "Starten Sie Ihr privates soziales Netzwerk in",
    minutes: "Minuten",
    heroDesc: "Ermöglichen Sie Ihrer Hochschule oder Ihrem Alumni-Netzwerk ein verifiziertes privates Netzwerk.",
    buildSubdomain: "Subdomain erstellen",
    exploreCommunities: "Live-Communities erkunden",
    verifiedBadge: "100% verifizierte geschlossene Netzwerke",
    verifiedSub: "Vertraut von Universitäten und internationalen Netzwerken",
    audiencesBadge: "Zielgruppen",
    audiencesTitle: "Maßgeschneidert für jede Art von Netzwerk",
    audiencesSubtitle: "Verbindet Bildungseinrichtungen, Berufsverbände und gemeinnützige Organisationen.",
    whyClosedBadge: "Vorteile eines geschlossenen Netzwerks",
    whyClosedTitle: "Warum ein geschlossenes Netzwerk statt öffentlicher Plattformen?",
    whyClosedSubtitle: "MySocialClan bietet einen werbefreien, geschützten Raum für Ihre Community.",
    langAgnosticBadge: "Sprachenunabhängige Plattform",
    langAgnosticTitle: "Nativ in jeder internationalen Sprache nutzbar",
    langAgnosticDesc: "MySocialClan unterstützt alle internationalen Sprachen.",
    modulesBadge: "Soziale Module",
    modulesTitle: "Leistungsstarke Funktionen enthalten",
    modulesSubtitle: "Konfigurieren Sie genau die Tools, die Sie benötigen.",
    showcaseBadge: "Live-Netzwerk",
    showcaseTitle: "Aktive Communities",
    wizardTitle: "MySocialClan Setup-Assistent",
    wizardSubdomainStep: "Schritt 1 · Benutzerdefinierte Subdomain-Adresse",
    wizardSubdomainTitle: "Wählen Sie Ihre Community-Subdomain",
    wizardSubdomainDesc: "Ihre Mitglieder greifen über diese Adresse auf Ihr Portal zu.",
    subdomainLabel: "Subdomain-Adresse *",
    checkingAvailability: "Verfügbarkeit wird geprüft...",
    subdomainAvailableMsg: "ist verfügbar!",
    nextOrgDetails: "Weiter: Organisationsdetails",
    wizardOrgStep: "Schritt 2 · Branding & Informationen",
    wizardOrgTitle: "Organisationsinformationen",
    wizardOrgDesc: "Konfigurieren Sie das Branding für Ihren Clan.",
    orgLogoLabel: "Organisationslogo",
    orgNameLabel: "Name der Organisation / des Clans *",
    orgDescLabel: "Beschreibung",
    orgCitiesLabel: "Regionale Städte",
    orgUpiLabel: "Konto / UPI (Optional)",
    nextAdminDetails: "Weiter: Admin-Details",
    wizardAdminStep: "Schritt 3 · Kontaktdaten des Antragstellers",
    wizardAdminTitle: "Kontaktdaten des Administrators",
    wizardAdminDesc: "Wir benachrichtigen Sie unter dieser Nummer, sobald Ihre Subdomain aktiv ist.",
    primaryLanguageLabel: "Primäre Community-Sprache *",
    adminNameLabel: "Vollständiger Name des Admins *",
    adminEmailLabel: "Kontakt-E-Mail-Adresse *",
    adminMobileLabel: "Mobilnummer des Admins *",
    nextModules: "Weiter: Module konfigurieren",
    wizardModulesStep: "Schritt 4 · Feature-Konfiguration",
    wizardModulesTitle: "Aktivierte Module auswählen",
    wizardModulesDesc: "Wählen Sie die erforderlichen sozialen Tools aus.",
    submitSetupRequest: "Setup-Anfrage absenden",
    submittingRequest: "Anfrage wird gesendet...",
    wizardSuccessTitle: "Setup-Anfrage erfolgreich eingereicht!",
    wizardSuccessDesc: "Ihre Anfrage wurde erfolgreich von unserem Team empfangen.",
    doneReturnHome: "Fertig & Zurück zur Startseite",
    backBtn: "Zurück",
    adminPortalTitle: "MySocialClan Plattform-Administration",
    adminPortalSub: "Eigenständiges SaaS-Plattformportal",
    pendingRequestsTitle: "Ausstehende Anfragen zur Community-Erstellung",
    noPendingRequests: "Keine ausstehenden Anfragen vorhanden.",
    approveRegisterBtn: "Genehmigen & Registrieren",
    rejectBtn: "Ablehnen",
    activeCommunitiesTitle: "Aktive registrierte Communities",
    noCommunities: "Noch keine aktiven Communities registriert.",
  },
  ja: {
    superAdmin: "スーパー管理者ポータル",
    createClan: "クランを作成",
    backHome: "ホームページに戻る",
    languageSelectLabel: "言語選択:",
    badge: "グローバルコミュニティおよび機関向け言語非依存SaaSプラットフォーム",
    heroTitle: "プライベートなSNSをわずか数",
    minutes: "分で開設",
    heroDesc: "大学、同窓会、業界団体、NGO向けに専用サブドメインで認証付きプライベートネットワークを提供します。",
    buildSubdomain: "サブドメインを作成",
    exploreCommunities: "ライブコミュニティを見る",
    verifiedBadge: "100%認証済み非公開ネットワーク",
    verifiedSub: "大学や世界的な同窓会組織が信頼する安全なプラットフォーム",
    audiencesBadge: "対象組織",
    audiencesTitle: "あらゆる組織の形態に対応",
    audiencesSubtitle: "教育機関、専門団体、同窓会の交流を支援します。",
    whyClosedBadge: "非公開ネットワークの強み",
    whyClosedTitle: "パブリックSNSではなく非公開ネットワークを選ぶ理由",
    whyClosedSubtitle: "MySocialClanは広告のない安全で信頼性の高い環境を提供します。",
    langAgnosticBadge: "言語非依存プラットフォーム",
    langAgnosticTitle: "あらゆる国際言語で快適に運用",
    langAgnosticDesc: "日本語、英語、アラビア語、ヒンディー語など、グローバル言語に完全対応しています。",
    modulesBadge: "ソーシャル機能",
    modulesTitle: "充実したモジュール機能",
    modulesSubtitle: "組織のニーズに合わせて必要な機能を自由に設定できます。",
    showcaseBadge: "ライブネットワーク",
    showcaseTitle: "アクティブなコミュニティ",
    wizardTitle: "MySocialClan セットアップウィザード",
    wizardSubdomainStep: "ステップ 1 · カスタムサブドメインアドレス",
    wizardSubdomainTitle: "コミュニティサブドメインの選択",
    wizardSubdomainDesc: "メンバーと組織はこのアドレスからポータルにアクセスします。",
    subdomainLabel: "サブドメインアドレス *",
    checkingAvailability: "ドメインの空き状況を確認中...",
    subdomainAvailableMsg: "利用可能です！",
    nextOrgDetails: "次へ: 組織の詳細情報",
    wizardOrgStep: "ステップ 2 · ブランディングと情報",
    wizardOrgTitle: "組織情報の設定",
    wizardOrgDesc: "クランの公開ブランディングと地域設定を行います。",
    orgLogoLabel: "組織ロゴ",
    orgNameLabel: "組織 / クラン名 *",
    orgDescLabel: "説明とキャッチコピー",
    orgCitiesLabel: "対象地域・都市（カンマ区切り）",
    orgUpiLabel: "決済・寄付口座情報（任意）",
    nextAdminDetails: "次へ: 管理者情報",
    wizardAdminStep: "ステップ 3 · 申請者連絡先",
    wizardAdminTitle: "管理者連絡先詳細",
    wizardAdminDesc: "サブドメインが開通した際、この電話番号にご連絡します。",
    primaryLanguageLabel: "コミュニティの主要言語 *",
    adminNameLabel: "管理者氏名 *",
    adminEmailLabel: "連絡先メールアドレス *",
    adminMobileLabel: "管理者携帯番号 *",
    nextModules: "次へ: モジュールの設定",
    wizardModulesStep: "ステップ 4 · 機能の設定",
    wizardModulesTitle: "有効化するモジュールの選択",
    wizardModulesDesc: "必要なソーシャル機能を選択してください。",
    submitSetupRequest: "セットアップ申請を送信",
    submittingRequest: "申請を送信中...",
    wizardSuccessTitle: "コミュニティ申請が正常に送信されました！",
    wizardSuccessDesc: "チームにて申請を受領しました。確認の上開通いたします。",
    doneReturnHome: "完了してホームページに戻る",
    backBtn: "戻る",
    adminPortalTitle: "MySocialClan プラットフォーム管理",
    adminPortalSub: "SaaSプラットフォームポータルおよび開設待ちキュー",
    pendingRequestsTitle: "承認待ちのコミュニティ開設リクエスト",
    noPendingRequests: "現在承認待ちのリクエストはありません。",
    approveRegisterBtn: "承認して登録",
    rejectBtn: "却下",
    activeCommunitiesTitle: "アクティブな登録済みコミュニティ",
    noCommunities: "登録済みのコミュニティはまだありません。",
  },
  pt: {
    superAdmin: "Portal Super Admin",
    createClan: "Criar Clan",
    backHome: "Voltar para a Página Inicial",
    languageSelectLabel: "Idioma Internacional:",
    badge: "Plataforma SaaS Multilíngue para Comunidades e Instituições Globais",
    heroTitle: "Crie sua Rede Social Privada em apenas",
    minutes: "Minutos",
    heroDesc: "Capacite sua universidade ou associação com uma rede privada verificada no seu próprio subdomínio.",
    buildSubdomain: "Criar Subdomínio",
    exploreCommunities: "Explorar Comunidades",
    verifiedBadge: "Redes Privadas 100% Verificadas",
    verifiedSub: "Confiança garantida para faculdades, ex-alunos e associações",
    audiencesBadge: "Públicos-Alvo",
    audiencesTitle: "Projetado para Todos os Tipos de Organizações",
    audiencesSubtitle: "Conectando instituições de ensino e associações profissionais.",
    whyClosedBadge: "Vantagens da Rede Fechada",
    whyClosedTitle: "Por que escolher uma Rede Privada Fechada em vez de Redes Públicas?",
    whyClosedSubtitle: "O MySocialClan oferece um espaço seguro e livre de anúncios.",
    langAgnosticBadge: "Plataforma Independente de Idioma",
    langAgnosticTitle: "Opere em Qualquer Idioma Internacional",
    langAgnosticDesc: "O MySocialClan suporta nativamente qualquer idioma internacional.",
    modulesBadge: "Módulos Sociais",
    modulesTitle: "Recursos Potentes Incluídos",
    modulesSubtitle: "Configure exatamente as ferramentas que sua organização precisa.",
    showcaseBadge: "Redes em Destaque",
    showcaseTitle: "Comunidades Ativas",
    wizardTitle: "Assistente de Configuração MySocialClan",
    wizardSubdomainStep: "Etapa 1 · Endereço de Subdomínio Personalizado",
    wizardSubdomainTitle: "Escolha o Subdomínio da sua Comunidade",
    wizardSubdomainDesc: "Seus membros acessarão seu portal por este endereço.",
    subdomainLabel: "Endereço do Subdomínio *",
    checkingAvailability: "Verificando disponibilidade...",
    subdomainAvailableMsg: "está disponível!",
    nextOrgDetails: "Próximo: Detalhes da Organização",
    wizardOrgStep: "Etapa 2 · Marca e Informações",
    wizardOrgTitle: "Informações da Organização",
    wizardOrgDesc: "Configure a marca pública do seu clan.",
    orgLogoLabel: "Logotipo da Organização",
    orgNameLabel: "Nome da Organização / Clan *",
    orgDescLabel: "Descrição",
    orgCitiesLabel: "Cidades Regionais",
    orgUpiLabel: "Conta / UPI (Opcional)",
    nextAdminDetails: "Próximo: Detalhes do Administrador",
    wizardAdminStep: "Etapa 3 · Informações de Contato",
    wizardAdminTitle: "Dados de Contato do Administrador",
    wizardAdminDesc: "Notificaremos você neste número quando seu subdomínio estiver ativo.",
    primaryLanguageLabel: "Idioma Principal da Comunidade *",
    adminNameLabel: "Nome Completo do Administrador *",
    adminEmailLabel: "E-mail de Contato *",
    adminMobileLabel: "Telefone Celular do Administrador *",
    nextModules: "Próximo: Configurar Módulos",
    wizardModulesStep: "Etapa 4 · Configuração de Recursos",
    wizardModulesTitle: "Selecione os Módulos Ativados",
    wizardModulesDesc: "Escolha as ferramentas sociais necessárias.",
    submitSetupRequest: "Enviar Solicitação de Configuração",
    submittingRequest: "Enviando solicitação...",
    wizardSuccessTitle: "Solicitação Enviada com Sucesso!",
    wizardSuccessDesc: "Sua solicitação foi recebida com sucesso pela nossa equipe.",
    doneReturnHome: "Concluído e Voltar à Página Inicial",
    backBtn: "Voltar",
    adminPortalTitle: "Administração MySocialClan",
    adminPortalSub: "Portal SaaS de Administração",
    pendingRequestsTitle: "Solicitações Pendentes de Criação",
    noPendingRequests: "Nenhuma solicitação pendente no momento.",
    approveRegisterBtn: "Aprovar e Registrar",
    rejectBtn: "Rejeitar",
    activeCommunitiesTitle: "Comunidades Ativas",
    noCommunities: "Nenhuma comunidade registrada ainda.",
  },
  fil: {
    superAdmin: "Super Admin Portal",
    createClan: "Lumikha ng Clan",
    backHome: "Bumalik sa Homepage",
    languageSelectLabel: "Pandaigdigang Wika:",
    badge: "Platform na Hindi Nakadepende sa Wika para sa mga Pandaigdigang Komunidad",
    heroTitle: "Simulan ang Iyong Pribadong Social Network sa Loob Lamang ng Ilang",
    minutes: "Minuto",
    heroDesc:
      "Bigyan ng kapangyarihan ang iyong kolehiyo, alumni network, o NGO gamit ang isang pribadong network sa ilalim ng iyong subdomain.",
    buildSubdomain: "Gumawa ng Subdomain",
    exploreCommunities: "Tuklasin ang mga Komunidad",
    verifiedBadge: "100% Na-verify na Pribadong Network",
    verifiedSub: "Pinagkakatiwalaan ng mga kolehiyo at alumni network",
    audiencesBadge: "Mga Target na Grupo",
    audiencesTitle: "Idinisenyo para sa Lahat ng Uri ng Organisasyon",
    audiencesSubtitle: "Paghahatid ng pribado at ligtas na koneksyon sa mga organisasyon.",
    whyClosedBadge: "Kalamangan ng Pribadong Network",
    whyClosedTitle: "Bakit Piliin ang Pribadong Network Kaysa sa Pampublikong Social Media?",
    whyClosedSubtitle: "Ang MySocialClan ay nagbibigay ng ligtas at walang ad na lugar para sa iyong komunidad.",
    langAgnosticBadge: "Platform na Suportado ang Lahat ng Wika",
    langAgnosticTitle: "Gumana nang Kumportable sa Anumang Wikang Pandaigdig",
    langAgnosticDesc: "100% hindi nakadepende sa wika ang MySocialClan.",
    modulesBadge: "Mga Modyul ng Social Engine",
    modulesTitle: "Kasama ang mga Makapangyarihang Tampok",
    modulesSubtitle: "I-configure ang eksaktong mga tool na kailangan mo.",
    showcaseBadge: "Live na Network ng Komunidad",
    showcaseTitle: "Mga Aktibong Clan at Organisasyon",
    wizardTitle: "MySocialClan Setup Wizard",
    wizardSubdomainStep: "Hakbang 1 · Anino ng Subdomain Address",
    wizardSubdomainTitle: "Pumili ng Subdomain para sa Iyong Komunidad",
    wizardSubdomainDesc: "Gagamitin ng iyong mga miyembro ang address na ito upang mag-access.",
    subdomainLabel: "Subdomain Address *",
    checkingAvailability: "Sinusuri ang availability ng domain...",
    subdomainAvailableMsg: "ay available!",
    nextOrgDetails: "Susunod: Mga Detalye ng Organisasyon",
    wizardOrgStep: "Hakbang 2 · Branding at Impormasyon",
    wizardOrgTitle: "Impormasyon ng Organisasyon",
    wizardOrgDesc: "I-configure ang pampublikong branding para sa iyong clan.",
    orgLogoLabel: "Logo ng Organisasyon",
    orgNameLabel: "Pangalan ng Organisasyon / Clan *",
    orgDescLabel: "Deskripsyon",
    orgCitiesLabel: "Mga Lungsod",
    orgUpiLabel: "Account / UPI para sa Suporta (Opsyonal)",
    nextAdminDetails: "Susunod: Detalye ng Admin",
    wizardAdminStep: "Hakbang 3 · Impormasyon ng Contact",
    wizardAdminTitle: "Mga Detalye ng Contact ng Admin",
    wizardAdminDesc: "Abisuhan ka namin sa numerong ito kapag live na ang iyong subdomain.",
    primaryLanguageLabel: "Pangunahing Wika ng Komunidad *",
    adminNameLabel: "Buong Pangalan ng Admin *",
    adminEmailLabel: "Email Address para sa Contact *",
    adminMobileLabel: "Numero ng Mobile ng Admin *",
    nextModules: "Susunod: I-configure ang mga Modyul",
    wizardModulesStep: "Hakbang 4 · Konpigurasyon ng Tampok",
    wizardModulesTitle: "Pumili ng mga Modyul na Paganahin",
    wizardModulesDesc: "Pumili ng mga kinakailangang social tool.",
    submitSetupRequest: "Ipadala ang Hiling sa Setup",
    submittingRequest: "Ipinapadala ang hiling...",
    wizardSuccessTitle: "Matagumpay na Naitala ang Hiling sa Setup!",
    wizardSuccessDesc: "Natanggap nang matagumpay ng aming koponan ang iyong hiling.",
    doneReturnHome: "Tapos Na & Bumalik sa Homepage",
    backBtn: "Bumalik",
    adminPortalTitle: "Pamamahala ng Platform ng MySocialClan",
    adminPortalSub: "SaaS Platform Portal at Listahan ng Hiling",
    pendingRequestsTitle: "Mga Nakatambak na Hiling sa Paggawa ng Komunidad",
    noPendingRequests: "Walang nakatambak na hiling sa ngayon.",
    approveRegisterBtn: "Aprubahan at Irehistro",
    rejectBtn: "Tanggihan",
    activeCommunitiesTitle: "Mga Aktibong Rehistradong Komunidad",
    noCommunities: "Wala pang rehistradong aktibong komunidad.",
  },
};

interface LanguageContextType {
  lang: SupportedLang;
  setLang: (l: SupportedLang) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<SupportedLang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("mysocialclan_lang") as SupportedLang;
    if (saved && translations[saved]) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: SupportedLang) => {
    if (translations[newLang]) {
      setLangState(newLang);
      localStorage.setItem("mysocialclan_lang", newLang);
    }
  };

  const isRtl = mounted && (lang === "ar" || lang === "ur");
  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRtl }}>
      <div dir={isRtl ? "rtl" : "ltr"} className="w-full min-h-full" suppressHydrationWarning>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function LanguageDropdown({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative flex items-center bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-1.5 space-x-1.5 shadow-2xs hover:bg-slate-200/60 transition-all ${className}`}
      suppressHydrationWarning
    >
      <select
        value={mounted ? lang : "en"}
        onChange={(e) => setLang(e.target.value as SupportedLang)}
        className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer pr-1"
        suppressHydrationWarning
      >
        {LANGUAGE_OPTIONS.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

