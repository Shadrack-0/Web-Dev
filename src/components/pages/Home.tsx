import { useState, useEffect } from "react";
import { NavigationPage, Trip } from "../../types";
import { StorageService } from "../../services/storage";
import { Currency, CurrencyService } from "../../services/currency";
import { Icon } from "../ui/Icon";

export function Home({
  onNavigate,
  onSelectTrip,
  onSelectService,
}: {
  onNavigate: (page: NavigationPage) => void;
  onSelectTrip: (trip: Trip) => void;
  onSelectService: (service: string, itemTitle?: string) => void;
}) {
  const [trips] = useState<Trip[]>(() => StorageService.getTrips());
  const [favorites, setFavorites] = useState<string[]>(() => StorageService.getFavorites());
  const [searchDestination, setSearchDestination] = useState("");
  const [searchService, setSearchService] = useState("Upcoming group trip");
  const [currency, setCurrency] = useState<Currency>(() => CurrencyService.getCurrency());
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleCurr = () => setCurrency(CurrencyService.getCurrency());
    window.addEventListener("chalcedony_currency_change", handleCurr);
    return () => window.removeEventListener("chalcedony_currency_change", handleCurr);
  }, []);

  const testimonials = [
    {
      quote:
        "It wasn’t just a safari. It was the kind of weekend that recharges your soul—panoramic views, seamless 4x4 cruiser transport, delicious food, and guides who treated us like family.",
      author: "Wanjiku Mwangi",
      trip: "Maasai Mara 3-Day Safari Experience",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote:
        "Chasing waterfalls in the Aberdares was breathtaking. The bus was clean, punctual, and safe. As a solo traveler I made lifelong friends by the campfire. Best travel squad in Kenya!",
      author: "Kevin Ochieng",
      trip: "Aberdares Cloud Forest & Karuru Falls",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote:
        "We chartered two 33-seater executive buses for our church retreat to Naivasha. Drivers were patient, professional, and knowledgeable. Unbeatable value and zero stress.",
      author: "Rev. Grace Njeri",
      trip: "Corporate & Church Bus Charter",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote:
        "Our family holiday to Diani was flawless. Hand-picked beachfront resort with great kids facilities, and the Wasini dolphin dhow tour was unforgettable. 10/10 recommend!",
      author: "Farah & Tariq Al-Mansoor",
      trip: "Diani Beach & Marine Sanctuary Package",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
  ];

  const toggleFav = (tripId: string) => {
    StorageService.toggleFavorite(tripId);
    setFavorites(StorageService.getFavorites());
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectService(searchService, searchDestination || undefined);
    onNavigate("booking");
  };

  const featuredTrips = trips.filter((t) => t.featured).slice(0, 3);
  const displayTrips = featuredTrips.length > 0 ? featuredTrips : trips.slice(0, 3);

  return (
    <div className="page-home">
      {/* Hero Section */}
      <section className="hero" id="home">
        <img
          src="https://images.unsplash.com/photo-1547471080-d5e8a6d4fb4c?auto=format&fit=crop&w=1920&q=85"
          alt="Safari vehicle crossing the African savannah at sunrise"
          className="hero-bg"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-kicker">
            <span />
            <p>Unforgettable Journeys Across Kenya</p>
          </div>
          <h1>
            Go where you feel
            <br />
            <em>most alive.</em>
          </h1>
          <p className="hero-copy">
            Boutique safaris, group weekend escapes, dependable fleet hire, and hand-picked
            lodges—crafted with passion and local expertise.
          </p>

          <div className="hero-actions">
            <button
              className="btn btn-gold"
              onClick={() => onNavigate("trips")}
              type="button"
            >
              Explore All Trips <Icon name="arrow" size={18} />
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => onNavigate("booking")}
              type="button"
            >
              Custom Trip Enquiry
            </button>
          </div>

          {/* Quick Search Strip */}
          <form className="hero-quick-search" onSubmit={handleHeroSearch}>
            <div className="search-field">
              <label>
                <Icon name="map" size={16} /> Destination / Experience
              </label>
              <input
                type="text"
                placeholder="e.g. Maasai Mara, Aberdares..."
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
              />
            </div>
            <div className="search-field">
              <label>
                <Icon name="compass" size={16} /> Service Type
              </label>
              <select
                value={searchService}
                onChange={(e) => setSearchService(e.target.value)}
              >
                <option value="Upcoming group trip">Upcoming Group Trips</option>
                <option value="Custom safari">Private Custom Safari</option>
                <option value="Car or bus hire">Car or Bus Hire</option>
                <option value="Hotel & accommodation">Hotel & Lodge Stay</option>
                <option value="Family package">Family Vacation</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary search-submit-btn">
              <span>Find Adventures</span>
              <Icon name="arrow" size={16} />
            </button>
          </form>

          {/* Trust stats */}
          <div className="hero-trust">
            <div className="avatars">
              <span style={{ backgroundImage: `url(https://images.unsplash.com/photo-1709567484031-87bc70607500?auto=format&fit=crop&w=400&q=80)` }} />
              <span style={{ backgroundImage: `url(https://images.unsplash.com/photo-1747359637124-cbc97106271c?auto=format&fit=crop&w=400&q=80)` }} />
              <span style={{ backgroundImage: `url(https://images.unsplash.com/photo-1706398977072-e3b085a47e72?auto=format&fit=crop&w=400&q=80)` }} />
            </div>
            <div>
              <strong>
                4.9 <span>★★★★★</span>
              </strong>
              <small>Trusted by 500+ happy adventurers across East Africa</small>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section className="section trips-section" id="featured-trips">
        <div className="container">
          <div className="split-heading">
            <div className="section-heading">
              <span className="eyebrow">Upcoming Escapes</span>
              <h2>
                Your next story
                <br />
                starts <em>here.</em>
              </h2>
            </div>
            <div className="section-intro">
              <p>
                From spontaneous weekend waterfall hikes to bucket-list Maasai Mara migrations,
                every journey is fully managed and escorted by passionate guides.
              </p>
              <button
                className="text-link"
                onClick={() => onNavigate("trips")}
                type="button"
              >
                View all {trips.length} packages <Icon name="arrow" size={17} />
              </button>
            </div>
          </div>

          <div className="trip-grid">
            {displayTrips.map((trip) => {
              const isFav = favorites.includes(trip.id);
              return (
                <article className="trip-card" key={trip.id}>
                  <div className="trip-image">
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
                  <div className="trip-body">
                    <div className="trip-meta-row">
                      <span className="trip-category">{trip.category}</span>
                      <span className="spots-badge">
                        <Icon name="users" size={13} /> {trip.spotsLeft} spots left
                      </span>
                    </div>
                    <h3>{trip.title}</h3>
                    <p className="trip-desc-snip">{trip.subtitle || trip.overview}</p>
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
                    <div className="trip-footer">
                      <div>
                        <small>FROM</small>
                        <strong>KES {trip.priceKES.toLocaleString()}</strong>
                        <small> / person</small>
                      </div>
                      <div className="trip-card-actions">
                        <button
                          className="btn-icon-book"
                          onClick={() => {
                            onSelectTrip(trip);
                            onNavigate("booking");
                          }}
                          title="Book this trip"
                          type="button"
                        >
                          Book <Icon name="arrow" size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services section" id="services">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Everything You Need</span>
            <h2>
              Complete Travel Solutions
              <br />
              to <em>Go Further.</em>
            </h2>
            <p>One trusted local partner from your first idea to the journey back home.</p>
          </div>

          <div className="service-grid">
            <article className="service-card" onClick={() => onNavigate("trips")}>
              <span className="service-number">01</span>
              <div className="service-icon">
                <Icon name="compass" size={28} />
              </div>
              <h3>Curated Group Trips</h3>
              <p>
                Join weekend getaways, waterfall chases, mountain treks, and migration safaris with
                fun, vibrant groups.
              </p>
              <button
                type="button"
                className="service-link-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("trips");
                }}
              >
                <span>Browse Packages</span>
                <Icon name="arrow" size={18} />
              </button>
            </article>

            <article className="service-card" onClick={() => onNavigate("transport")}>
              <span className="service-number">02</span>
              <div className="service-icon">
                <Icon name="car" size={28} />
              </div>
              <h3>Car & Bus Hire</h3>
              <p>
                Safari Land Cruisers, tour vans, and 28–50 seater coaches for corporate team building,
                churches, and road trips.
              </p>
              <button
                type="button"
                className="service-link-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("transport");
                }}
              >
                <span>View Fleet & Rates</span>
                <Icon name="arrow" size={18} />
              </button>
            </article>

            <article className="service-card" onClick={() => onNavigate("hotels")}>
              <span className="service-number">03</span>
              <div className="service-icon">
                <Icon name="hotel" size={28} />
              </div>
              <h3>Hotels & Lodges</h3>
              <p>
                From luxury tented bush camps in the Mara to beachfront villas in Diani. Negotiated
                rates and seamless reservations.
              </p>
              <button
                type="button"
                className="service-link-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("hotels");
                }}
              >
                <span>Discover Stays</span>
                <Icon name="arrow" size={18} />
              </button>
            </article>

            <article
              className="service-card"
              onClick={() => {
                onSelectService("Custom safari");
                onNavigate("booking");
              }}
            >
              <span className="service-number">04</span>
              <div className="service-icon">
                <Icon name="spark" size={28} />
              </div>
              <h3>Custom Itineraries</h3>
              <p>
                Have a unique destination or family vacation in mind? We design tailor-made packages
                around your budget and pace.
              </p>
              <button
                type="button"
                className="service-link-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectService("Custom safari");
                  onNavigate("booking");
                }}
              >
                <span>Request Custom Plan</span>
                <Icon name="arrow" size={18} />
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* Story Teaser */}
      <section className="story section" id="story-teaser">
        <div className="container story-grid">
          <div className="story-images">
            <div className="story-main">
              <img
                src="https://images.unsplash.com/photo-1709567484031-87bc70607500?auto=format&fit=crop&w=1200&q=84"
                alt="Friends enjoying Kenyan adventures"
              />
            </div>
            <div className="story-small">
              <img
                src="https://images.unsplash.com/photo-1605302596013-fccbe2f06298?auto=format&fit=crop&w=800&q=84"
                alt="Safari cruiser on the highway"
              />
            </div>
            <div className="experience-stamp">
              <strong>8+</strong>
              <span>
                YEARS OF
                <br />
                ADVENTURE
              </span>
            </div>
          </div>
          <div className="story-copy">
            <div className="section-heading">
              <span className="eyebrow">Our Philosophy</span>
              <h2>
                Travel is better
                <br />
                when it <em>means more.</em>
              </h2>
            </div>
            <p>
              Chalcedony Adventures was born in Nairobi out of a love for raw nature and community.
              We believe a great trip is not just about visiting places—it is about the joy of
              unexpected encounters, the crisp morning chill of the savannah, and bonds forged
              around evening campfires.
            </p>
            <p>
              Whether you are a solo traveler craving new friendships, a church group on an
              annual fellowship, or a company rewarding top achievers, our licensed drivers and
              naturalists ensure complete comfort and safety.
            </p>
            <div className="values">
              <span>
                <Icon name="shield" size={20} />
                <b>Safety Certified</b>
              </span>
              <span>
                <Icon name="heart" size={20} />
                <b>Planned With Heart</b>
              </span>
              <span>
                <Icon name="users" size={20} />
                <b>Community First</b>
              </span>
            </div>
            <button
              className="text-link"
              onClick={() => onNavigate("about")}
              type="button"
            >
              Learn more about our team & mission <Icon name="arrow" size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Accommodation Highlight Strip */}
      <section className="stay-feature" id="stay-teaser">
        <div className="stay-image">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85"
            alt="Mara Serena Safari Lodge swimming pool overlooking nature"
          />
        </div>
        <div className="stay-panel">
          <span className="eyebrow">Hand-Picked Hospitality</span>
          <h2>
            Your perfect stay,
            <br />
            <em>found.</em>
          </h2>
          <p>
            Tell us the vibe you desire—from an eco-tented bush sanctuary with wildlife drinking at
            the watering hole, to oceanfront cabanas in Diani. We take care of rates, group
            discounts, and confirmed bookings.
          </p>
          <ul>
            <li>
              <span>01</span> Vetted luxury lodges & authentic eco-camps
            </li>
            <li>
              <span>02</span> Exclusive group rates & seasonal resident specials
            </li>
            <li>
              <span>03</span> Safari bush, mountain chalets & coastal retreats
            </li>
          </ul>
          <button
            className="btn btn-gold"
            onClick={() => onNavigate("hotels")}
            type="button"
          >
            Explore Lodges & Stays <Icon name="arrow" size={18} />
          </button>
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="testimonial section">
        <div className="container">
          <Icon name="quote" size={44} />
          <blockquote>
            “It wasn’t just a safari. It was the kind of weekend that recharges your soul—panoramic
            views, seamless transport, delicious food, and guides who treated us like family.”
          </blockquote>
          <div className="testimonial-person">
            <span
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80)`,
              }}
            />
            <div>
              <strong>Wanjiku Mwangi</strong>
              <small>Maasai Mara 3-Day Safari Experience</small>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Explore CTA Strip */}
      <section className="ready-cta-section">
        <div className="container">
          <div className="ready-cta-card">
            <div className="ready-cta-content">
              <span className="eyebrow">Let’s Hit the Road</span>
              <h2>Ready to experience Kenya like never before?</h2>
              <p>
                Reach out to our safari coordinators today. We will curate a personalised proposal
                tailored around your schedule, group size, and budget.
              </p>
            </div>
            <div className="ready-cta-actions">
              <button
                className="btn btn-gold"
                onClick={() => onNavigate("booking")}
                type="button"
              >
                Plan Your Journey <Icon name="arrow" size={18} />
              </button>
              <a
                href="https://wa.me/254722415892?text=Hello%20Chalcedony%20Adventures%2C%20I%20would%20like%20to%20plan%20a%20trip."
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <Icon name="whatsapp" size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
