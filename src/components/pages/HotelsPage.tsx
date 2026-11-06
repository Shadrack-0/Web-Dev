import { useState, useMemo } from "react";
import { HotelStay, NavigationPage } from "../../types";
import { StorageService } from "../../services/storage";
import { Icon } from "../ui/Icon";

export function HotelsPage({
  onNavigate,
  onSelectService,
}: {
  onNavigate: (page: NavigationPage) => void;
  onSelectService: (service: string, itemTitle?: string) => void;
}) {
  const [hotels] = useState<HotelStay[]>(() => StorageService.getHotels());
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const regions: string[] = [
    "All",
    "Maasai Mara",
    "Coast & Diani",
    "Amboseli & Tsavo",
    "Rift Valley & Lakes",
    "Mount Kenya & Aberdares",
    "Nairobi",
  ];

  const filteredHotels = useMemo(() => {
    if (selectedRegion === "All") return hotels;
    return hotels.filter((h) => h.region === selectedRegion);
  }, [hotels, selectedRegion]);

  const handleEnquire = (hotel: HotelStay) => {
    onSelectService("Hotel & accommodation", hotel.name);
    onNavigate("booking");
  };

  return (
    <div className="page-hotels">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-kicker">
            <button onClick={() => onNavigate("home")} type="button">
              Home
            </button>
            <span>/</span>
            <strong>Hotels & Accommodation</strong>
          </div>
          <h1>
            Hand-Picked Lodges &
            <br />
            Serene <em>Sanctuaries.</em>
          </h1>
          <p className="page-hero-sub">
            From luxury tented bush camps overlooking Mara wildebeest crossings to sun-kissed
            coastal villas on Diani’s white sands. We secure prime rooms and preferential rates.
          </p>
        </div>
      </section>

      {/* Region Filter Bar */}
      <section className="trips-filter-strip">
        <div className="container filter-container">
          <div className="category-pills">
            {regions.map((reg) => (
              <button
                key={reg}
                type="button"
                className={`category-pill ${selectedRegion === reg ? "active" : ""}`}
                onClick={() => setSelectedRegion(reg)}
              >
                {reg === "All" ? "All Destinations" : reg}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="section hotels-catalog-section">
        <div className="container">
          <div className="results-count-bar">
            <span>
              Showing <strong>{filteredHotels.length}</strong> vetted properties
            </span>
            {selectedRegion !== "All" && (
              <button
                className="btn-text-clear"
                onClick={() => setSelectedRegion("All")}
              >
                Show all regions
              </button>
            )}
          </div>

          <div className="hotels-grid">
            {filteredHotels.map((hotel) => (
              <article className="hotel-card" key={hotel.id}>
                <div className="hotel-image-wrapper">
                  <img src={hotel.image} alt={hotel.name} />
                  <span className="hotel-cat-badge">{hotel.category}</span>
                  <div className="hotel-rating">
                    <Icon name="star" size={14} />
                    <span>{hotel.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="hotel-body">
                  <div className="hotel-region-tag">
                    <Icon name="map" size={14} />
                    <span>{hotel.location}</span>
                  </div>

                  <h3>{hotel.name}</h3>
                  <p className="hotel-desc">{hotel.description}</p>

                  <div className="hotel-amenities-wrap">
                    {hotel.amenities.map((amenity, i) => (
                      <span key={i} className="amenity-chip">
                        <Icon name="check" size={12} /> {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="hotel-footer">
                    <div>
                      <small>STARTING FROM</small>
                      <strong>KES {hotel.pricePerNightKES.toLocaleString()}</strong>
                      <span className="night-note"> / night</span>
                    </div>

                    <div className="hotel-actions">
                      <a
                        href={`https://wa.me/254722415892?text=Hello%20Chalcedony%2C%20I%20would%20like%20to%20enquire%20about%20rates%20for%20${encodeURIComponent(
                          hotel.name
                        )}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-icon-wa"
                        title="Enquire on WhatsApp"
                      >
                        <Icon name="whatsapp" size={16} />
                      </a>
                      <button
                        className="btn btn-primary-sm"
                        onClick={() => handleEnquire(hotel)}
                        type="button"
                      >
                        Enquire / Book <Icon name="arrow" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Group & Corporate Booking Perks Banner */}
      <section className="section bg-light-sand">
        <div className="container">
          <div className="group-stay-box">
            <div className="group-stay-info">
              <span className="eyebrow">Group Stays & Retreats</span>
              <h2>Organizing a large group, wedding, or conference?</h2>
              <p>
                Take advantage of our direct corporate partnerships with Kenya’s premier lodge
                chains (Serena, Sarova, Sopa, Heritage, and boutique private conservancies).
              </p>
              <div className="perks-row">
                <div className="perk">
                  <Icon name="check" size={16} />
                  <span>Substantial volume discounts</span>
                </div>
                <div className="perk">
                  <Icon name="check" size={16} />
                  <span>Complimentary room upgrades</span>
                </div>
                <div className="perk">
                  <Icon name="check" size={16} />
                  <span>Dedicated conference & banquet setups</span>
                </div>
              </div>
            </div>
            <div className="group-stay-btn-col">
              <button
                className="btn btn-gold"
                onClick={() => {
                  onSelectService("Hotel & accommodation", "Group Accommodation Booking");
                  onNavigate("booking");
                }}
                type="button"
              >
                Send Group Enquiry <Icon name="arrow" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
