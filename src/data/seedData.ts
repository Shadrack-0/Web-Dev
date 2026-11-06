import { BookingInquiry, GalleryMedia, HotelStay, TeamMember, Trip, Vehicle } from "../types";

export const initialTrips: Trip[] = [
  {
    id: "trip-1",
    title: "Maasai Mara Great Migration & Big Five Safari",
    subtitle: "The ultimate wildlife theatre on earth",
    category: "Safari",
    duration: "3 days · 2 nights",
    date: "18–20 Oct 2026",
    priceKES: 32500,
    priceUSD: 265,
    featuredImage: "https://images.unsplash.com/photo-1547471080-d5e8a6d4fb4c?auto=format&fit=crop&w=1400&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1792824418533-593a04879d06?auto=format&fit=crop&w=1200&q=84",
      "https://images.unsplash.com/photo-1535940587896-3a4e0ce292f4?auto=format&fit=crop&w=1200&q=84"
    ],
    tag: "Most loved",
    location: "Maasai Mara National Reserve",
    spotsLeft: 6,
    featured: true,
    overview: "Traverse the undulating savannah grasslands of the world-famous Maasai Mara. Witness thunderous herds, pride of lions, elusive leopards, and authentic cultural exchanges under the African skies.",
    highlights: [
      "Extensive 4x4 open-roof game drives across Talek and Mara River",
      "Full-board luxury tented camp with bonfire evenings",
      "Comprehensive park entry fees and professional KPSGA certified guide",
      "Optional early morning Mara hot air balloon safari"
    ],
    itinerary: [
      { day: "Day 1", title: "Nairobi to Mara via Great Rift Valley", desc: "Scenic departure from Nairobi with view of the Great Rift Valley escarpment. Arrive in time for lunch followed by an exhilarating afternoon sunset game drive." },
      { day: "Day 2", title: "Full Day Big Five Exploration", desc: "Full day tracking lion prides, cheetahs, elephants and river crossings with bush picnic lunch in the heart of the wild reserve." },
      { day: "Day 3", title: "Morning Bush Drive & Return to Nairobi", desc: "Early dawn game drive when predators are most active. Hearty camp breakfast and leisurely cruise back to Nairobi arriving by evening." }
    ],
    included: ["Return transport in 4x4 Safari Land Cruiser", "2 nights luxury tented camp accommodation", "All meals on full board", "Park entrance fees", "Professional driver-guide", "Bottled mineral water"],
    excluded: ["Personal travel insurance", "Maasai village cultural fee (KES 1,500)", "Alcoholic beverages", "Tips and gratuities"]
  },
  {
    id: "trip-2",
    title: "Chasing Waterfalls & Moorland Trek in Aberdares",
    subtitle: "Crisp mountain air, cascading waters and lush rainforests",
    category: "Waterfalls",
    duration: "1 day (Saturday)",
    date: "08 Nov 2026",
    priceKES: 4800,
    priceUSD: 40,
    featuredImage: "https://images.unsplash.com/photo-1747359637124-cbc97106271c?auto=format&fit=crop&w=1400&q=85",
    tag: "New Departure",
    location: "Aberdare National Park, Nyeri",
    spotsLeft: 14,
    featured: true,
    overview: "An invigorating day escape from the bustling city into the mist-shrouded cloud forests of the Aberdares. Hike along rivers, discover Karuru and Chania falls, and recharge in untouched wilderness.",
    highlights: [
      "Visit Kenya's tallest waterfall: Karuru Falls (273m plunge)",
      "Armed KWS ranger escorted scenic forest hike",
      "Cave exploration & viewing wooden suspension bridges",
      "Plentiful birdlife and forest colobus monkeys"
    ],
    itinerary: [
      { day: "Day Trip", title: "Nairobi to Aberdares & Waterfall Circuit", desc: "Depart Nairobi 05:45 AM. Scenic climb via tea plantations. Full guided hike visiting Queens Cave, Karuru Falls, and Chania Falls, picnic lunch, return to Nairobi by 7:30 PM." }
    ],
    included: ["Comfortable tour bus transport", "All park entry & KWS ranger fees", "Bottled drinking water", "Paramedic first aid kit on board", "Guided walking excursion"],
    excluded: ["Packed picnic lunch & snacks", "Warm hiking gear", "Personal expenses"]
  },
  {
    id: "trip-3",
    title: "Mt. Kenya Alpine Lakes & Castle Escape",
    subtitle: "Highland serenity, trout rivers and giant lobelia valleys",
    category: "Hiking",
    duration: "2 days · 1 night",
    date: "22–23 Nov 2026",
    priceKES: 14500,
    priceUSD: 120,
    featuredImage: "https://images.unsplash.com/photo-1706398977072-e3b085a47e72?auto=format&fit=crop&w=1400&q=85",
    tag: "10 spots left",
    location: "Mt. Kenya National Park, Sirimon Gate",
    spotsLeft: 10,
    featured: true,
    overview: "Escape to the slopes of Africa's second highest mountain. Breathe crisp highland air, trek through ancient cedar and rosewood forests, and unwind at an alpine lodge with log fires and star-filled skies.",
    highlights: [
      "Moderate altitude trek up to Old Moses camp (3,300m)",
      "Unspoiled alpine scenery and endemic high-altitude flora",
      "Cosy evening campfire with roasted marshmallows and storytelling",
      "Stunning dawn sunrise over the Batian & Nelion snow peaks"
    ],
    itinerary: [
      { day: "Day 1", title: "Nairobi to Mount Kenya Slopes", desc: "Scenic drive passing pineapple fields and highland estates. Check into mountain lodge, afternoon acclimatisation forest trek to tropical waterfalls." },
      { day: "Day 2", title: "Alpine Moorlands Trek & Return", desc: "Morning high trek into moorlands with breathtaking panoramic views of peaks. Lunch at Nanyuki town and return to Nairobi." }
    ],
    included: ["Transport in comfortable tour cruiser", "1 night lodge accommodation", "Buffet dinner & breakfast", "KWS mountain park permits", "Certified mountain guide"],
    excluded: ["Day 1 lunch", "Thermal hiking boots/clothing", "Tips"]
  },
  {
    id: "trip-4",
    title: "Amboseli Giants Under Mount Kilimanjaro",
    subtitle: "Iconic free-ranging elephant herds with snow-capped views",
    category: "Safari",
    duration: "3 days · 2 nights",
    date: "05–07 Dec 2026",
    priceKES: 29800,
    priceUSD: 240,
    featuredImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85",
    tag: "Selling Fast",
    location: "Amboseli National Park, Kajiado",
    spotsLeft: 8,
    featured: false,
    overview: "Amboseli is renowned for hosting the largest big-tusked elephants against the dramatic backdrop of Mount Kilimanjaro. Explore dried lake beds, lush swamps fed by underground melting glaciers, and bird-rich marshes.",
    highlights: [
      "Unobstructed views of Mount Kilimanjaro peaks at sunrise and dusk",
      "Observation Hill panoramic walk overlooking elephant herds in swamps",
      "Lions, cheetahs, hyenas, and 400+ recorded bird species",
      "Stay in an authentic eco-lodge overlooking wildlife watering holes"
    ],
    itinerary: [
      { day: "Day 1", title: "Nairobi into Amboseli Plains", desc: "Depart early along the Nairobi-Mombasa corridor. Enter Amboseli with game viewing en route to camp for hot lunch. Sunset game drive." },
      { day: "Day 2", title: "Full Day Kilimanjaro Wildlife Safari", desc: "Morning and afternoon safari drives visiting Enkongo Narok marsh and Observation Hill. Spectacular photography opportunities." },
      { day: "Day 3", title: "Sunrise Safari & Return", desc: "Catch the mountain clear of clouds at dawn with a final game drive, hearty breakfast, and drive back to Nairobi." }
    ],
    included: ["4x4 Land Cruiser safari vehicle with fuel", "2 nights full board safari lodge", "All Amboseli park entry fees", "Experienced guide driver", "Mineral water"],
    excluded: ["Drinks and personal bar bills", "Cultural Maasai boma visit", "Tips"]
  },
  {
    id: "trip-5",
    title: "Diani Beach & Wasini Island Ocean Getaway",
    subtitle: "Pristine white sands, turquoise waters & dolphin dhow safaris",
    category: "Family package",
    duration: "4 days · 3 nights",
    date: "12–15 Dec 2026",
    priceKES: 46000,
    priceUSD: 375,
    featuredImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    tag: "Family Special",
    location: "Diani Beach & Kisite Mpunguti Marine Park",
    spotsLeft: 12,
    featured: false,
    overview: "Relax on world-acclaimed white sand beaches of Kenya's South Coast. Cruise on traditional wooden dhows, snorkel amongst colorful coral reefs, spot playful dolphins, and savor fresh seafood feasts.",
    highlights: [
      "Traditional Arab dhow cruise into Kisite Mpunguti Marine Park",
      "Snorkeling with sea turtles and dolphin encounters",
      "Seafood lunch on Wasini Island with coconut rice and crab dishes",
      "Direct beachfront 4-star resort stay with swimming pool and lush gardens"
    ],
    itinerary: [
      { day: "Day 1", title: "Flight / SGR Train to Diani", desc: "Arrive at Ukunda / Mombasa, private transfer to beachfront resort. Free afternoon unwinding by the Indian Ocean." },
      { day: "Day 2", title: "Wasini Dhow & Marine Park Excursion", desc: "Full day dhow cruise, dolphin search, snorkeling in coral reef sanctuaries, island feast, and mangrove boardwalk tour." },
      { day: "Day 3", title: "Kite Surfing, Camel Rides & Beach Leisure", desc: "Relaxation, optional visit to Kaya Kinondo sacred forest or sunset cocktail catamaran." },
      { day: "Day 4", title: "Farewell Coast & Return Transfer", desc: "Morning beach dip, breakfast, and escorted transfer to airstrip or SGR terminal for journey back." }
    ],
    included: ["3 nights 4-star beachfront resort accommodation", "Half board meal plan (Breakfast & Dinner)", "Wasini island dhow trip with seafood lunch", "Return transfers in Diani", "Marine park entry permits"],
    excluded: ["SGR Train or Flight tickets (can be arranged on request)", "Water sports equipment rentals", "Personal beverages"]
  },
  {
    id: "trip-6",
    title: "Hell's Gate Gorge Bike Safari & Lake Naivasha Boat Cruise",
    subtitle: "Cycling among zebras and sunset hippos on freshwater lakes",
    category: "Day trip",
    duration: "1 day (Sunday)",
    date: "15 Nov 2026",
    priceKES: 4500,
    priceUSD: 38,
    featuredImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=85",
    tag: "Weekend Thrill",
    location: "Naivasha, Great Rift Valley",
    spotsLeft: 18,
    featured: true,
    overview: "One of the few national parks in the world where you can cycle freely alongside giraffes, warthogs, and zebras. Cap the day with a relaxing boat ride on Lake Naivasha spotting hundreds of hippos and fish eagles.",
    highlights: [
      "Bicycle riding through the dramatic volcanic towers of Hell's Gate",
      "Guided walk through the spectacular Ol Njorowa geological gorges",
      "1-hour speed boat cruise on Lake Naivasha with hippo viewing",
      "Scenic photo stop at Great Rift Valley viewpoint"
    ],
    itinerary: [
      { day: "Day Trip", title: "Nairobi to Naivasha & Return", desc: "Depart Nairobi 06:30 AM. Arrive Hell's Gate, collect mountain bikes, ride across the park floor. Hike the gorges. Transfer to lake for hot lunch and boat cruise. Return to Nairobi by 7:00 PM." }
    ],
    included: ["Return transport in comfortable tour cruiser", "Park entrance fees", "Mountain bike hire", "Lake Naivasha boat ride fees", "Guide fees & water"],
    excluded: ["Lunch at lakeside restaurant", "Personal tips"]
  }
];

