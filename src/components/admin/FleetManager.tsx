import { FormEvent, useState } from "react";
import { Vehicle, VehicleCategory } from "../../types";
import { StorageService } from "../../services/storage";
import { Icon } from "../ui/Icon";

export function FleetManager({
  vehicles,
  onRefresh,
}: {
  vehicles: Vehicle[];
  onRefresh: () => void;
}) {
  const [editingVeh, setEditingVeh] = useState<Partial<Vehicle> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featuresStr, setFeaturesStr] = useState("");

  const categories: VehicleCategory[] = [
    "Safari 4x4",
    "Tour Van",
    "Mini Bus",
    "Luxury Coach",
    "Executive 4x4 / VIP",
  ];

  const handleCreateNew = () => {
    setIsNew(true);
    setFeaturesStr("Pop-up roof, AC, USB charging, 4WD");
    setEditingVeh({
      id: "veh-" + Date.now(),
      name: "",
      category: "Safari 4x4",
      capacity: "7 Passengers",
      luggageCapacity: "7 Bags",
      transmission: "Manual",
      dailyRateKES: 18000,
      driverIncluded: true,
      fuelOption: "Chauffeur + Fuel Packages",
      image: "https://images.unsplash.com/photo-1535940587896-3a4e0ce292f4?auto=format&fit=crop&w=1200&q=80",
      features: ["Pop-up roof", "AC", "USB charging", "4WD"],
      available: true,
      description: "",
    });
  };

  const handleEdit = (v: Vehicle) => {
    setIsNew(false);
    setFeaturesStr(v.features.join(", "));
    setEditingVeh({ ...v });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this vehicle from the fleet?")) {
      StorageService.deleteVehicle(id);
      onRefresh();
    }
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editingVeh || !editingVeh.name) return;

    const feats = featuresStr
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    StorageService.saveVehicle({
      ...(editingVeh as Vehicle),
      features: feats,
    });
    setEditingVeh(null);
    onRefresh();
  };

  return (
    <div className="admin-subview">
      <div className="admin-subview-header">
        <div>
          <h3>Fleet & Vehicle Hire Management ({vehicles.length})</h3>
          <p>Add safari cruisers, tour vans, executive VIP cars, and coaches.</p>
        </div>
        <button className="btn btn-gold" onClick={handleCreateNew} type="button">
          <Icon name="plus" size={17} /> Add Vehicle
        </button>
      </div>

      <div className="admin-grid-cards">
        {vehicles.map((v) => (
          <div className="admin-item-card" key={v.id}>
            <div className="item-card-media">
              <img src={v.image} alt={v.name} />
              <span className="badge-cat">{v.category}</span>
              <span
                className={`badge-status ${v.available ? "avail" : "booked"}`}
              >
                {v.available ? "Available" : "Reserved"}
              </span>
            </div>
            <div className="item-card-body">
              <h4>{v.name}</h4>
              <div className="card-specs">
                <span>
                  <Icon name="seat" size={14} /> {v.capacity}
                </span>
                <span>
                  <Icon name="luggage" size={14} /> {v.luggageCapacity}
                </span>
                <span>
                  <Icon name="car" size={14} /> {v.transmission}
                </span>
              </div>
              <div className="card-price-row">
                <strong>KES {v.dailyRateKES.toLocaleString()} / day</strong>
                <div className="card-actions-mini">
                  <button
                    className="btn-tbl-edit"
                    onClick={() => handleEdit(v)}
                    title="Edit Vehicle"
                    type="button"
                  >
                    <Icon name="edit" size={15} />
                  </button>
                  <button
                    className="btn-tbl-del"
                    onClick={() => handleDelete(v.id)}
                    title="Delete Vehicle"
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

      {/* Vehicle Modal */}
      {editingVeh && (
        <div className="modal-overlay" onClick={() => setEditingVeh(null)}>
          <div
            className="modal-card admin-form-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setEditingVeh(null)}
              type="button"
            >
              <Icon name="close" size={20} />
            </button>

            <h3>{isNew ? "Add New Vehicle to Fleet" : "Edit Vehicle Details"}</h3>

            <form onSubmit={handleSave} className="admin-modal-form">
              <div className="form-row">
                <label>
                  Vehicle Model Name *
                  <input
                    type="text"
                    required
                    value={editingVeh.name || ""}
                    onChange={(e) =>
                      setEditingVeh({ ...editingVeh, name: e.target.value })
                    }
                    placeholder="e.g. Toyota Land Cruiser Custom Safari"
                  />
                </label>
                <label>
                  Vehicle Category *
                  <select
                    value={editingVeh.category || "Safari 4x4"}
                    onChange={(e) =>
                      setEditingVeh({
                        ...editingVeh,
                        category: e.target.value as VehicleCategory,
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
                  Passenger Seating Capacity *
                  <input
                    type="text"
                    required
                    value={editingVeh.capacity || ""}
                    onChange={(e) =>
                      setEditingVeh({ ...editingVeh, capacity: e.target.value })
                    }
                    placeholder="e.g. 7 Passengers or 33 Passengers"
                  />
                </label>
                <label>
                  Luggage Capacity
                  <input
                    type="text"
                    value={editingVeh.luggageCapacity || ""}
                    onChange={(e) =>
                      setEditingVeh({
                        ...editingVeh,
                        luggageCapacity: e.target.value,
                      })
                    }
                    placeholder="e.g. 8 Large Bags"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Daily Rate (KES) *
                  <input
                    type="number"
                    required
                    min="1000"
                    value={editingVeh.dailyRateKES || 0}
                    onChange={(e) =>
                      setEditingVeh({
                        ...editingVeh,
                        dailyRateKES: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  Transmission
                  <select
                    value={editingVeh.transmission || "Manual"}
                    onChange={(e) =>
                      setEditingVeh({
                        ...editingVeh,
                        transmission: e.target.value as any,
                      })
                    }
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Both Available">Both Available</option>
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Fuel / Chauffeur Basis
                  <select
                    value={editingVeh.fuelOption || "Chauffeur + Fuel Packages"}
                    onChange={(e) =>
                      setEditingVeh({
                        ...editingVeh,
                        fuelOption: e.target.value as any,
                      })
                    }
                  >
                    <option value="Chauffeur + Fuel Packages">Chauffeur + Fuel Packages</option>
                    <option value="Chauffeured Only">Chauffeured Only (Dry Rate)</option>
                    <option value="Dry Hire Available">Dry Hire Available</option>
                  </select>
                </label>
                <label className="checkbox-label mt-label">
                  <input
                    type="checkbox"
                    checked={editingVeh.available ?? true}
                    onChange={(e) =>
                      setEditingVeh({
                        ...editingVeh,
                        available: e.target.checked,
                      })
                    }
                  />
                  <span>Mark as Available for Hire</span>
                </label>
              </div>

              <label>
                Photo Image URL *
                <input
                  type="url"
                  required
                  value={editingVeh.image || ""}
                  onChange={(e) =>
                    setEditingVeh({ ...editingVeh, image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                />
              </label>

              <label>
                Key Features (comma separated)
                <input
                  type="text"
                  value={featuresStr}
                  onChange={(e) => setFeaturesStr(e.target.value)}
                  placeholder="e.g. Pop-up roof, AC, USB ports, 4WD suspension, Cooler box"
                />
              </label>

              <label>
                Description / Best Used For
                <textarea
                  rows={2}
                  value={editingVeh.description || ""}
                  onChange={(e) =>
                    setEditingVeh({
                      ...editingVeh,
                      description: e.target.value,
                    })
                  }
                  placeholder="Tell clients about ideal use cases, terrain suitability..."
                />
              </label>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingVeh(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  <Icon name="check" size={17} /> Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
