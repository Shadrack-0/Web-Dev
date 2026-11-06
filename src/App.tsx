import { useState, useEffect } from "react";
import { NavigationPage, Trip } from "./types";
import { StorageService } from "./services/storage";
import { TopBar } from "./components/layout/TopBar";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { TripsPage } from "./components/pages/TripsPage";
import { TransportPage } from "./components/pages/TransportPage";
import { HotelsPage } from "./components/pages/HotelsPage";
import { GalleryPage } from "./components/pages/GalleryPage";
import { ContactPage } from "./components/pages/ContactPage";
import { BookingPage } from "./components/pages/BookingPage";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { Icon } from "./components/ui/Icon";

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>(() => {
    const hash = window.location.hash.replace("#/", "").replace("#", "");
    const validPages: NavigationPage[] = [
      "home",
      "about",
      "trips",
      "transport",
      "hotels",
      "gallery",
      "contact",
      "booking",
      "admin",
    ];
    return validPages.includes(hash as NavigationPage)
      ? (hash as NavigationPage)
      : "home";
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() =>
    StorageService.isAdminLoggedIn()
  );
  const [prefilledService, setPrefilledService] = useState<string | undefined>(
    undefined
  );
  const [prefilledItemTitle, setPrefilledItemTitle] = useState<
    string | undefined
  >(undefined);

  const navigateTo = (
    page: NavigationPage,
    service?: string,
    itemTitle?: string
  ) => {
    if (service) setPrefilledService(service);
    if (itemTitle) setPrefilledItemTitle(itemTitle);
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "").replace("#", "");
      const validPages: NavigationPage[] = [
        "home",
        "about",
        "trips",
        "transport",
        "hotels",
        "gallery",
        "contact",
        "booking",
        "admin",
      ];
      if (validPages.includes(hash as NavigationPage)) {
        setCurrentPage(hash as NavigationPage);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleDataChange = () => {
      setIsAdmin(StorageService.isAdminLoggedIn());
    };
    window.addEventListener("chalcedony_data_change", handleDataChange);
    return () =>
      window.removeEventListener("chalcedony_data_change", handleDataChange);
  }, []);

  const handleSelectTrip = (trip: Trip) => {
    setPrefilledService("Upcoming group trip");
    setPrefilledItemTitle(trip.title);
  };

  const handleSelectService = (service: string, itemTitle?: string) => {
    setPrefilledService(service);
    setPrefilledItemTitle(itemTitle || "");
  };

  // If in admin view
  if (currentPage === "admin") {
    if (!isAdmin) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAdmin(true);
          }}
          onBackToSite={() => navigateTo("home")}
        />
      );
    }

    return (
      <AdminDashboard
        onNavigateSite={navigateTo}
        onLogout={() => {
          StorageService.logoutAdmin();
          setIsAdmin(false);
          navigateTo("home");
        }}
      />
    );
  }

  // Regular Website View
  return (
    <div className="chalcedony-app">
      <TopBar
        onNavigate={navigateTo}
        currentPage={currentPage}
        isAdmin={isAdmin}
      />
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        isAdmin={isAdmin}
      />

      <main className="main-viewport">
        {currentPage === "home" && (
          <Home
            onNavigate={navigateTo}
            onSelectTrip={handleSelectTrip}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === "about" && <About onNavigate={navigateTo} />}

        {currentPage === "trips" && (
          <TripsPage
            onNavigate={navigateTo}
            onSelectTrip={handleSelectTrip}
          />
        )}

        {currentPage === "transport" && (
          <TransportPage
            onNavigate={navigateTo}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === "hotels" && (
          <HotelsPage
            onNavigate={navigateTo}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === "gallery" && <GalleryPage onNavigate={navigateTo} />}

        {currentPage === "contact" && <ContactPage onNavigate={navigateTo} />}

        {currentPage === "booking" && (
          <BookingPage
            onNavigate={navigateTo}
            initialService={prefilledService}
            initialItemTitle={prefilledItemTitle}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} isAdmin={isAdmin} />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        className="floating-whatsapp"
        href="https://wa.me/254722415892?text=Hello%20Chalcedony%20Adventures%2C%20I%20would%20like%20to%20plan%20a%20trip."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with Tour Coordinator on WhatsApp"
      >
        <Icon name="whatsapp" size={26} />
      </a>
    </div>
  );
}
