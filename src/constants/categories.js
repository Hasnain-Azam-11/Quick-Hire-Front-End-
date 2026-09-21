export const CATEGORY_CHOICES = [
  { value: 'driving', label: 'Driving' },
  { value: 'moving', label: 'Moving' },
  { value: 'handyman', label: 'Handyman' },
  { value: 'caregiving', label: 'Caregiving' },
  { value: 'event_staffing', label: 'Event Staffing' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'construction', label: 'Construction' },
  { value: 'security', label: 'Security' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'tutoring', label: 'Tutoring' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'cleaning', label: 'Cleaning' }
];

export const CATEGORIES = CATEGORY_CHOICES.map((c) => c.label);

// Childcare and Elder Care used to be two categories; they are now one, "Caregiving".
// Old links, saved data and searches for the old names still find it.
export const LEGACY_CATEGORY_KEYS = {
  childcare: 'caregiving',
  'child care': 'caregiving',
  'elder care': 'caregiving',
  eldercare: 'caregiving',
};

// Extra words that should lead to a category when someone searches.
export const CATEGORY_ALIASES = {
  caregiving: ['child care', 'childcare', 'elder care', 'eldercare', 'adult care', 'elderly', 'nanny', 'babysit', 'caretaker', 'caregiver', 'care giver'],
};

export const SUBCATEGORIES_MAP = {
  driving: ["Personal Driver", "Airport Transfers", "Long Route Driving", "Event Chauffeur"],
  moving: ["House Shifting", "Office Relocation", "Loading & Unloading", "Packing Services"],
  handyman: ["Electrician", "Plumber", "Carpenter", "Painter", "AC Repair"],
  caregiving: [
    "Full-time Nanny",
    "Hourly Babysitting",
    "Newborn Care",
    "After-School Care",
    "Night Care",
    "Elderly Companionship",
    "Elderly Home Attendant",
    "Patient & Bedridden Care",
    "Medical Assistance",
    "Mobility Support",
    "Special Needs Care",
    "Post-Surgery Care"
  ],
  event_staffing: ["Waiters", "Ushers", "Event Security", "Setup Crew"],
  cooking: ["Daily Home Cook", "Event Catering", "Baking"],
  construction: ["Mason", "Labor", "Tile Work", "Scaffolding"],
  security: ["Guard Services", "Night Watch", "Event Security"],
  gardening: ["Lawn Mowing", "Landscaping", "Plant Care"],
  tutoring: ["School Subjects", "Quran Tutoring", "Language Classes"],
  beauty: ["Salon at Home", "Bridal Makeup", "Haircuts"],
  cleaning: [
    "House Cleaning",
    "Office Cleaning",
    "Window Cleaning",
    "Sofa & Carpet Cleaning",
    "Deep Cleaning",
    "Kitchen & Bathroom Cleaning",
    "Water Tank Cleaning",
    "Post-Construction Cleaning",
    "Laundry & Ironing"
  ]
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
  "Elderly Companionship": "🤝",
  "After-School Care": "🎒",
  "Night Care": "🌙",
  "Elderly Home Attendant": "🏠",
  "Patient & Bedridden Care": "🛏️",
  "Special Needs Care": "💙",
  "Post-Surgery Care": "🩹",
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
