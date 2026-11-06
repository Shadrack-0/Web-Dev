import { useState, useMemo } from "react";
import { NavigationPage, Vehicle, VehicleCategory } from "../../types";
import { StorageService } from "../../services/storage";
import { Icon } from "../ui/Icon";

export function TransportPage({
  onNavigate,
  onSelectService,
}: {
  onNavigate: (page: NavigationPage) => void;
  onSelectService: (service: string, itemTitle?: string) => void;
}) {
  const [vehicles] = useState<Vehicle[]>(() => StorageService.getVehicles());
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const categories: string[] = [
    "All",
    "Safari 4x4",
    "Tour Van",
    "Mini Bus",
    "Luxury Coach",
    "Executive 4x4 / VIP",
  ];

  const filteredVehicles = useMemo(() => {
    if (selectedCat === "All") return vehicles;
    return vehicles.filter((v) => v.category === selectedCat);
  }, [vehicles, selectedCat]);

  const handleRequestQuote = (veh: Vehicle) => {
    onSelectService("Car or bus hire", veh.name);
    onNavigate("booking");
  };

  return (
    <div className="page-transport">
      {/* Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-kicker">
            <button onClick={() => onNavigate("home")} type="button">
              Home
            </button>
            <span>/</span>
            <strong>Car & Bus Hire</strong>
          </div>
          <h1>
            Reliable Fleet for
            <br />
            Every <em>Journey.</em>
          </h1>
          <p className="page-hero-sub">
            From heavy-duty Safari Land Cruisers tackling rough national park tracks to executive
            coaches for corporate team building and church missions.
          </p>
        </div>
      </section>

      {/* Services Overview Banner */}
      <section className="section bg-light-sand transport-services-overview">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Comprehensive Fleet Hire</span>
            <h2>Our Specialized Transport Services</h2>
            <p>Punctual, fully insured, and chauffeured by experienced professional drivers.</p>
          </div>

          <div className="hire-services-grid">
            <div className="hire-service-box">
              <Icon name="compass" size={26} />
              <h4>Safari & Bush Expeditions</h4>
              <p>Custom 4x4 vehicles with pop-up roofs, all-terrain suspension, and guide radios.</p>
            </div>
            <div className="hire-service-box">
              <Icon name="car" size={26} />
              <h4>Airport Transfers</h4>
              <p>Smooth, scheduled pickups from JKIA and Wilson airports direct to your hotel or meeting.</p>
            </div>
            <div className="hire-service-box">
              <Icon name="bus" size={26} />
              <h4>Corporate & Team Building</h4>
              <p>28 to 50-seater luxury buses for company retreats, conferences, and staff shuttles.</p>
            </div>
            <div className="hire-service-box">
              <Icon name="users" size={26} />
              <h4>Church & School Trips</h4>
              <p>Safe, speed-governed group transport for youth fellowships, camps, and choir missions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Catalog Section */}
      <section className="section fleet-catalog-section">
        <div className="container">
          <div className="fleet-filter-bar">
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${selectedCat === cat ? "active" : ""}`}
                  onClick={() => setSelectedCat(cat)}
                >
                  {cat === "All" ? "All Fleet" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="fleet-grid">
            {filteredVehicles.map((veh) => (
              <article className="vehicle-card" key={veh.id}>
                <div className="vehicle-image-wrapper">
                  <img src={veh.image} alt={veh.name} />
                  <span className="vehicle-cat-tag">{veh.category}</span>
                  {veh.available ? (
                    <span className="status-pill available">Available</span>
                  ) : (
                    <span className="status-pill booked">Reserved</span>
                  )}
                </div>

                <div className="vehicle-body">
                  <div className="vehicle-spec-row">
                    <span title="Passenger Capacity">
                      <Icon name="seat" size={15} />
                      <b>{veh.capacity}</b>
                    </span>
                    <span title="Luggage Capacity">
                      <Icon name="luggage" size={15} />
                      <b>{veh.luggageCapacity}</b>
                    </span>
                    <span title="Transmission">
                      <Icon name="car" size={15} />
                      <b>{veh.transmission}</b>
                    </span>
                  </div>

                  <h3>{veh.name}</h3>
                  <p className="vehicle-desc">{veh.description}</p>

                  <div className="vehicle-features-list">
                    {veh.features.map((feat, i) => (
                      <span key={i} className="feat-chip">
                        <Icon name="check" size={12} /> {feat}
                      </span>
                    ))}
                  </div>

                  <div className="vehicle-footer">
                    <div>
                      <small>DAILY RATE (CHAUFFEURED)</small>
                      <strong>KES {veh.dailyRateKES.toLocaleString()}</strong>
                      <span className="fuel-note"> / day + fuel</span>
                    </div>

                    <div className="vehicle-actions">
                      <a
                        href={`https://wa.me/254722415892?text=Hello%20Chalcedony%2C%20I%20need%20a%20quotation%20for%20the%20${encodeURIComponent(
                          veh.name
                        )}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-icon-wa"
                        title="Inquire on WhatsApp"
                      >
                        <Icon name="whatsapp" size={16} />
                      </a>
                      <button
                        className="btn btn-primary-sm"
                        onClick={() => handleRequestQuote(veh)}
                        type="button"
                      >
                        Request Quote <Icon name="arrow" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Standards Guarantee */}
      <section className="section bg-forest text-light">
        <div className="container">
          <div className="standards-grid">
            <div className="standard-item">
              <Icon name="shield" size={32} />
              <h4>Comprehensive Insurance</h4>
              <p>Every passenger seat is covered under full commercial public service vehicle insurance.</p>
            </div>
            <div className="standard-item">
              <Icon name="car" size={32} />
              <h4>GPS & Speed Governor Regulated</h4>
              <p>All vans and buses are governed strictly at 80 km/h with 24/7 satellite speed tracking.</p>
            </div>
            <div className="standard-item">
              <Icon name="users" size={32} />
              <h4>Vetted Professional Chauffeurs</h4>
              <p>Uniformed, defensive-driving certified drivers with extensive knowledge of Kenyan roads.</p>
            </div>
            <div className="standard-item">
              <Icon name="clock" size={32} />
              <h4>24/7 Breakdown & Rescue Support</h4>
              <p>Round-the-clock replacement vehicle guarantee across all major highways and transit routes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="ready-cta-section">
        <div className="container">
          <div className="ready-cta-card">
            <div className="ready-cta-content">
              <span className="eyebrow">Get an Instant Quote</span>
              <h2>Planning a group trip, wedding, or corporate event?</h2>
              <p>
                Tell us your pickup point, destination, dates, and group size. We will respond with
                a competitive, all-inclusive quote within 2 hours.
              </p>
            </div>
            <div className="ready-cta-actions">
              <button
                className="btn btn-gold"
                onClick={() => {
                  onSelectService("Car or bus hire");
                  onNavigate("booking");
                }}
                type="button"
              >
                Request Quotation <Icon name="arrow" size={18} />
              </button>
              <a
                href="https://wa.me/254722415892?text=Hello%20Chalcedony%20Transport%20Desk%2C%20I%20would%20like%20a%20vehicle%20hire%20quotation."
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <Icon name="whatsapp" size={18} /> WhatsApp Fleet Desk
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
