export type Category = 
  | "Safari" 
  | "Day trip" 
  | "Hiking" 
  | "Waterfalls" 
  | "Road trip" 
  | "Family package" 
  | "Custom package";

export interface Trip {
  id: string;
  title: string;
  subtitle?: string;
  category: Category;
  duration: string; // e.g. "3 days · 2 nights"
  date: string;     // e.g. "18–20 Oct 2026"
  priceKES: number; // e.g. 32500
  priceUSD?: number;// e.g. 260
  featuredImage: string;
  galleryImages?: string[];
  tag: string;      // e.g. "Most loved", "12 spots left", "New"
  location: string; // e.g. "Maasai Mara National Reserve"
  spotsLeft: number;
  featured?: boolean;
  overview: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  included: string[];
  excluded: string[];
}

export type VehicleCategory = 
  | "Safari 4x4" 
  | "Tour Van" 
  | "Mini Bus" 
  | "Luxury Coach" 
  | "Executive 4x4 / VIP";

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  capacity: string;      // e.g. "7 Passengers" or "33 Passengers"
  luggageCapacity: string; // e.g. "7 Large Bags"
  transmission: "Automatic" | "Manual" | "Both Available";
  dailyRateKES: number;  // e.g. 18000
  driverIncluded: boolean;
  fuelOption: "Chauffeur + Fuel Packages" | "Dry Hire Available" | "Chauffeured Only";
  image: string;
  features: string[];
  available: boolean;
  description: string;
}

export type StayCategory = 
  | "Safari Lodge" 
  | "Luxury Tented Camp" 
  | "Beach Resort" 
  | "Lakeside Cottage" 
  | "Mountain Retreat" 
  | "Boutique City Hotel";

export interface HotelStay {
  id: string;
  name: string;
  location: string;
  region: "Maasai Mara" | "Coast & Diani" | "Amboseli & Tsavo" | "Rift Valley & Lakes" | "Mount Kenya & Aberdares" | "Nairobi";
  category: StayCategory;
  pricePerNightKES: number;
  rating: number; // e.g. 4.9
  image: string;
  amenities: string[];
  featured?: boolean;
  description: string;
}

export type MediaCategory = 
  | "Safaris & Wildlife" 
  | "Waterfalls & Rivers" 
  | "Mountain Hiking" 
  | "Road Trips & Fleet" 
  | "Camp & Group Life" 
  | "Stays & Resorts";

export interface GalleryMedia {
  id: string;
  title: string;
  category: MediaCategory;
  location: string;
  mediaType: "image" | "video";
  url: string;
  caption?: string;
  date?: string;
}

export type InquiryStatus = "Pending" | "Contacted" | "Confirmed" | "Archived";
export type ServiceType = 
  | "Upcoming group trip" 
  | "Custom safari" 
  | "Car or bus hire" 
  | "Hotel & accommodation" 
  | "Family package" 
  | "Corporate or school trip" 
  | "General enquiry";

export interface BookingInquiry {
  id: string;
  referenceCode: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  targetItemTitle?: string; // e.g. "Maasai Mara Safari" or "Safari Land Cruiser"
  preferredDate: string;
  numberOfTravelers: number;
  destinationOrNotes: string;
  budgetRange?: string;
  status: InquiryStatus;
  adminNotes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  experience: string;
}

export type NavigationPage = 
  | "home" 
  | "about" 
  | "trips" 
  | "transport" 
  | "hotels" 
  | "gallery" 
  | "contact" 
  | "booking" 
  | "admin";
