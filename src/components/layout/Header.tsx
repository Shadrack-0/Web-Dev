import { useEffect, useState } from "react";
import { NavigationPage } from "../../types";
import { Icon, Logo } from "../ui/Icon";

export function Header({
  currentPage,
  onNavigate,
  isAdmin,
}: {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  isAdmin: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks: { label: string; page: NavigationPage }[] = [
    { label: "Home", page: "home" },
    { label: "About Us", page: "about" },
    { label: "Trips & Packages", page: "trips" },
    { label: "Car & Bus Hire", page: "transport" },
    { label: "Hotels & Stays", page: "hotels" },
    { label: "Gallery", page: "gallery" },
    { label: "Contact Us", page: "contact" },
  ];

  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-shell">
        <Logo onClick={() => handleNav("home")} />

        <nav className={`main-nav ${open ? "open" : ""}`} aria-label="Main navigation">
          {navLinks.map((item) => (
            <button
              key={item.page}
              className={`nav-link ${currentPage === item.page ? "active" : ""}`}
              onClick={() => handleNav(item.page)}
              type="button"
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Only: Book and Admin options */}
          <div className="mobile-nav-actions">
            <button
              className="btn btn-primary w-full"
              onClick={() => handleNav("booking")}
              type="button"
            >
              Plan Your Trip <Icon name="arrow" size={17} />
            </button>
            <button
              className="btn btn-ghost w-full admin-mobile-link"
              onClick={() => handleNav("admin")}
              type="button"
            >
              <Icon name={isAdmin ? "dashboard" : "lock"} size={16} />
              {isAdmin ? "Admin Dashboard" : "Admin Login"}
            </button>
          </div>
        </nav>

        <div className="header-actions">
          <button
            className="btn btn-primary desktop-book"
            onClick={() => handleNav("booking")}
            type="button"
          >
            Plan Your Trip <Icon name="arrow" size={17} />
          </button>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            type="button"
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
