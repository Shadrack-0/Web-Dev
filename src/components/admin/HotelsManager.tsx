import { FormEvent, useState } from "react";
import { HotelStay, StayCategory } from "../../types";
import { StorageService } from "../../services/storage";
import { Icon } from "../ui/Icon";

export function HotelsManager({
  hotels,
  onRefresh,
}: {
  hotels: HotelStay[];
  onRefresh: () => void;
}) {
  const [editingHotel, setEditingHotel] = useState<Partial<HotelStay> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [amenitiesStr, setAmenitiesStr] = useState("");

  const categories: StayCategory[] = [
    "Safari Lodge",
    "Luxury Tented Camp",
    "Beach Resort",
    "Lakeside Cottage",
    "Mountain Retreat",
    "Boutique City Hotel",
  ];

  const regions: HotelStay["region"][] = [
    "Maasai Mara",
    "Coast & Diani",
    "Amboseli & Tsavo",
    "Rift Valley & Lakes",
    "Mount Kenya & Aberdares",
    "Nairobi",
  ];

  const handleCreateNew = () => {
    setIsNew(true);
    setAmenitiesStr("Swimming Pool, Full Board Dining, Wi-Fi, Game Drives");
    setEditingHotel({
      id: "stay-" + Date.now(),
      name: "",
      location: "",
      region: "Maasai Mara",
      category: "Safari Lodge",
      pricePerNightKES: 28000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      amenities: ["Swimming Pool", "Full Board Dining", "Wi-Fi", "Game Drives"],
      featured: false,
      description: "",
    });
  };

  const handleEdit = (h: HotelStay) => {
    setIsNew(false);
    setAmenitiesStr(h.amenities.join(", "));
    setEditingHotel({ ...h });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this property?")) {
      StorageService.deleteHotel(id);
      onRefresh();
    }
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editingHotel || !editingHotel.name) return;

    const amens = amenitiesStr
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    StorageService.saveHotel({
      ...(editingHotel as HotelStay),
      amenities: amens,
    });
    setEditingHotel(null);
    onRefresh();
  };

  return (
    <div className="admin-subview">
      <div className="admin-subview-header">
        <div>
          <h3>Hotels, Lodges & Stays ({hotels.length})</h3>
          <p>Manage partner safari camps, beachfront resorts, and accommodation listings.</p>
        </div>
        <button className="btn btn-gold" onClick={handleCreateNew} type="button">
          <Icon name="plus" size={17} /> Add Accommodation
        </button>
      </div>

      <div className="admin-grid-cards">
        {hotels.map((h) => (
          <div className="admin-item-card" key={h.id}>
            <div className="item-card-media">
              <img src={h.image} alt={h.name} />
              <span className="badge-cat">{h.region}</span>
              <span className="badge-status avail">★ {h.rating.toFixed(1)}</span>
            </div>
            <div className="item-card-body">
              <h4>{h.name}</h4>
              <div className="card-specs">
                <span>
                  <Icon name="map" size={14} /> {h.location}
                </span>
                <span>
                  <Icon name="hotel" size={14} /> {h.category}
                </span>
              </div>
              <div className="card-price-row">
                <strong>KES {h.pricePerNightKES.toLocaleString()} / night</strong>
                <div className="card-actions-mini">
                  <button
                    className="btn-tbl-edit"
                    onClick={() => handleEdit(h)}
                    title="Edit Stay"
                    type="button"
                  >
                    <Icon name="edit" size={15} />
                  </button>
                  <button
                    className="btn-tbl-del"
                    onClick={() => handleDelete(h.id)}
                    title="Delete Stay"
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

      {/* Hotel Modal */}
      {editingHotel && (
        <div className="modal-overlay" onClick={() => setEditingHotel(null)}>
          <div
            className="modal-card admin-form-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setEditingHotel(null)}
              type="button"
            >
              <Icon name="close" size={20} />
            </button>

            <h3>{isNew ? "Add New Accommodation" : "Edit Accommodation"}</h3>

            <form onSubmit={handleSave} className="admin-modal-form">
              <div className="form-row">
                <label>
                  Property Name *
                  <input
                    type="text"
                    required
                    value={editingHotel.name || ""}
                    onChange={(e) =>
                      setEditingHotel({ ...editingHotel, name: e.target.value })
                    }
                    placeholder="e.g. Mara Intrepids Luxury Tented Camp"
                  />
                </label>
                <label>
                  Region *
                  <select
                    value={editingHotel.region || "Maasai Mara"}
                    onChange={(e) =>
                      setEditingHotel({
                        ...editingHotel,
                        region: e.target.value as any,
                      })
                    }
                  >
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Specific Location *
                  <input
                    type="text"
                    required
                    value={editingHotel.location || ""}
                    onChange={(e) =>
                      setEditingHotel({ ...editingHotel, location: e.target.value })
                    }
                    placeholder="e.g. Talek River, Maasai Mara"
                  />
                </label>
                <label>
                  Accommodation Category *
                  <select
                    value={editingHotel.category || "Safari Lodge"}
                    onChange={(e) =>
                      setEditingHotel({
                        ...editingHotel,
                        category: e.target.value as StayCategory,
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
                  Estimated Price / Night (KES) *
                  <input
                    type="number"
                    required
                    min="1000"
                    value={editingHotel.pricePerNightKES || 0}
                    onChange={(e) =>
                      setEditingHotel({
                        ...editingHotel,
                        pricePerNightKES: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  Guest Rating (1.0 to 5.0)
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editingHotel.rating || 4.8}
                    onChange={(e) =>
                      setEditingHotel({
                        ...editingHotel,
                        rating: Number(e.target.value),
                      })
                    }
                  />
                </label>
              </div>

              <label>
                Photo Image URL *
                <input
                  type="url"
                  required
                  value={editingHotel.image || ""}
                  onChange={(e) =>
                    setEditingHotel({ ...editingHotel, image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                />
              </label>

              <label>
                Amenities (comma separated)
                <input
                  type="text"
                  value={amenitiesStr}
                  onChange={(e) => setAmenitiesStr(e.target.value)}
                  placeholder="e.g. Infinity Pool, Full Board Dining, Spa, Free Wi-Fi, Game Drives"
                />
              </label>

              <label>
                Description
                <textarea
                  rows={2}
                  value={editingHotel.description || ""}
                  onChange={(e) =>
                    setEditingHotel({
                      ...editingHotel,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the atmosphere, location views, and unique highlights..."
                />
              </label>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingHotel(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  <Icon name="check" size={17} /> Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
