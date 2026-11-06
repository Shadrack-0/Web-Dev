import { useState, useEffect } from "react";
import { Icon } from "../ui/Icon";
import { NavigationPage } from "../../types";
import { Currency, CurrencyService } from "../../services/currency";

export function TopBar({
  onNavigate,
  currentPage,
  isAdmin,
}: {
  onNavigate: (page: NavigationPage) => void;
  currentPage: NavigationPage;
  isAdmin: boolean;
}) {
  const [currency, setCurrency] = useState<Currency>(() => CurrencyService.getCurrency());

  useEffect(() => {
    const handleCurrencyChange = () => {
      setCurrency(CurrencyService.getCurrency());
    };
    window.addEventListener("chalcedony_currency_change", handleCurrencyChange);
    return () => window.removeEventListener("chalcedony_currency_change", handleCurrencyChange);
  }, []);

  const handleToggleCurrency = (curr: Currency) => {
    CurrencyService.setCurrency(curr);
  };

  return (
    <div className="topbar">
      <div className="container topbar-content">
        <div className="topbar-left">
          <a
            href="https://wa.me/254722415892?text=Hello%20Chalcedony%20Adventures%2C%20I%20would%20like%20to%20inquire%20about%20a%20trip."
            target="_blank"
            rel="noreferrer"
            className="topbar-link"
          >
            <Icon name="whatsapp" size={14} />
            <span>+254 722 415 892</span>
          </a>
          <span className="topbar-divider">·</span>
          <a href="mailto:hello@chalcedonyadventures.com" className="topbar-link">
            <Icon name="mail" size={14} />
            <span>hello@chalcedonyadventures.com</span>
          </a>
          <span className="topbar-divider hidden-mobile">·</span>
          <span className="topbar-item hidden-mobile">
            <Icon name="map" size={14} />
            <span>Nairobi, Kenya</span>
          </span>
        </div>

        <div className="topbar-right">
          {/* Currency Switcher */}
          <div className="currency-selector" title="Choose display currency">
            <button
              type="button"
              className={`curr-btn ${currency === "KES" ? "active" : ""}`}
              onClick={() => handleToggleCurrency("KES")}
            >
              KES
            </button>
            <button
              type="button"
              className={`curr-btn ${currency === "USD" ? "active" : ""}`}
              onClick={() => handleToggleCurrency("USD")}
            >
              USD ($)
            </button>
          </div>

          <span className="topbar-divider">·</span>

          <button
            onClick={() => onNavigate("admin")}
            className={`admin-toggle-btn ${currentPage === "admin" ? "active" : ""}`}
            title="Manage trips, fleet, hotels, gallery and bookings"
            type="button"
          >
            <Icon name={isAdmin ? "unlock" : "lock"} size={13} />
            <span>{isAdmin ? "Admin Dashboard" : "Admin Portal"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