export const initialVehicles: Vehicle[] = [
  {
    id: "veh-1",
    name: "Toyota Land Cruiser 4x4 Custom Safari",
    category: "Safari 4x4",
    capacity: "7–8 Passengers",
    luggageCapacity: "8 Large Bags",
    transmission: "Manual",
    dailyRateKES: 20000,
    driverIncluded: true,
    fuelOption: "Chauffeur + Fuel Packages",
    image: "https://images.unsplash.com/photo-1535940587896-3a4e0ce292f4?auto=format&fit=crop&w=1200&q=84",
    features: ["Pop-up roof for 360° game photography", "Heavy-duty 4WD suspension & dual fuel tanks", "UHF high-frequency radio communication", "USB phone charging ports on every row", "Built-in electric cooler box for cold drinks", "All-terrain mud & rock tires"],
    available: true,
    description: "The gold standard for African safaris. Built specifically to conquer rough national park terrain in Maasai Mara, Samburu, and Amboseli with maximum comfort and vantage viewing."
  },
  {
    id: "veh-2",
    name: "Safari Tour Van (Toyota HiAce 4x4)",
    category: "Tour Van",
    capacity: "8 Passengers",
    luggageCapacity: "8 Bags",
    transmission: "Manual",
    dailyRateKES: 13000,
    driverIncluded: true,
    fuelOption: "Chauffeur + Fuel Packages",
    image: "https://images.unsplash.com/photo-1605302596013-fccbe2f06298?auto=format&fit=crop&w=1200&q=84",
    features: ["Pop-up roof for game viewing", "Full-time 4WD capability", "Audio PA system with guide microphone", "Individual reclining window seats", "Luggage rack & rear cargo space"],
    available: true,
    description: "Budget-friendly yet fully capable safari van for family trips, small church fellowships, and friends' weekend getaways across Kenya."
  },
  {
    id: "veh-3",
    name: "Executive VIP Minivan (Toyota Noah / Alphard)",
    category: "Executive 4x4 / VIP",
    capacity: "6–7 Passengers",
    luggageCapacity: "5 Bags",
    transmission: "Automatic",
    dailyRateKES: 9500,
    driverIncluded: true,
    fuelOption: "Chauffeured Only",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=84",
    features: ["Plush captain leather seats", "Dual zone digital climate control", "Silent smooth highway ride", "Privacy tinted glass", "Airport transfer luggage friendly"],
    available: true,
    description: "Ideal for airport pickups (JKIA/Wilson), executive city commuting, corporate delegations, and intimate family road trips to Naivasha or Nanyuki."
  },
  {
    id: "veh-4",
    name: "Mitsubishi Rosa / Toyota Coaster Executive Mini Bus",
    category: "Mini Bus",
    capacity: "28–33 Passengers",
    luggageCapacity: "Overhead & Rear Compartment",
    transmission: "Manual",
    dailyRateKES: 24000,
    driverIncluded: true,
    fuelOption: "Chauffeur + Fuel Packages",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=84",
    features: ["High-back reclining seats with safety belts", "Dual powerful AC & individual reading vents", "On-board entertainment system & microphone", "Luggage compartments", "Comfortable leaf-spring suspension"],
    available: true,
    description: "The top pick for corporate team buildings, church missions, school excursions, and weddings requiring smooth, punctual group logistics."
  },
  {
    id: "veh-5",
    name: "Scania / Isuzu Luxury Coach 50-Seater",
    category: "Luxury Coach",
    capacity: "50–62 Passengers",
    luggageCapacity: "Underfloor Cargo Holds",
    transmission: "Manual",
    dailyRateKES: 45000,
    driverIncluded: true,
    fuelOption: "Chauffeur + Fuel Packages",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=84",
    features: ["Air suspension for ultimate passenger smoothness", "Foldable TV monitors & sound system", "Huge undercarriage cargo storage", "Tinted panoramic touring windows", "Speed governor compliant & GPS tracked"],
    available: true,
    description: "Premium large-capacity long-distance coach for cross-county tours, conferences, international missions, and university expeditions."
  },
  {
    id: "veh-6",
    name: "Toyota Prado TX 4x4 VIP Escort",
    category: "Executive 4x4 / VIP",
    capacity: "4–5 Passengers",
    luggageCapacity: "4 Large Suitcases",
    transmission: "Automatic",
    dailyRateKES: 16000,
    driverIncluded: true,
    fuelOption: "Chauffeured Only",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=84",
    features: ["Full leather interior with wood trim", "Sunroof & tinted VIP glass", "Professional suited chauffeur", "Complimentary chilled water & mints", "4x4 terrain conqueror"],
    available: true,
    description: "Elite prestige SUV for dignitaries, wedding bridal convoys, high-profile executives, and discerning private luxury excursions."
  }
];

