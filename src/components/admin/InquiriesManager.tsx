import { useState } from "react";
import { BookingInquiry, InquiryStatus } from "../../types";
import { StorageService } from "../../services/storage";
import { Icon } from "../ui/Icon";

export function InquiriesManager({
  inquiries,
  onRefresh,
}: {
  inquiries: BookingInquiry[];
  onRefresh: () => void;
}) {
  const [filter, setFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<BookingInquiry | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState("");

  const filtered = inquiries.filter((inq) => {
    if (filter === "All") return true;
    return inq.status === filter;
  });

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    StorageService.updateInquiryStatus(id, newStatus);
    onRefresh();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleSaveNotes = (id: string) => {
    StorageService.updateInquiryStatus(id, selectedInquiry?.status || "Pending", adminNotesInput);
    onRefresh();
    if (selectedInquiry) {
      setSelectedInquiry({ ...selectedInquiry, adminNotes: adminNotesInput });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      StorageService.deleteInquiry(id);
      setSelectedInquiry(null);
      onRefresh();
    }
  };

  const openInquiryModal = (inq: BookingInquiry) => {
    setSelectedInquiry(inq);
    setAdminNotesInput(inq.adminNotes || "");
  };

  const getWhatsAppReplyLink = (inq: BookingInquiry) => {
    const text = `Hello ${inq.fullName}, this is Chalcedony Adventures regarding your inquiry (Ref: ${inq.referenceCode}) for ${inq.targetItemTitle || inq.serviceType}. We would love to share full details and assist you!`;
    const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="admin-subview">
      <div className="admin-subview-header">
        <div>
          <h3>Client Bookings & Enquiries ({inquiries.length})</h3>
          <p>Review incoming leads, update progress, and follow up directly via WhatsApp or Email.</p>
        </div>

        <div className="status-filter-pills">
          {["All", "Pending", "Contacted", "Confirmed", "Archived"].map((st) => (
            <button
              key={st}
              className={`pill-btn ${filter === st ? "active" : ""}`}
              onClick={() => setFilter(st)}
              type="button"
            >
              {st} {st === "Pending" && (
                <span className="count-dot">
                  {inquiries.filter((i) => i.status === "Pending").length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty-card">
          <Icon name="file-text" size={36} />
          <p>No enquiries found under "{filter}".</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ref Code</th>
                <th>Client Name</th>
                <th>Service / Requested Item</th>
                <th>Travel Date</th>
                <th>Travelers</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => (
                <tr key={inq.id} className={inq.status === "Pending" ? "row-pending" : ""}>
                  <td>
                    <span className="code-badge">{inq.referenceCode}</span>
                    <br />
                    <small className="text-muted">{inq.createdAt}</small>
                  </td>
                  <td>
                    <strong>{inq.fullName}</strong>
                    <br />
                    <span className="text-muted">{inq.phone}</span>
                  </td>
                  <td>
                    <span className="service-tag">{inq.serviceType}</span>
                    {inq.targetItemTitle && (
                      <div className="item-title-sub">{inq.targetItemTitle}</div>
                    )}
                  </td>
                  <td>{inq.preferredDate || "Flexible"}</td>
                  <td>{inq.numberOfTravelers} Guests</td>
                  <td>
                    <span className={`status-badge status-${inq.status.toLowerCase()}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-tbl-view"
                        onClick={() => openInquiryModal(inq)}
                        title="View Details"
                        type="button"
                      >
                        <Icon name="eye" size={15} />
                      </button>
                      <a
                        href={getWhatsAppReplyLink(inq)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-tbl-wa"
                        title="Reply on WhatsApp"
                      >
                        <Icon name="whatsapp" size={15} />
                      </a>
                      <button
                        className="btn-tbl-del"
                        onClick={() => handleDelete(inq.id)}
                        title="Delete"
                        type="button"
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="modal-card inq-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedInquiry(null)}
              type="button"
            >
              <Icon name="close" size={20} />
            </button>

            <div className="modal-inq-header">
              <span className="code-badge">{selectedInquiry.referenceCode}</span>
              <h3>Enquiry Details: {selectedInquiry.fullName}</h3>
              <small>Submitted on {selectedInquiry.createdAt}</small>
            </div>

            <div className="inq-details-grid">
              <div className="inq-field">
                <label>Contact Phone / WhatsApp:</label>
                <div>
                  <strong>{selectedInquiry.phone}</strong>
                  <a
                    href={getWhatsAppReplyLink(selectedInquiry)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-wa-btn"
                  >
                    <Icon name="whatsapp" size={14} /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="inq-field">
                <label>Email Address:</label>
                <div>
                  <a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a>
                </div>
              </div>

              <div className="inq-field">
                <label>Service Category:</label>
                <div>{selectedInquiry.serviceType}</div>
              </div>

              <div className="inq-field">
                <label>Requested Item / Package:</label>
                <div>{selectedInquiry.targetItemTitle || "None specific (Custom)"}</div>
              </div>

              <div className="inq-field">
                <label>Preferred Travel Date:</label>
                <div>{selectedInquiry.preferredDate || "Not specified"}</div>
              </div>

              <div className="inq-field">
                <label>Number of Guests:</label>
                <div>{selectedInquiry.numberOfTravelers} People</div>
              </div>

              {selectedInquiry.budgetRange && (
                <div className="inq-field">
                  <label>Budget Tier:</label>
                  <div>{selectedInquiry.budgetRange}</div>
                </div>
              )}
            </div>

            <div className="inq-notes-section">
              <label>Client's Notes / Requirements:</label>
              <div className="client-notes-box">
                {selectedInquiry.destinationOrNotes || "No additional notes provided."}
              </div>
            </div>

            <div className="inq-status-section">
              <label>Update Status:</label>
              <div className="status-change-btns">
                {(["Pending", "Contacted", "Confirmed", "Archived"] as InquiryStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`status-btn ${selectedInquiry.status === st ? "active" : ""}`}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-internal-notes">
              <label>Staff Internal Notes:</label>
              <textarea
                rows={3}
                placeholder="Add private booking notes, quote sent, deposit amount, room allocations..."
                value={adminNotesInput}
                onChange={(e) => setAdminNotesInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary-sm mt-2"
                onClick={() => handleSaveNotes(selectedInquiry.id)}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
