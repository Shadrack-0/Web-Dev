import { useState, useMemo } from "react";
import { GalleryMedia, MediaCategory, NavigationPage } from "../../types";
import { StorageService } from "../../services/storage";
import { Icon } from "../ui/Icon";

export function GalleryPage({
  onNavigate,
}: {
  onNavigate: (page: NavigationPage) => void;
}) {
  const [gallery] = useState<GalleryMedia[]>(() => StorageService.getGallery());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeMedia, setActiveMedia] = useState<GalleryMedia | null>(null);

  const categories: string[] = [
    "All",
    "Safaris & Wildlife",
    "Waterfalls & Rivers",
    "Mountain Hiking",
    "Road Trips & Fleet",
    "Camp & Group Life",
    "Stays & Resorts",
  ];

  const filteredMedia = useMemo(() => {
    if (selectedCategory === "All") return gallery;
    return gallery.filter((m) => m.category === selectedCategory);
  }, [gallery, selectedCategory]);

  return (
    <div className="page-gallery">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-kicker">
            <button onClick={() => onNavigate("home")} type="button">
              Home
            </button>
            <span>/</span>
            <strong>Gallery</strong>
          </div>
          <h1>
            Raw Nature &
            <br />
            Unscripted <em>Moments.</em>
          </h1>
          <p className="page-hero-sub">
            A visual chronicle of our adventures across Kenya—from dramatic big cat hunts on the
            Mara plains to high altitude laughter on Mount Kenya moorlands.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="trips-filter-strip">
        <div className="container filter-container">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "All" ? "All Moments" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section gallery-catalog-section">
        <div className="container">
          <div className="gallery-masonry-grid">
            {filteredMedia.map((item) => (
              <figure
                key={item.id}
                className="gallery-item-card"
                onClick={() => setActiveMedia(item)}
              >
                <img src={item.url} alt={item.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <div className="gallery-item-top">
                    <span className="gallery-pill">{item.category}</span>
                    {item.mediaType === "video" && (
                      <span className="gallery-pill video-pill">
                        <Icon name="video" size={13} /> Video
                      </span>
                    )}
                  </div>
                  <div className="gallery-item-bottom">
                    <h4>{item.title}</h4>
                    <div className="gallery-item-meta">
                      <span>
                        <Icon name="map" size={13} /> {item.location}
                      </span>
                      {item.date && (
                        <span>
                          <Icon name="calendar" size={13} /> {item.date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Community Banner */}
      <section className="ready-cta-section">
        <div className="container">
          <div className="ready-cta-card">
            <div className="ready-cta-content">
              <span className="eyebrow">Connect With Us</span>
              <h2>Tag @chalcedonyadventures on your travels</h2>
              <p>
                Follow our official feed for live stories, trail alerts, group departure reels, and
                seasonal discount announcements.
              </p>
            </div>
            <div className="ready-cta-actions">
              <a
                href="https://www.instagram.com/chalcedonyadventures"
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
              >
                <Icon name="instagram" size={18} /> Follow on Instagram
              </a>
              <button
                className="btn btn-ghost"
                onClick={() => onNavigate("trips")}
                type="button"
              >
                Join Our Next Trip
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="lightbox-overlay" onClick={() => setActiveMedia(null)}>
          <div
            className="lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close-btn"
              onClick={() => setActiveMedia(null)}
              type="button"
              aria-label="Close lightbox"
            >
              <Icon name="close" size={24} />
            </button>

            <div className="lightbox-img-wrap">
              <img src={activeMedia.url} alt={activeMedia.title} />
            </div>

            <div className="lightbox-details">
              <div className="lightbox-tags">
                <span className="tag-pill">{activeMedia.category}</span>
                <span className="location-pill">
                  <Icon name="map" size={14} /> {activeMedia.location}
                </span>
                {activeMedia.date && <span className="date-pill">{activeMedia.date}</span>}
              </div>

              <h3>{activeMedia.title}</h3>
              {activeMedia.caption && <p>{activeMedia.caption}</p>}

              <div className="lightbox-actions">
                <button
                  className="btn btn-primary-sm"
                  onClick={() => {
                    setActiveMedia(null);
                    onNavigate("booking");
                  }}
                  type="button"
                >
                  Plan an Adventure Here <Icon name="arrow" size={15} />
                </button>
                <a
                  href={`https://wa.me/254722415892?text=Hello%20Chalcedony%2C%20I%20saw%20this%20photo%20of%20${encodeURIComponent(
                    activeMedia.title
                  )}%20and%20would%20love%20to%20visit!`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-sm"
                >
                  <Icon name="whatsapp" size={15} /> Inquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