export const initialHotels: HotelStay[] = [
  {
    id: "stay-1",
    name: "Mara Serena Safari Lodge",
    location: "Maasai Mara Mara Triangle",
    region: "Maasai Mara",
    category: "Safari Lodge",
    pricePerNightKES: 38000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=84",
    amenities: ["Infinity Pool overlooking Mara River", "Full-Board Dining", "Game Drives", "Spa & Wellness", "Free Wi-Fi", "Airport Airstrip Transfers"],
    featured: true,
    description: "Perched high on a ridge, this iconic lodge resembles an authentic Maasai Manyatta and commands prime, front-row views of the Mara River crossing."
  },
  {
    id: "stay-2",
    name: "Swahili Beach Resort & Spa",
    location: "Diani Beach, South Coast",
    region: "Coast & Diani",
    category: "Beach Resort",
    pricePerNightKES: 29500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=84",
    amenities: ["8-Tier Cascading Swimming Pool", "Beachfront Cabanas", "Swahili & Indian Fine Dining", "Watersports Center", "Kids Club", "Luxury Spa"],
    featured: true,
    description: "An architectural masterpiece blending Arabian, Indian, and Swahili coastal heritage with lush tropical gardens along Diani's award-winning white shoreline."
  },
  {
    id: "stay-3",
    name: "Ol Tukai Lodge Amboseli",
    location: "Amboseli National Park",
    region: "Amboseli & Tsavo",
    category: "Safari Lodge",
    pricePerNightKES: 31000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=84",
    amenities: ["Direct Kilimanjaro Views", "Elephant Marsh Facing Verandahs", "Outdoor Pool", "Bush Dinners", "Resident Naturalist Lectures"],
    featured: true,
    description: "Celebrated worldwide as the premier spot to photograph elephants grazing with the snows of Mount Kilimanjaro soaring above the acacia trees."
  },
  {
    id: "stay-4",
    name: "The Great Rift Valley Lodge & Golf Resort",
    location: "Naivasha, Green Park",
    region: "Rift Valley & Lakes",
    category: "Lakeside Cottage",
    pricePerNightKES: 24000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=84",
    amenities: ["18-Hole Championship Golf Course", "Panoramic Lake Naivasha Views", "Horse Riding Stables", "Heated Swimming Pool", "Fireplace Chalets"],
    featured: false,
    description: "Nestled on the Eburru mountain slopes, offering breathtaking 360-degree vistas across Lake Naivasha and the Great Rift Valley."
  },
  {
    id: "stay-5",
    name: "Fairmont Mount Kenya Safari Club",
    location: "Nanyuki, Equator Line",
    region: "Mount Kenya & Aberdares",
    category: "Mountain Retreat",
    pricePerNightKES: 45000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=84",
    amenities: ["Equator Crossing Ceremony", "Animal Orphanage Sanctuary", "Heated Pool", "Fine Dining", "Golf Course", "Trout Fishing"],
    featured: true,
    description: "Historic luxury colonial club set across 100 manicured acres on the slopes of Mt. Kenya, straddling the equator with mountain views."
  },
  {
    id: "stay-6",
    name: "Hemingways Nairobi",
    location: "Karen, Nairobi",
    region: "Nairobi",
    category: "Boutique City Hotel",
    pricePerNightKES: 42000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=84",
    amenities: ["Private Dedicated Butler Service", "Ngong Hills View Balconies", "Gourmet Brasserie", "Sensory Spa", "Airport Chauffeurs"],
    featured: false,
    description: "A tranquil boutique plantation hotel in the peaceful suburb of Karen, offering plantation-style architecture, bespoke luxury, and gourmet dining."
  }
];

