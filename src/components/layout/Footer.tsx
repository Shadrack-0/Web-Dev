import { NavigationPage } from "../../types";
import { Icon, Logo } from "../ui/Icon";

export function Footer({
  onNavigate,
  isAdmin,
}: {
  onNavigate: (page: NavigationPage) => void;
  isAdmin: boolean;
}) {
  const navigateTo = (page: NavigationPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="container footer-main">
        {/* Brand column */}
        <div className="footer-brand">
          <Logo light onClick={() => navigateTo("home")} />
          <p>
            Thoughtfully planned adventures, safaris, private charters, and authentic stays
            across Kenya and East Africa.
          </p>
          <div className="footer-badges">
            <span className="footer-pill">
              <Icon name="shield" size={14} /> TRA Registered Tour Operator
            </span>
            <span className="footer-pill">
              <Icon name="star" size={14} /> 4.9 Rated by 500+ Travelers
            </span>
          </div>
        </div>

        {/* Explore Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <button onClick={() => navigateTo("trips")} type="button">
            Upcoming Trips & Safaris
          </button>
          <button onClick={() => navigateTo("transport")} type="button">
            Car & Bus Hire Fleet
          </button>
          <button onClick={() => navigateTo("hotels")} type="button">
            Lodges, Camps & Stays
          </button>
          <button onClick={() => navigateTo("booking")} type="button">
            Custom Group Itineraries
          </button>
          <button onClick={() => navigateTo("gallery")} type="button">
            Travel Moments Gallery
          </button>
        </div>

        {/* Company Links */}
        <div className="footer-links">
          <h4>Company</h4>
          <button onClick={() => navigateTo("about")} type="button">
            Our Story & Values
          </button>
          <button onClick={() => navigateTo("about")} type="button">
            Meet the Field Guides
          </button>
          <button onClick={() => navigateTo("contact")} type="button">
            Office & Location
          </button>
          <button onClick={() => navigateTo("contact")} type="button">
            Frequently Asked Questions
          </button>
          <button
            onClick={() => navigateTo("admin")}
            type="button"
            className="footer-admin-link"
          >
            <Icon name={isAdmin ? "dashboard" : "lock"} size={13} />
            {isAdmin ? "Admin Dashboard" : "Staff / Admin Portal"}
          </button>
        </div>

        {/* Contact info & socials */}
        <div className="footer-links footer-contact">
          <h4>Let’s Connect</h4>
          <a
            href="https://wa.me/254722415892?text=Hello%20Chalcedony%20Adventures%2C%20I%20would%20like%20to%20plan%20a%20trip."
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            <Icon name="whatsapp" size={17} />
            <div>
              <strong>+254 722 415 892</strong>
              <small>WhatsApp (Instant Reply)</small>
            </div>
          </a>
          <a href="mailto:hello@chalcedonyadventures.com" className="contact-link">
            <Icon name="mail" size={17} />
            <div>
              <strong>hello@chalcedonyadventures.com</strong>
              <small>Official Reservations</small>
            </div>
          </a>
          <div className="contact-link static-item">
            <Icon name="map" size={17} />
            <div>
              <strong>The Promenade, Westlands</strong>
              <small>Nairobi, Kenya</small>
            </div>
          </div>

          <div className="socials">
            <a
              href="https://www.instagram.com/chalcedonyadventures"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Chalcedony on Instagram"
              title="Instagram"
            >
              <Icon name="instagram" size={18} />
            </a>
            <a
              href="https://www.facebook.com/chalcedonyadventures"
              target="_blank"
              rel="noreferrer"
              aria-label="Chalcedony Facebook"
              title="Facebook"
            >
              f
            </a>
            <a
              href="https://www.tiktok.com/@chalcedonyadventures"
              target="_blank"
              rel="noreferrer"
              aria-label="Chalcedony TikTok"
              title="TikTok"
            >
              ♪
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <small>© {new Date().getFullYear()} Chalcedony Adventures Ltd. All rights reserved.</small>
        <div className="footer-bottom-links">
          <span>Explore</span>
          <span>·</span>
          <span>Connect</span>
          <span>·</span>
          <span>Experience Kenya</span>
        </div>
      </div>
    </footer>
  );
}
