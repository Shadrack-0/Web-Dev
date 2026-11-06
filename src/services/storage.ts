import { BookingInquiry, GalleryMedia, HotelStay, Trip, Vehicle } from "../types";
import { initialGallery, initialHotels, initialInquiries, initialTrips, initialVehicles } from "../data/seedData";

const KEYS = {
  TRIPS: "chalcedony_trips",
  VEHICLES: "chalcedony_vehicles",
  HOTELS: "chalcedony_hotels",
  GALLERY: "chalcedony_gallery",
  INQUIRIES: "chalcedony_inquiries",
  ADMIN_AUTH: "chalcedony_admin_auth",
  ADMIN_PIN: "chalcedony_admin_pin",
  FAVORITES: "chalcedony_saved_trips"
};

const DEFAULT_ADMIN_PIN = "chalcedony2026";

function notifyChange() {
  window.dispatchEvent(new Event("chalcedony_data_change"));
}

export const StorageService = {
  // Trips
  getTrips(): Trip[] {
    try {
      const data = localStorage.getItem(KEYS.TRIPS);
      if (!data) {
        localStorage.setItem(KEYS.TRIPS, JSON.stringify(initialTrips));
        return initialTrips;
      }
      return JSON.parse(data);
    } catch {
      return initialTrips;
    }
  },

  saveTrip(trip: Trip): Trip {
    const trips = this.getTrips();
    const index = trips.findIndex(t => t.id === trip.id);
    if (index >= 0) {
      trips[index] = trip;
    } else {
      trips.unshift(trip);
    }
    localStorage.setItem(KEYS.TRIPS, JSON.stringify(trips));
    notifyChange();
    return trip;
  },

  deleteTrip(id: string): void {
    const trips = this.getTrips().filter(t => t.id !== id);
    localStorage.setItem(KEYS.TRIPS, JSON.stringify(trips));
    notifyChange();
  },

  // Vehicles / Fleet
  getVehicles(): Vehicle[] {
    try {
      const data = localStorage.getItem(KEYS.VEHICLES);
      if (!data) {
        localStorage.setItem(KEYS.VEHICLES, JSON.stringify(initialVehicles));
        return initialVehicles;
      }
      return JSON.parse(data);
    } catch {
      return initialVehicles;
    }
  },

  saveVehicle(vehicle: Vehicle): Vehicle {
    const vehicles = this.getVehicles();
    const index = vehicles.findIndex(v => v.id === vehicle.id);
    if (index >= 0) {
      vehicles[index] = vehicle;
    } else {
      vehicles.unshift(vehicle);
    }
    localStorage.setItem(KEYS.VEHICLES, JSON.stringify(vehicles));
    notifyChange();
    return vehicle;
  },

  deleteVehicle(id: string): void {
    const vehicles = this.getVehicles().filter(v => v.id !== id);
    localStorage.setItem(KEYS.VEHICLES, JSON.stringify(vehicles));
    notifyChange();
  },

  // Hotels / Stays
  getHotels(): HotelStay[] {
    try {
      const data = localStorage.getItem(KEYS.HOTELS);
      if (!data) {
        localStorage.setItem(KEYS.HOTELS, JSON.stringify(initialHotels));
        return initialHotels;
      }
      return JSON.parse(data);
    } catch {
      return initialHotels;
    }
  },

  saveHotel(hotel: HotelStay): HotelStay {
    const hotels = this.getHotels();
    const index = hotels.findIndex(h => h.id === hotel.id);
    if (index >= 0) {
      hotels[index] = hotel;
    } else {
      hotels.unshift(hotel);
    }
    localStorage.setItem(KEYS.HOTELS, JSON.stringify(hotels));
    notifyChange();
    return hotel;
  },

  deleteHotel(id: string): void {
    const hotels = this.getHotels().filter(h => h.id !== id);
    localStorage.setItem(KEYS.HOTELS, JSON.stringify(hotels));
    notifyChange();
  },

  // Gallery
  getGallery(): GalleryMedia[] {
    try {
      const data = localStorage.getItem(KEYS.GALLERY);
      if (!data) {
        localStorage.setItem(KEYS.GALLERY, JSON.stringify(initialGallery));
        return initialGallery;
      }
      return JSON.parse(data);
    } catch {
      return initialGallery;
    }
  },

  saveMedia(item: GalleryMedia): GalleryMedia {
    const gallery = this.getGallery();
    const index = gallery.findIndex(g => g.id === item.id);
    if (index >= 0) {
      gallery[index] = item;
    } else {
      gallery.unshift(item);
    }
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
    notifyChange();
    return item;
  },

  deleteMedia(id: string): void {
    const gallery = this.getGallery().filter(g => g.id !== id);
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
    notifyChange();
  },

  // Inquiries / Bookings
  getInquiries(): BookingInquiry[] {
    try {
      const data = localStorage.getItem(KEYS.INQUIRIES);
      if (!data) {
        localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(initialInquiries));
        return initialInquiries;
      }
      return JSON.parse(data);
    } catch {
      return initialInquiries;
    }
  },

  createInquiry(inquiryData: Omit<BookingInquiry, "id" | "referenceCode" | "createdAt" | "status">): BookingInquiry {
    const inquiries = this.getInquiries();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newInquiry: BookingInquiry = {
      ...inquiryData,
      id: "inq-" + Date.now(),
      referenceCode: `CHL-${new Date().getFullYear()}-${randomSuffix}`,
      createdAt: new Date().toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" }),
      status: "Pending"
    };
    inquiries.unshift(newInquiry);
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
    notifyChange();
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: BookingInquiry["status"], adminNotes?: string): void {
    const inquiries = this.getInquiries();
    const index = inquiries.findIndex(i => i.id === id);
    if (index >= 0) {
      inquiries[index].status = status;
      if (adminNotes !== undefined) {
        inquiries[index].adminNotes = adminNotes;
      }
      localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
      notifyChange();
    }
  },

  deleteInquiry(id: string): void {
    const inquiries = this.getInquiries().filter(i => i.id !== id);
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
    notifyChange();
  },

  // Favorites / Saved Trips
  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleFavorite(tripId: string): boolean {
    const favs = this.getFavorites();
    const exists = favs.includes(tripId);
    let updated: string[];
    if (exists) {
      updated = favs.filter(id => id !== tripId);
    } else {
      updated = [...favs, tripId];
    }
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
    notifyChange();
    return !exists;
  },

  // Admin Auth
  isAdminLoggedIn(): boolean {
    return localStorage.getItem(KEYS.ADMIN_AUTH) === "true";
  },

  loginAdmin(pinOrPassword: string): boolean {
    const storedPin = localStorage.getItem(KEYS.ADMIN_PIN) || DEFAULT_ADMIN_PIN;
    if (pinOrPassword.trim() === storedPin || pinOrPassword.trim() === "admin") {
      localStorage.setItem(KEYS.ADMIN_AUTH, "true");
      notifyChange();
      return true;
    }
    return false;
  },

  logoutAdmin(): void {
    localStorage.removeItem(KEYS.ADMIN_AUTH);
    notifyChange();
  },

  updateAdminPin(newPin: string): void {
    localStorage.setItem(KEYS.ADMIN_PIN, newPin);
  },

  // Reset & Backup
  resetAllToDefaults(): void {
    localStorage.setItem(KEYS.TRIPS, JSON.stringify(initialTrips));
    localStorage.setItem(KEYS.VEHICLES, JSON.stringify(initialVehicles));
    localStorage.setItem(KEYS.HOTELS, JSON.stringify(initialHotels));
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(initialGallery));
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(initialInquiries));
    notifyChange();
  },

  exportDatabaseJSON(): string {
    return JSON.stringify({
      trips: this.getTrips(),
      vehicles: this.getVehicles(),
      hotels: this.getHotels(),
      gallery: this.getGallery(),
      inquiries: this.getInquiries()
    }, null, 2);
  },

  importDatabaseJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.trips) localStorage.setItem(KEYS.TRIPS, JSON.stringify(parsed.trips));
      if (parsed.vehicles) localStorage.setItem(KEYS.VEHICLES, JSON.stringify(parsed.vehicles));
      if (parsed.hotels) localStorage.setItem(KEYS.HOTELS, JSON.stringify(parsed.hotels));
      if (parsed.gallery) localStorage.setItem(KEYS.GALLERY, JSON.stringify(parsed.gallery));
      if (parsed.inquiries) localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(parsed.inquiries));
      notifyChange();
      return true;
    } catch {
      return false;
    }
  }
};