export const initialGallery: GalleryMedia[] = [
  {
    id: "gal-1",
    title: "Lion Pride at Golden Hour in Maasai Mara",
    category: "Safaris & Wildlife",
    location: "Maasai Mara",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1547471080-d5e8a6d4fb4c?auto=format&fit=crop&w=1200&q=84",
    caption: "Golden morning sun bathing our 4x4 cruiser as a lion pride strolled across the savannah.",
    date: "October 2026"
  },
  {
    id: "gal-2",
    title: "Karuru Falls 273m Plunge in the Clouds",
    category: "Waterfalls & Rivers",
    location: "Aberdare National Park",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1747359637124-cbc97106271c?auto=format&fit=crop&w=1200&q=84",
    caption: "Standing at the wooden observation deck watching Karuru waterfall plunge into the misty forest abyss.",
    date: "September 2026"
  },
  {
    id: "gal-3",
    title: "Group Summit High on Mount Kenya Moorlands",
    category: "Mountain Hiking",
    location: "Mt. Kenya Sirimon Track",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1706398977072-e3b085a47e72?auto=format&fit=crop&w=1200&q=84",
    caption: "Smiles, camaraderie, and high altitude euphoria as our weekend trekking squad reached Mackinder's viewpoint.",
    date: "August 2026"
  },
  {
    id: "gal-4",
    title: "Safari Cruisers Queued at the Escarpment",
    category: "Road Trips & Fleet",
    location: "Rift Valley Escarpment",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1605302596013-fccbe2f06298?auto=format&fit=crop&w=1200&q=84",
    caption: "Convoy pit stop on the winding descent into the Great Rift Valley.",
    date: "July 2026"
  },
  {
    id: "gal-5",
    title: "Sunset Campfire Stories & Acoustic Music",
    category: "Camp & Group Life",
    location: "Lake Elementaita Camp",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1709567484031-87bc70607500?auto=format&fit=crop&w=1200&q=84",
    caption: "Strangers on Friday, lifelong friends by Sunday night around the roaring camp woodfire.",
    date: "October 2026"
  },
  {
    id: "gal-6",
    title: "Diani Beach Sunset Dhow Sail",
    category: "Stays & Resorts",
    location: "Diani Beach, Kwale",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=84",
    caption: "Watching the sun dip beneath the palm fringed Indian Ocean from an ancient wooden dhow.",
    date: "August 2026"
  },
  {
    id: "gal-7",
    title: "Elephants Marching Past Our Land Cruiser",
    category: "Safaris & Wildlife",
    location: "Amboseli National Park",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=84",
    caption: "A magnificent matriarch guiding her calves mere meters from our stopped safari vehicle.",
    date: "September 2026"
  },
  {
    id: "gal-8",
    title: "Rift Valley Panoramic Expanse",
    category: "Road Trips & Fleet",
    location: "Mai Mahiu Viewpoint",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1720027068414-fff0abffeec0?auto=format&fit=crop&w=1200&q=84",
    caption: "The grandeur of Kenya's tectonic wonders welcoming travelers on the highway.",
    date: "October 2026"
  }
];

