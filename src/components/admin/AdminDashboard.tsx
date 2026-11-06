import { useState, useEffect } from "react";
import { BookingInquiry, GalleryMedia, HotelStay, NavigationPage, Trip, Vehicle } from "../../types";
import { StorageService } from "../../services/storage";
import { Icon, Logo } from "../ui/Icon";
import { InquiriesManager } from "./InquiriesManager";
import { TripsManager } from "./TripsManager";
import { FleetManager } from "./FleetManager";
import { HotelsManager } from "./HotelsManager";
import { GalleryManager } from "./GalleryManager";

type AdminTab = "inquiries" | "trips" | "fleet" | "hotels" | "gallery" | "settings";

export function AdminDashboard({
  onNavigateSite,
  onLogout,
}: {
  onNavigateSite: (page: NavigationPage) => void;
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<AdminTab>("inquiries");
  const [trips, setTrips] = useState<Trip[]>(() => StorageService.getTrips());
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => StorageService.getVehicles());
  const [hotels, setHotels] = useState<HotelStay[]>(() => StorageService.getHotels());
  const [gallery, setGallery] = useState<GalleryMedia[]>(() => StorageService.getGallery());
  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => StorageService.getInquiries());
  const [newPinInput, setNewPinInput] = useState("");
  const [pinSavedMsg, setPinSavedMsg] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const refreshData = () => {
    setTrips(StorageService.getTrips());
    setVehicles(StorageService.getVehicles());
    setHotels(StorageService.getHotels());
    setGallery(StorageService.getGallery());
    setInquiries(StorageService.getInquiries());
  };

  useEffect(() => {
    const handleStorageChange = () => refreshData();
    window.addEventListener("chalcedony_data_change", handleStorageChange);
    return () => window.removeEventListener("chalcedony_data_change", handleStorageChange);
  }, []);

  const pendingCount = inquiries.filter((i) => i.status === "Pending").length;

  const handleResetDefaults = () => {
    if (confirm("Reset all trips, fleet, hotels, and inquiries to factory default seed data?")) {
      StorageService.resetAllToDefaults();
      refreshData();
      alert("All data reset to initial defaults successfully!");
    }
  };

  const handleExportJSON = () => {
    const json = StorageService.exportDatabaseJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chalcedony-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = StorageService.importDatabaseJSON(content);
      if (success) {
        refreshData();
        setImportStatus("Database backup restored successfully!");
        setTimeout(() => setImportStatus(null), 4000);
      } else {
        alert("Failed to parse JSON backup file. Please ensure it is valid.");
      }
    };
    reader.readAsText(file);
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinInput.trim()) return;
    StorageService.updateAdminPin(newPinInput.trim());
    setPinSavedMsg(true);
    setNewPinInput("");
    setTimeout(() => setPinSavedMsg(false), 3000);
  };

  return (
    <div className="admin-portal-shell">
      {/* Admin Top Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <Logo light onClick={() => onNavigateSite("home")} />
          <span className="admin-badge-indicator">
            <Icon name="shield" size={14} /> Staff Control Panel
          </span>
        </div>

        <div className="admin-header-right">
          <button
            onClick={() => onNavigateSite("home")}
            className="btn btn-outline-light-sm"
            type="button"
          >
            <Icon name="eye" size={15} /> View Public Website
          </button>
          <button
            onClick={onLogout}
            className="btn btn-outline-danger-sm"
            type="button"
          >
            <Icon name="logout" size={15} /> Logout
          </button>
        </div>
      </header>

      {/* Admin Main Container */}
      <main className="admin-content-shell">
        <div className="container">
          {/* KPI Statistics Row */}
          <div className="admin-kpi-grid">
            <div
              className={`kpi-card ${pendingCount > 0 ? "kpi-alert" : ""}`}
              onClick={() => setActiveTab("inquiries")}
            >
              <div className="kpi-icon">
                <Icon name="file-text" size={24} />
              </div>
              <div className="kpi-info">
                <span>Pending Bookings</span>
                <strong>{pendingCount}</strong>
                <small>{inquiries.length} total enquiries logged</small>
              </div>
            </div>

            <div className="kpi-card" onClick={() => setActiveTab("trips")}>
              <div className="kpi-icon">
                <Icon name="compass" size={24} />
              </div>
              <div className="kpi-info">
                <span>Active Packages</span>
                <strong>{trips.length}</strong>
                <small>{trips.filter((t) => t.featured).length} featured on homepage</small>
              </div>
            </div>

            <div className="kpi-card" onClick={() => setActiveTab("fleet")}>
              <div className="kpi-icon">
                <Icon name="car" size={24} />
              </div>
              <div className="kpi-info">
                <span>Fleet Vehicles</span>
                <strong>{vehicles.length}</strong>
                <small>{vehicles.filter((v) => v.available).length} available for charter</small>
              </div>
            </div>

            <div className="kpi-card" onClick={() => setActiveTab("hotels")}>
              <div className="kpi-icon">
                <Icon name="hotel" size={24} />
              </div>
              <div className="kpi-info">
                <span>Partner Stays</span>
                <strong>{hotels.length}</strong>
                <small>Lodges, camps & beach resorts</small>
              </div>
            </div>

            <div className="kpi-card" onClick={() => setActiveTab("gallery")}>
              <div className="kpi-icon">
                <Icon name="camera" size={24} />
              </div>
              <div className="kpi-info">
                <span>Gallery Media</span>
                <strong>{gallery.length}</strong>
                <small>Photos & video moments</small>
              </div>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <nav className="admin-nav-tabs">
            <button
              className={`admin-tab-btn ${activeTab === "inquiries" ? "active" : ""}`}
              onClick={() => setActiveTab("inquiries")}
              type="button"
            >
              <Icon name="file-text" size={16} />
              <span>Bookings & Enquiries</span>
              {pendingCount > 0 && <span className="tab-pill-badge">{pendingCount}</span>}
            </button>

            <button
              className={`admin-tab-btn ${activeTab === "trips" ? "active" : ""}`}
              onClick={() => setActiveTab("trips")}
              type="button"
            >
              <Icon name="compass" size={16} />
              <span>Trips & Packages</span>
            </button>

            <button
              className={`admin-tab-btn ${activeTab === "fleet" ? "active" : ""}`}
              onClick={() => setActiveTab("fleet")}
              type="button"
            >
              <Icon name="car" size={16} />
              <span>Vehicle Fleet</span>
            </button>

            <button
              className={`admin-tab-btn ${activeTab === "hotels" ? "active" : ""}`}
              onClick={() => setActiveTab("hotels")}
              type="button"
            >
              <Icon name="hotel" size={16} />
              <span>Hotels & Stays</span>
            </button>

            <button
              className={`admin-tab-btn ${activeTab === "gallery" ? "active" : ""}`}
              onClick={() => setActiveTab("gallery")}
              type="button"
            >
              <Icon name="camera" size={16} />
              <span>Gallery Media</span>
            </button>

            <button
              className={`admin-tab-btn ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
              type="button"
            >
              <Icon name="lock" size={16} />
              <span>Settings & Backup</span>
            </button>
          </nav>

          {/* Active View Container */}
          <div className="admin-tab-body">
            {activeTab === "inquiries" && (
              <InquiriesManager inquiries={inquiries} onRefresh={refreshData} />
            )}

            {activeTab === "trips" && (
              <TripsManager trips={trips} onRefresh={refreshData} />
            )}

            {activeTab === "fleet" && (
              <FleetManager vehicles={vehicles} onRefresh={refreshData} />
            )}

            {activeTab === "hotels" && (
              <HotelsManager hotels={hotels} onRefresh={refreshData} />
            )}

            {activeTab === "gallery" && (
              <GalleryManager gallery={gallery} onRefresh={refreshData} />
            )}

            {activeTab === "settings" && (
              <div className="admin-subview settings-subview">
                <h3>System Settings, Backups & Credentials</h3>
                <p>Manage admin security keys and export/import database backups.</p>

                {importStatus && (
                  <div className="admin-success-box">
                    <Icon name="check" size={16} /> {importStatus}
                  </div>
                )}

                <div className="settings-grid">
                  {/* Security Key */}
                  <div className="settings-card">
                    <h4>
                      <Icon name="lock" size={18} /> Update Admin Password / PIN
                    </h4>
                    <p>Change the secret access key used to sign into the staff portal.</p>
                    <form onSubmit={handleSavePin} className="pin-form">
                      <input
                        type="text"
                        placeholder="Enter new admin PIN or password..."
                        value={newPinInput}
                        onChange={(e) => setNewPinInput(e.target.value)}
                        required
                      />
                      <button type="submit" className="btn btn-primary-sm">
                        Update PIN
                      </button>
                    </form>
                    {pinSavedMsg && (
                      <span className="text-success">
                        <Icon name="check" size={14} /> Password updated successfully!
                      </span>
                    )}
                  </div>

                  {/* Backup / Export */}
                  <div className="settings-card">
                    <h4>
                      <Icon name="download" size={18} /> Export Database Backup
                    </h4>
                    <p>Download a JSON backup of all trips, fleet vehicles, hotels, gallery, and client bookings.</p>
                    <button
                      className="btn btn-outline-sm"
                      onClick={handleExportJSON}
                      type="button"
                    >
                      <Icon name="download" size={16} /> Download JSON Backup
                    </button>
                  </div>

                  {/* Import / Restore */}
                  <div className="settings-card">
                    <h4>
                      <Icon name="refresh" size={18} /> Restore Database Backup
                    </h4>
                    <p>Upload a previously exported JSON backup file to restore records.</p>
                    <label className="btn btn-outline-sm file-upload-btn">
                      <Icon name="plus" size={16} /> Select JSON File to Restore
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportJSON}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>

                  {/* Factory Reset */}
                  <div className="settings-card danger-card">
                    <h4>
                      <Icon name="trash" size={18} /> Factory Reset Seed Data
                    </h4>
                    <p>Reset all database entries to original Kenyan safari packages, vehicles, and lodges.</p>
                    <button
                      className="btn btn-outline-danger-sm"
                      onClick={handleResetDefaults}
                      type="button"
                    >
                      Reset All Data to Defaults
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
