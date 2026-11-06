import { FormEvent, useState } from "react";
import { Category, Trip } from "../../types";
import { StorageService } from "../../services/storage";
import { Icon } from "../ui/Icon";

export function TripsManager({
  trips,
  onRefresh,
}: {
  trips: Trip[];
  onRefresh: () => void;
}) {
  const [editingTrip, setEditingTrip] = useState<Partial<Trip> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const categories: Category[] = [
    "Safari",
    "Waterfalls",
    "Hiking",
    "Day trip",
    "Family package",
    "Road trip",
    "Custom package",
  ];

  const handleCreateNew = () => {
    setIsNew(true);
    setEditingTrip({
      id: "trip-" + Date.now(),
      title: "",
      subtitle: "",
      category: "Safari",
      duration: "3 days · 2 nights",
      date: "Upcoming 2026",
      priceKES: 25000,
      priceUSD: 200,
      featuredImage: "https://images.unsplash.com/photo-1547471080-d5e8a6d4fb4c?auto=format&fit=crop&w=1200&q=80",
      tag: "New",
      location: "Kenya",
      spotsLeft: 12,
      featured: true,
      overview: "",
      highlights: ["Game drives in 4x4 cruiser", "Full board meals", "Certified safari guide"],
      itinerary: [
        { day: "Day 1", title: "Nairobi to Destination", desc: "Scenic departure, check-in, afternoon game drive or hike." },
        { day: "Day 2", title: "Full Day Exploration", desc: "Wildlife viewing, nature walks, campfire storytelling." },
        { day: "Day 3", title: "Dawn Game Drive & Return", desc: "Breakfast and relaxed cruise back to Nairobi." }
      ],
      included: ["Return transport", "Accommodation", "Meals on full board", "Park fees", "Drinking water"],
      excluded: ["Personal drinks & snacks", "Tips and gratuities"]
    });
  };

  const handleEdit = (trip: Trip) => {
    setIsNew(false);
    setEditingTrip({ ...trip });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this trip package?")) {
      StorageService.deleteTrip(id);
      onRefresh();
    }
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editingTrip || !editingTrip.title) return;

    StorageService.saveTrip(editingTrip as Trip);
    setEditingTrip(null);
    onRefresh();
  };

  return (
    <div className="admin-subview">
      <div className="admin-subview-header">
        <div>
          <h3>Trips & Safari Packages ({trips.length})</h3>
          <p>Create new departures, edit itineraries, pricing, dates, and spots remaining.</p>
        </div>
        <button className="btn btn-gold" onClick={handleCreateNew} type="button">
          <Icon name="plus" size={17} /> Add New Trip
        </button>
      </div>

      <div className="admin-grid-cards">
        {trips.map((trip) => (
          <div className="admin-item-card" key={trip.id}>
            <div className="item-card-media">
              <img src={trip.featuredImage} alt={trip.title} />
              <span className="badge-cat">{trip.category}</span>
              {trip.featured && <span className="badge-feat">Featured</span>}
            </div>
            <div className="item-card-body">
              <h4>{trip.title}</h4>
              <div className="card-specs">
                <span>
                  <Icon name="clock" size={14} /> {trip.duration}
                </span>
                <span>
                  <Icon name="calendar" size={14} /> {trip.date}
                </span>
                <span>
                  <Icon name="users" size={14} /> {trip.spotsLeft} spots
                </span>
              </div>
              <div className="card-price-row">
                <strong>KES {trip.priceKES.toLocaleString()}</strong>
                <div className="card-actions-mini">
                  <button
                    className="btn-tbl-edit"
                    onClick={() => handleEdit(trip)}
                    title="Edit Trip"
                    type="button"
                  >
                    <Icon name="edit" size={15} />
                  </button>
                  <button
                    className="btn-tbl-del"
                    onClick={() => handleDelete(trip.id)}
                    title="Delete Trip"
                    type="button"
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trip Edit / Create Modal */}
      {editingTrip && (
        <div className="modal-overlay" onClick={() => setEditingTrip(null)}>
          <div
            className="modal-card admin-form-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setEditingTrip(null)}
              type="button"
            >
              <Icon name="close" size={20} />
            </button>

            <h3>{isNew ? "Create New Trip Package" : "Edit Trip Package"}</h3>

            <form onSubmit={handleSave} className="admin-modal-form">
              <div className="form-row">
                <label>
                  Trip Title *
                  <input
                    type="text"
                    required
                    value={editingTrip.title || ""}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, title: e.target.value })
                    }
                    placeholder="e.g. Samburu Elephant & Grevy's Zebra Safari"
                  />
                </label>
                <label>
                  Category *
                  <select
                    value={editingTrip.category || "Safari"}
                    onChange={(e) =>
                      setEditingTrip({
                        ...editingTrip,
                        category: e.target.value as Category,
                      })
                    }
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Subtitle / Tagline
                  <input
                    type="text"
                    value={editingTrip.subtitle || ""}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, subtitle: e.target.value })
                    }
                    placeholder="e.g. Crisp mountain air and cascading waterfalls"
                  />
                </label>
                <label>
                  Location / Destination *
                  <input
                    type="text"
                    required
                    value={editingTrip.location || ""}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, location: e.target.value })
                    }
                    placeholder="e.g. Samburu National Reserve"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Duration *
                  <input
                    type="text"
                    required
                    value={editingTrip.duration || ""}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, duration: e.target.value })
                    }
                    placeholder="e.g. 3 days · 2 nights"
                  />
                </label>
                <label>
                  Departure Date *
                  <input
                    type="text"
                    required
                    value={editingTrip.date || ""}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, date: e.target.value })
                    }
                    placeholder="e.g. 15–17 Jan 2027"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Price (KES per person) *
                  <input
                    type="number"
                    required
                    min="500"
                    value={editingTrip.priceKES || 0}
                    onChange={(e) =>
                      setEditingTrip({
                        ...editingTrip,
                        priceKES: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  Available Spots Left *
                  <input
                    type="number"
                    required
                    min="1"
                    value={editingTrip.spotsLeft || 10}
                    onChange={(e) =>
                      setEditingTrip({
                        ...editingTrip,
                        spotsLeft: Number(e.target.value),
                      })
                    }
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Promotional Tag
                  <input
                    type="text"
                    value={editingTrip.tag || ""}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, tag: e.target.value })
                    }
                    placeholder="e.g. Most loved, Selling Fast, New"
                  />
                </label>
                <label className="checkbox-label mt-label">
                  <input
                    type="checkbox"
                    checked={editingTrip.featured || false}
                    onChange={(e) =>
                      setEditingTrip({
                        ...editingTrip,
                        featured: e.target.checked,
                      })
                    }
                  />
                  <span>Show as Featured on Homepage</span>
                </label>
              </div>

              <label>
                Featured Image URL *
                <input
                  type="url"
                  required
                  value={editingTrip.featuredImage || ""}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      featuredImage: e.target.value,
                    })
                  }
                  placeholder="https://images.unsplash.com/..."
                />
              </label>

              <label>
                Trip Overview *
                <textarea
                  rows={3}
                  required
                  value={editingTrip.overview || ""}
                  onChange={(e) =>
                    setEditingTrip({ ...editingTrip, overview: e.target.value })
                  }
                  placeholder="Describe the adventure, wildlife sights, and vibe..."
                />
              </label>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingTrip(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  <Icon name="check" size={17} /> Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