export const initialInquiries: BookingInquiry[] = [
  {
    id: "inq-101",
    referenceCode: "CHL-2026-8941",
    createdAt: "2026-11-04 10:15 AM",
    fullName: "Amina Hassan",
    phone: "+254 722 415 892",
    email: "amina.h@gmail.com",
    serviceType: "Upcoming group trip",
    targetItemTitle: "Maasai Mara Great Migration & Big Five Safari",
    preferredDate: "2026-12-18",
    numberOfTravelers: 3,
    destinationOrNotes: "Family of three including one 14-year-old teenager. Need single & double tent configuration.",
    budgetRange: "KES 90,000 - 110,000",
    status: "Confirmed",
    adminNotes: "Deposit received via M-PESA. Tents 4 & 5 reserved with Mara Serena camp."
  },
  {
    id: "inq-102",
    referenceCode: "CHL-2026-8942",
    createdAt: "2026-11-05 02:40 PM",
    fullName: "David Kipkorir",
    phone: "+254 711 889 204",
    email: "dkipkorir@corporatefirm.co.ke",
    serviceType: "Car or bus hire",
    targetItemTitle: "Mitsubishi Rosa / Toyota Coaster Executive Mini Bus",
    preferredDate: "2026-11-28",
    numberOfTravelers: 28,
    destinationOrNotes: "Annual staff end-of-year retreat from Nairobi Westlands to Naivasha return (2 days, 1 night).",
    budgetRange: "KES 50,000",
    status: "Contacted",
    adminNotes: "Sent official company quotation with driver accommodation and fuel included. Awaiting LPO."
  },
  {
    id: "inq-103",
    referenceCode: "CHL-2026-8943",
    createdAt: "2026-11-06 09:20 AM",
    fullName: "Faith Njeri Mwangi",
    phone: "+254 703 652 119",
    email: "faith.mwangi@yahoo.com",
    serviceType: "Hotel & accommodation",
    targetItemTitle: "Swahili Beach Resort & Spa",
    preferredDate: "2026-12-23",
    numberOfTravelers: 2,
    destinationOrNotes: "Honeymoon couple. Requesting ocean facing superior room with flower petal setup if possible.",
    budgetRange: "KES 150,000",
    status: "Pending",
    adminNotes: "New inquiry received today. Follow up on WhatsApp regarding partner rates."
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Samuel Gitau",
    role: "Founder & Lead Expeditionist",
    bio: "With over 12 years traversing every corner of East Africa, Samuel founded Chalcedony to bring soulful, deeply authentic African adventures to travelers from all walks of life.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    experience: "12+ Years in East Africa Tourism"
  },
  {
    id: "team-2",
    name: "Esther Chebet",
    role: "Head of Safari & Guest Experience",
    bio: "Passionate conservationist and logistics maven. Esther orchestrates every itinerary, luxury camp partnership, and guest detail with heart and meticulous care.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    experience: "8+ Years in Luxury Safari Operations"
  },
  {
    id: "team-3",
    name: "Kiprono Langat",
    role: "Chief Transport & Fleet Director",
    bio: "Ensures our entire fleet of 4x4 Land Cruisers, luxury coaches, and tour vans operate at peak safety, mechanical reliability, and cleanliness standards.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    experience: "15+ Years Commercial Fleet Management"
  },
  {
    id: "team-4",
    name: "Joseph Ole Lenku",
    role: "Senior Naturalist & KPSGA Gold Guide",
    bio: "Born and raised in the Mara ecosystem, Joseph holds encyclopedic knowledge of wildlife tracking, bird calls, botanical lore, and Maasai traditions.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    experience: "14+ Years Certified Professional Guide"
  }
];
