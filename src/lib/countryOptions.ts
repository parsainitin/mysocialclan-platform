export interface CountryOption {
  code: string;
  label: string;
  cities: string[];
}

export const COUNTRY_OPTIONS: CountryOption[] = [
  {
    code: "IN",
    label: "India 🇮🇳",
    cities: ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"],
  },
  {
    code: "US",
    label: "United States 🇺🇸",
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Francisco", "Dallas", "Seattle", "Miami"],
  },
  {
    code: "AE",
    label: "United Arab Emirates 🇦🇪",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"],
  },
  {
    code: "SA",
    label: "Saudi Arabia 🇸🇦",
    cities: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar"],
  },
  {
    code: "GB",
    label: "United Kingdom 🇬🇧",
    cities: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Leeds"],
  },
  {
    code: "CA",
    label: "Canada 🇨🇦",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton"],
  },
  {
    code: "AU",
    label: "Australia 🇦🇺",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  },
  {
    code: "DE",
    label: "Germany 🇩🇪",
    cities: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
  },
  {
    code: "SG",
    label: "Singapore 🇸🇬",
    cities: ["Singapore"],
  },
  {
    code: "QA",
    label: "Qatar 🇶🇦",
    cities: ["Doha", "Al Wakrah", "Al Khor"],
  },
  {
    code: "OM",
    label: "Oman 🇴🇲",
    cities: ["Muscat", "Salalah", "Sohar"],
  },
  {
    code: "KW",
    label: "Kuwait 🇰🇼",
    cities: ["Kuwait City", "Hawalli", "Salmiya"],
  },
  {
    code: "BH",
    label: "Bahrain 🇧🇭",
    cities: ["Manama", "Riffa", "Muharraq"],
  },
  {
    code: "PH",
    label: "Philippines 🇵🇭",
    cities: ["Manila", "Quezon City", "Davao City", "Cebu City"],
  },
  {
    code: "JP",
    label: "Japan 🇯🇵",
    cities: ["Tokyo", "Osaka", "Yokohama", "Kyoto", "Nagoya"],
  },
  {
    code: "BR",
    label: "Brazil 🇧🇷",
    cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
  },
  {
    code: "ES",
    label: "Spain 🇪🇸",
    cities: ["Madrid", "Barcelona", "Valencia", "Seville"],
  },
  {
    code: "FR",
    label: "France 🇫🇷",
    cities: ["Paris", "Lyon", "Marseille", "Toulouse"],
  },
  {
    code: "GLOBAL",
    label: "Global / Multi-Country 🌐",
    cities: ["Global Network", "North America", "Europe", "Middle East", "Asia Pacific"],
  },
];
