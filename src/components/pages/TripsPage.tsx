import { useState, useMemo } from "react";
import { Category, NavigationPage, Trip } from "../../types";
import { StorageService } from "../../services/storage";
import { Icon } from "../ui/Icon";

export function TripsPage({
  onNavigate,
  onSelectTrip,
}: {
  onNavigate: (page: NavigationPage) => void;
  onSelectTrip: (trip: Trip) => void;
}) {
  const [trips] = useState<Trip[]>(() => StorageService.getTrips());
  const [favorites, setFavorites] = useState<string[]>(() => StorageService.getFavorites());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [activeModalTrip, setActiveModalTrip] = useState<Trip | null>(null);

  const categories: string[] = [
    "All",
    "Safari",
    "Waterfalls",
    "Hiking",
    "Day trip",
    "Family package",
    "Road trip",
  ];

  const toggleFav = (tripId: string) => {
    StorageService.toggleFavorite(tripId);
    setFavorites(StorageService.getFavorites());
  };

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchCat =
        selectedCategory === "All" || trip.category === selectedCategory;
      const matchSearch =
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.overview.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceKES - b.priceKES;
      if (sortBy === "price-desc") return b.priceKES - a.priceKES;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [trips, selectedCategory, searchQuery, sortBy]);

  const handleBook = (trip: Trip) => {
    onSelectTrip(trip);
    onNavigate("booking");
  };

  return (
    <div className="page-trips">
      {/* Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-kicker">
            <button onClick={() => onNavigate("home")} type="button">
              Home
            </button>
            <span>/</span>
            <strong>Trips & Packages</strong>
          </div>
          <h1>
            Curated Safaris &
            <br />
            Wilderness <em>Adventures.</em>
          </h1>
          <p className="page-hero-sub">
            From the endless savannahs of the Maasai Mara to cascading waterfalls in the
            Aberdares, discover our upcoming group departures and tailor-made journeys.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="trips-filter-strip">
        <div className="container filter-container">
          {/* Categories */}
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "All" ? "All Trips" : cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="filter-controls">
            <div className="search-box">
              <Icon name="search" size={17} />
              <input
                type="text"
                placeholder="Search destination or trip name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchQuery("")}
                >
                  <Icon name="close" size={15} />
                </button>
              )}
            </div>

            <div className="sort-box">
              <label>Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Cards Grid */}
      <section className="section trips-catalog-section">
        <div className="container">
          <div className="results-count-bar">
            <span>
              Showing <strong>{filteredTrips.length}</strong> trips & packages
            </span>
            {selectedCategory !== "All" && (
              <button
                className="btn-text-clear"
                onClick={() => setSelectedCategory("All")}
              >
                Reset filter
              </button>
            )}
          </div>

          {filteredTrips.length === 0 ? (
            <div className="empty-results-box">
              <Icon name="compass" size={48} />
              <h3>No adventures match your criteria</h3>
              <p>Try adjusting your search terms or view all trips.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                View All Trips
              </button>
            </div>
          ) : (
            <div className="trips-catalog-grid">
              {filteredTrips.map((trip) => {
                const isFav = favorites.includes(trip.id);
                return (
                  <article className="trip-catalog-card" key={trip.id}>
                    <div className="trip-catalog-image">
                      <img src={trip.featuredImage} alt={trip.title} />
                      <span className="trip-tag">{trip.tag}</span>
                      <button
                        className={`trip-fav-btn ${isFav ? "active" : ""}`}
                        onClick={() => toggleFav(trip.id)}
                        aria-label={`Save ${trip.title}`}
                        type="button"
                      >
                        <Icon name="heart" size={18} />
                      </button>
                      <div className="trip-location-badge">
                        <Icon name="map" size={13} />
                        <span>{trip.location}</span>
                      </div>
                    </div>

                    <div className="trip-catalog-content">
                      <div className="trip-meta-row">
                        <span className="trip-category">{trip.category}</span>
                        <span className="spots-badge">
                          <Icon name="users" size={13} /> {trip.spotsLeft} spots left
                        </span>
                      </div>

                      <h3>{trip.title}</h3>
                      <p className="trip-overview">{trip.subtitle || trip.overview}</p>

                      {/* Highlights bullets */}
                      {trip.highlights && trip.highlights.length > 0 && (
                        <ul className="trip-highlights-list">
                          {trip.highlights.slice(0, 2).map((h, i) => (
                            <li key={i}>
                              <Icon name="check" size={14} />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="trip-details">
                        <span>
                          <Icon name="clock" size={16} />
                          {trip.duration}
                        </span>
                        <span>
                          <Icon name="calendar" size={16} />
                          {trip.date}
                        </span>
                      </div>

                      <div className="trip-card-bottom">
                        <div className="price-tag">
                          <small>FROM</small>
                          <strong>KES {trip.priceKES.toLocaleString()}</strong>
                          <span className="per-person"> / person</span>
                          {trip.priceUSD && (
                            <span className="usd-equivalent">
                              (~${trip.priceUSD} USD)
                            </span>
                          )}
                        </div>
                        <div className="card-btn-group">
                          <button
                            type="button"
                            className="btn btn-outline-sm"
                            onClick={() => setActiveModalTrip(trip)}
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary-sm"
                            onClick={() => handleBook(trip)}
                          >
                            Book <Icon name="arrow" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Custom Journey Callout Banner */}
      <section className="ready-cta-section">
        <div className="container">
          <div className="ready-cta-card">
            <div className="ready-cta-content">
              <span className="eyebrow">Tailor-Made Expeditions</span>
              <h2>Want a private dates or bespoke destination?</h2>
              <p>
                From family reunions and honeymoons to school and church retreats, we design
                exclusive custom packages around your schedule and budget.
              </p>
            </div>
            <div className="ready-cta-actions">
              <button
                className="btn btn-gold"
                onClick={() => onNavigate("booking")}
                type="button"
              >
                Design Custom Package <Icon name="arrow" size={18} />
              </button>
              <a
                href="https://wa.me/254722415892?text=Hello%20Chalcedony%20Adventures%2C%20I%20would%20like%20to%20request%20a%20custom%20trip%20itinerary."
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <Icon name="whatsapp" size={18} /> Chat with Tour Planner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Details Modal */}
      {activeModalTrip && (
        <div className="modal-overlay" onClick={() => setActiveModalTrip(null)}>
          <div
            className="modal-card trip-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setActiveModalTrip(null)}
              type="button"
              aria-label="Close modal"
            >
              <Icon name="close" size={20} />
            </button>

            <div className="trip-modal-media">
              <img
                src={activeModalTrip.featuredImage}
                alt={activeModalTrip.title}
              />
              <div className="trip-modal-badge-row">
                <span className="trip-tag">{activeModalTrip.tag}</span>
                <span className="trip-category">{activeModalTrip.category}</span>
              </div>
            </div>

            <div className="trip-modal-content">
              <div className="modal-header-info">
                <h2>{activeModalTrip.title}</h2>
                <div className="modal-meta-grid">
                  <div className="meta-box">
                    <Icon name="map" size={16} />
                    <span>{activeModalTrip.location}</span>
                  </div>
                  <div className="meta-box">
                    <Icon name="clock" size={16} />
                    <span>{activeModalTrip.duration}</span>
                  </div>
                  <div className="meta-box">
                    <Icon name="calendar" size={16} />
                    <span>{activeModalTrip.date}</span>
                  </div>
                  <div className="meta-box">
                    <Icon name="users" size={16} />
                    <span>{activeModalTrip.spotsLeft} spots available</span>
                  </div>
                </div>
              </div>

              <div className="modal-body-section">
                <h4>Overview</h4>
                <p>{activeModalTrip.overview}</p>
              </div>

              {activeModalTrip.highlights && activeModalTrip.highlights.length > 0 && (
                <div className="modal-body-section">
                  <h4>Trip Highlights</h4>
                  <ul className="check-list">
                    {activeModalTrip.highlights.map((h, i) => (
                      <li key={i}>
                        <Icon name="check" size={16} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeModalTrip.itinerary && activeModalTrip.itinerary.length > 0 && (
                <div className="modal-body-section">
                  <h4>Day-by-Day Itinerary</h4>
                  <div className="itinerary-timeline">
                    {activeModalTrip.itinerary.map((item, idx) => (
                      <div className="timeline-day" key={idx}>
                        <span className="day-pill">{item.day}</span>
                        <div className="day-details">
                          <h5>{item.title}</h5>
                          <p>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="inclusions-grid">
                <div className="inc-col">
                  <h5>What's Included</h5>
                  <ul>
                    {activeModalTrip.included?.map((inc, i) => (
                      <li key={i}>
                        <Icon name="check" size={15} /> <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="exc-col">
                  <h5>What's Excluded</h5>
                  <ul>
                    {activeModalTrip.excluded?.map((exc, i) => (
                      <li key={i}>
                        <Icon name="close" size={15} /> <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="trip-modal-footer">
                <div>
                  <small>TOTAL PRICE</small>
                  <strong>
                    KES {activeModalTrip.priceKES.toLocaleString()}{" "}
                    <span>/ person</span>
                  </strong>
                </div>
                <div className="modal-action-btns">
                  <a
                    href={`https://wa.me/254722415892?text=Hello%20Chalcedony%20Adventures%2C%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(
                      activeModalTrip.title
                    )}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    <Icon name="whatsapp" size={17} /> Enquire on WhatsApp
                  </a>
                  <button
                    className="btn btn-gold"
                    onClick={() => {
                      setActiveModalTrip(null);
                      handleBook(activeModalTrip);
                    }}
                    type="button"
                  >
                    Reserve Now <Icon name="arrow" size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
