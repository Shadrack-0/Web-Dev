import { FormEvent, useState } from "react";
import { GalleryMedia, MediaCategory } from "../../types";
import { StorageService } from "../../services/storage";
import { MongoApi } from "../../services/api";
import { Icon } from "../ui/Icon";

export function GalleryManager({
  gallery,
  onRefresh,
}: {
  gallery: GalleryMedia[];
  onRefresh: () => void;
}) {
  const [editingMedia, setEditingMedia] = useState<Partial<GalleryMedia> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  const categories: MediaCategory[] = [
    "Safaris & Wildlife",
    "Waterfalls & Rivers",
    "Mountain Hiking",
    "Road Trips & Fleet",
    "Camp & Group Life",
    "Stays & Resorts",
  ];

  const handleUploadNew = () => {
    setUploadSuccessMsg(null);
    setEditingMedia({
      id: "gal-" + Date.now(),
      title: "",
      category: "Safaris & Wildlife",
      location: "Kenya",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1547471080-d5e8a6d4fb4c?auto=format&fit=crop&w=1200&q=80",
      caption: "",
      date: new Date().toLocaleString("en-GB", { month: "long", year: "numeric" }),
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      StorageService.deleteMedia(id);
      onRefresh();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadSuccessMsg(null);

    const result = await MongoApi.uploadImage(file, "gallery", editingMedia?.title || "");

    setUploadingImage(false);

    if (result.success && result.url) {
      setEditingMedia((prev) => ({
        ...prev,
        url: result.url,
      }));
      setUploadSuccessMsg("Image uploaded & stored in MongoDB successfully!");
      setTimeout(() => setUploadSuccessMsg(null), 4000);
    }
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editingMedia || !editingMedia.title || !editingMedia.url) return;

    StorageService.saveMedia(editingMedia as GalleryMedia);
    setEditingMedia(null);
    onRefresh();
  };

  return (
    <div className="admin-subview">
      <div className="admin-subview-header">
        <div>
          <h3>Gallery & Travel Moments ({gallery.length})</h3>
          <p>Upload new photos and video reels from recent tours, hikes, and safaris to MongoDB.</p>
        </div>
        <button className="btn btn-gold" onClick={handleUploadNew} type="button">
          <Icon name="camera" size={17} /> Upload New Moment
        </button>
      </div>

      <div className="admin-gallery-grid">
        {gallery.map((item) => (
          <div className="admin-gallery-card" key={item.id}>
            <div className="admin-gal-img">
              <img src={item.url} alt={item.title} />
              <span className="badge-cat">{item.category}</span>
              <button
                className="btn-gal-del"
                onClick={() => handleDelete(item.id)}
                title="Delete Media"
                type="button"
              >
                <Icon name="trash" size={15} />
              </button>
            </div>
            <div className="admin-gal-info">
              <h5>{item.title}</h5>
              <div className="gal-meta">
                <span>
                  <Icon name="map" size={12} /> {item.location}
                </span>
                {item.date && <span>{item.date}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {editingMedia && (
        <div className="modal-overlay" onClick={() => setEditingMedia(null)}>
          <div
            className="modal-card admin-form-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setEditingMedia(null)}
              type="button"
            >
              <Icon name="close" size={20} />
            </button>

            <h3>Upload Travel Moment to MongoDB</h3>

            <form onSubmit={handleSave} className="admin-modal-form">
              <div className="form-row">
                <label>
                  Moment Title *
                  <input
                    type="text"
                    required
                    value={editingMedia.title || ""}
                    onChange={(e) =>
                      setEditingMedia({ ...editingMedia, title: e.target.value })
                    }
                    placeholder="e.g. Cheetah mother scanning the savannah"
                  />
                </label>
                <label>
                  Category *
                  <select
                    value={editingMedia.category || "Safaris & Wildlife"}
                    onChange={(e) =>
                      setEditingMedia({
                        ...editingMedia,
                        category: e.target.value as MediaCategory,
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
                  Location *
                  <input
                    type="text"
                    required
                    value={editingMedia.location || ""}
                    onChange={(e) =>
                      setEditingMedia({
                        ...editingMedia,
                        location: e.target.value,
                      })
                    }
                    placeholder="e.g. Amboseli National Park"
                  />
                </label>
                <label>
                  Month & Year
                  <input
                    type="text"
                    value={editingMedia.date || ""}
                    onChange={(e) =>
                      setEditingMedia({ ...editingMedia, date: e.target.value })
                    }
                    placeholder="e.g. November 2026"
                  />
                </label>
              </div>

              {/* Upload to MongoDB Option */}
              <div
                style={{
                  background: "var(--ivory)",
                  border: "2px dashed rgba(13, 51, 40, 0.2)",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <label style={{ cursor: "pointer", display: "inline-block" }}>
                  <span style={{ display: "block", marginBottom: "6px", fontWeight: 700, color: "var(--forest)" }}>
                    <Icon name="camera" size={20} /> Choose Image File to Store in MongoDB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <span className="btn btn-outline-sm" style={{ display: "inline-block" }}>
                    {uploadingImage ? "Uploading to MongoDB..." : "Browse Photo from Device"}
                  </span>
                </label>
                {uploadSuccessMsg && (
                  <div style={{ color: "#15803d", fontSize: "12px", marginTop: "8px", fontWeight: 600 }}>
                    <Icon name="check" size={14} /> {uploadSuccessMsg}
                  </div>
                )}
              </div>

              <label>
                Or Paste Image URL directly:
                <input
                  type="url"
                  required
                  value={editingMedia.url || ""}
                  onChange={(e) =>
                    setEditingMedia({ ...editingMedia, url: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/... or http://localhost:5000/api/images/..."
                />
              </label>

              {editingMedia.url && (
                <div className="img-preview-box">
                  <small>Preview:</small>
                  <img src={editingMedia.url} alt="Preview" />
                </div>
              )}

              <label>
                Caption / Story
                <textarea
                  rows={2}
                  value={editingMedia.caption || ""}
                  onChange={(e) =>
                    setEditingMedia({
                      ...editingMedia,
                      caption: e.target.value,
                    })
                  }
                  placeholder="Short note about what was happening during this moment..."
                />
              </label>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingMedia(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  <Icon name="check" size={17} /> Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
