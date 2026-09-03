export const CATEGORY_CHOICES = [
  { value: 'driving', label: 'Driving' },
  { value: 'moving', label: 'Moving' },
  { value: 'handyman', label: 'Handyman' },
  { value: 'childcare', label: 'Childcare' },
  { value: 'elder_care', label: 'Elder Care' },
  { value: 'event_staffing', label: 'Event Staffing' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'construction', label: 'Construction' },
  { value: 'security', label: 'Security' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'tutoring', label: 'Tutoring' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'office_support', label: 'Office Support' }
];

export const CATEGORIES = CATEGORY_CHOICES.map((c) => c.label);

export const SUBCATEGORIES_MAP = {
  driving: ["Personal Driver", "Airport Transfers", "Long Route Driving", "Event Chauffeur"],
  moving: ["House Shifting", "Office Relocation", "Loading & Unloading", "Packing Services"],
  handyman: ["Electrician", "Plumber", "Carpenter", "Painter", "AC Repair"],
  childcare: ["Full-time Nanny", "Hourly Babysitting", "Newborn Care"],
  elder_care: ["Companionship", "Medical Assistance", "Mobility Support"],
  event_staffing: ["Waiters", "Ushers", "Event Security", "Setup Crew"],
  cooking: ["Daily Home Cook", "Event Catering", "Baking"],
  construction: ["Mason", "Labor", "Tile Work", "Scaffolding"],
  security: ["Guard Services", "Night Watch", "Event Security"],
  gardening: ["Lawn Mowing", "Landscaping", "Plant Care"],
  tutoring: ["School Subjects", "Quran Tutoring", "Language Classes"],
  beauty: ["Salon at Home", "Bridal Makeup", "Haircuts"],
  office_support: ["Data Entry", "Receptionist", "Errand Running"]
};

export const SUBCATEGORY_ICONS_MAP = {
  "Personal Driver": "🚗",
  "Airport Transfers": "✈️",
  "Long Route Driving": "🛣️",
  "Event Chauffeur": "🚘",
  "House Shifting": "🏠",
  "Office Relocation": "🏢",
  "Loading & Unloading": "📦",
  "Packing Services": "🧳",
  "Electrician": "⚡",
  "Plumber": "🚰",
  "Carpenter": "🪵",
  "Painter": "🎨",
  "AC Repair": "❄️",
  "Full-time Nanny": "👶",
  "Hourly Babysitting": "🍼",
  "Newborn Care": "🤱",
  "Companionship": "🤝",
  "Medical Assistance": "🩺",
  "Mobility Support": "🦯",
  "Waiters": "🍽️",
  "Ushers": "🎫",
  "Event Security": "🛡️",
  "Setup Crew": "🎪",
  "Daily Home Cook": "🍳",
  "Event Catering": "🍲",
  "Baking": "🧁",
  "Mason": "🧱",
  "Labor": "👷",
  "Tile Work": "🔲",
  "Scaffolding": "🏗️",
  "Guard Services": "👮",
  "Night Watch": "🌙",
  "Lawn Mowing": "🌿",
  "Landscaping": "🏡",
  "Plant Care": "🪴",
  "School Subjects": "📚",
  "Quran Tutoring": "📖",
  "Language Classes": "🗣️",
  "Salon at Home": "💇‍♀️",
  "Bridal Makeup": "💄",
  "Haircuts": "✂️",
  "Data Entry": "💻",
  "Receptionist": "☎️",
  "Errand Running": "🏃‍♂️"
};

export const CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];

export const inputClass =
  "w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20";

export const btnPrimary =
  "px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 bg-[#FF6B00] text-white hover:bg-[#FF7A1A] hover:shadow-lg hover:shadow-orange-500/30 font-medium";

export const btnSecondary =
  "px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 text-[#0A0A0A] hover:bg-[#F5F5F5] font-medium";
