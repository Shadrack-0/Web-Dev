import { FormEvent, useState, useEffect } from "react";
import { NavigationPage, ServiceType, Trip, Vehicle, HotelStay } from "../../types";
import { StorageService } from "../../services/storage";
import { useFormspree, FORMSPREE_URL } from "../../hooks/useFormspree";
import { Icon } from "../ui/Icon";

export function BookingPage({
  onNavigate,
  initialService,
  initialItemTitle,
}: {
  onNavigate: (page: NavigationPage) => void;
  initialService?: string;
  initialItemTitle?: string;
}) {
  const { submitting, errors, submit } = useFormspree();
  const [serviceType, setServiceType] = useState<ServiceType>(
    (initialService as ServiceType) || "Upcoming group trip"
  );
  const [targetItemTitle, setTargetItemTitle] = useState(initialItemTitle || "");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [numberOfTravelers, setNumberOfTravelers] = useState(2);
  const [budgetRange, setBudgetRange] = useState("Standard (Comfort)");
  const [destinationOrNotes, setDestinationOrNotes] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [submittedInquiry, setSubmittedInquiry] = useState<{
    referenceCode: string;
    createdAt: string;
  } | null>(null);

  const trips: Trip[] = StorageService.getTrips();
  const vehicles: Vehicle[] = StorageService.getVehicles();
  const hotels: HotelStay[] = StorageService.getHotels();

  useEffect(() => {
    if (initialService) {
      setServiceType(initialService as ServiceType);
    }
    if (initialItemTitle) {
      setTargetItemTitle(initialItemTitle);
    }
  }, [initialService, initialItemTitle]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Create local tracking record for admin dashboard
    const created = StorageService.createInquiry({
      fullName,
      phone,
      email,
      serviceType,
      targetItemTitle: targetItemTitle || undefined,
      preferredDate: preferredDate || new Date().toISOString().split("T")[0],
      numberOfTravelers: Number(numberOfTravelers) || 1,
      destinationOrNotes: pickupLocation ? `[Pickup: ${pickupLocation}] ${destinationOrNotes}` : destinationOrNotes,
      budgetRange,
    });

    // 2. Submit directly to Formspree endpoint (https://formspree.io/f/xwllzdzd)
    await submit({
      bookingReference: created.referenceCode,
      serviceCategory: serviceType,
      requestedItem: targetItemTitle || "Custom Package",
      fullName,
      phone,
      email,
      preferredDate: preferredDate || "Flexible",
      numberOfTravelers,
      budgetTier: budgetRange,
      pickupLocation: pickupLocation || "Nairobi",
      notes: destinationOrNotes,
      submittedAt: new Date().toLocaleString("en-GB"),
    });

    setSubmittedInquiry({
      referenceCode: created.referenceCode,
      createdAt: created.createdAt,
    });
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Chalcedony Adventures!%0A%0AI would like to make an enquiry:%0A*Service:* ${encodeURIComponent(
      serviceType
    )}${
      targetItemTitle ? `%0A*Item:* ${encodeURIComponent(targetItemTitle)}` : ""
    }%0A*Name:* ${encodeURIComponent(fullName)}%0A*Phone:* ${encodeURIComponent(
      phone
    )}%0A*Travelers:* ${numberOfTravelers}%0A*Preferred Date:* ${preferredDate}%0A*Notes:* ${encodeURIComponent(
      destinationOrNotes
    )}`;
    window.open(`https://wa.me/254722415892?text=${text}`, "_blank");
  };

  return (
    <div className="page-booking">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-kicker">
            <button onClick={() => onNavigate("home")} type="button">
              Home
            </button>
            <span>/</span>
            <strong>Booking & Enquiry</strong>
          </div>
          <h1>
            Plan Your Next
            <br />
            Great <em>Adventure.</em>
          </h1>
          <p className="page-hero-sub">
            Fill out your details below to reserve an upcoming trip, hire a vehicle, or request a
            tailored group quotation. Our travel consultants reply within 2 hours.
          </p>
        </div>
      </section>

      {/* Main Booking Content */}
      <section className="section booking-engine-section">
        <div className="container">
          <div className="booking-layout-grid">
            {/* Left Column: Form or Success */}
            <div className="booking-form-col">
              {submittedInquiry ? (
                <div className="booking-success-box">
                  <div className="success-badge-icon">
                    <Icon name="check" size={38} />
                  </div>
                  <h2>Enquiry Received Successfully!</h2>
                  <p>
                    Thank you, <strong>{fullName}</strong>. Your travel request has been logged
                    into our reservation system.
                  </p>

                  <div className="booking-ref-card">
                    <span className="ref-label">YOUR BOOKING REFERENCE CODE</span>
                    <strong className="ref-code">{submittedInquiry.referenceCode}</strong>
                    <small>Logged at {submittedInquiry.createdAt}</small>
                  </div>

                  <div className="success-next-steps">
                    <h4>What happens next?</h4>
                    <ol>
                      <li>
                        Our safari coordinator will review your request and verify seat/vehicle
                        availability.
                      </li>
                      <li>
                        You will receive an official invoice and itinerary proposal via WhatsApp &
                        Email.
                      </li>
                      <li>
                        Confirm your slot with a deposit payment via M-PESA Till or Bank Transfer.
                      </li>
                    </ol>
                  </div>

                  <div className="success-actions-row">
                    <button
                      className="btn btn-gold"
                      onClick={handleWhatsAppDirect}
                      type="button"
                    >
                      <Icon name="whatsapp" size={18} /> Speed Up via WhatsApp
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        setSubmittedInquiry(null);
                        setFullName("");
                        setPhone("");
                        setEmail("");
                        setDestinationOrNotes("");
                        setTargetItemTitle("");
                      }}
                      type="button"
                    >
                      Submit Another Booking
                    </button>
                  </div>
                </div>
              ) : (
                <div className="booking-form-wrapper">
                  <div className="booking-form-header">
                    <div className="step-indicator">
                      <span className="step-badge">Quick Step</span>
                      <h3>Booking & Enquiry Form</h3>
                    </div>
                    <span className="response-time-pill">
                      <Icon name="clock" size={14} /> Avg. reply: 2 hours
                    </span>
                  </div>

                  <form
                    action={FORMSPREE_URL}
                    method="POST"
                    onSubmit={handleSubmit}
                    className="booking-form"
                  >
                    {errors && errors.length > 0 && (
                      <div className="admin-error-box" style={{ marginBottom: "20px" }}>
                        <Icon name="close" size={16} />
                        <span>{errors.join(", ")}</span>
                      </div>
                    )}

                    {/* Step 1: Service Type */}
                    <div className="form-group-block">
                      <label className="block-title">
                        1. Select Service Category <span className="req">*</span>
                      </label>
                      <input type="hidden" name="serviceCategory" value={serviceType} />
                      <div className="service-selector-grid">
                        {[
                          { id: "Upcoming group trip", label: "Upcoming Trip / Safari", icon: "compass" },
                          { id: "Car or bus hire", label: "Car & Bus Hire", icon: "car" },
                          { id: "Hotel & accommodation", label: "Lodge & Hotel Stay", icon: "hotel" },
                          { id: "Custom safari", label: "Custom Private Safari", icon: "spark" },
                          { id: "Family package", label: "Family Holiday", icon: "heart" },
                          { id: "Corporate or school trip", label: "Corporate / Group", icon: "users" },
                        ].map((srv) => (
                          <button
                            key={srv.id}
                            type="button"
                            className={`service-option-btn ${serviceType === srv.id ? "active" : ""}`}
                            onClick={() => {
                              setServiceType(srv.id as ServiceType);
                              setTargetItemTitle("");
                            }}
                          >
                            <Icon name={srv.icon as any} size={18} />
                            <span>{srv.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Specific Item Selector based on category */}
                    {serviceType === "Upcoming group trip" && (
                      <div className="form-group-block">
                        <label>
                          Select Specific Trip Package (Optional)
                          <select
                            value={targetItemTitle}
                            onChange={(e) => setTargetItemTitle(e.target.value)}
                          >
                            <option value="">-- Choose from upcoming departures --</option>
                            {trips.map((t) => (
                              <option key={t.id} value={t.title}>
                                {t.title} (KES {t.priceKES.toLocaleString()})
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    )}

                    {serviceType === "Car or bus hire" && (
                      <div className="form-group-block">
                        <label>
                          Select Vehicle from Fleet
                          <select
                            value={targetItemTitle}
                            onChange={(e) => setTargetItemTitle(e.target.value)}
                          >
                            <option value="">-- Choose a vehicle --</option>
                            {vehicles.map((v) => (
                              <option key={v.id} value={v.name}>
                                {v.name} ({v.capacity} - KES {v.dailyRateKES.toLocaleString()}/day)
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    )}

                    {serviceType === "Hotel & accommodation" && (
                      <div className="form-group-block">
                        <label>
                          Select Lodge or Hotel Property
                          <select
                            value={targetItemTitle}
                            onChange={(e) => setTargetItemTitle(e.target.value)}
                          >
                            <option value="">-- Choose a stay or region --</option>
                            {hotels.map((h) => (
                              <option key={h.id} value={h.name}>
                                {h.name} - {h.location} (from KES {h.pricePerNightKES.toLocaleString()})
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    )}

                    {/* Step 2: Traveler details */}
                    <div className="form-group-block">
                      <label className="block-title">
                        2. Contact Information <span className="req">*</span>
                      </label>
                      <div className="form-row">
                        <label>
                          Full Name
                          <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="e.g. Grace Wairimu"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </label>
                        <label>
                          Phone / WhatsApp Number
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="+254 712 345 678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </label>
                      </div>
                      <label>
                        Email Address
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="grace@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </label>
                    </div>

                    {/* Step 3: Trip Details */}
                    <div className="form-group-block">
                      <label className="block-title">
                        3. Travel Parameters <span className="req">*</span>
                      </label>
                      <div className="form-row">
                        <label>
                          Preferred Travel Date
                          <input
                            type="date"
                            name="preferredDate"
                            required
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                          />
                        </label>
                        <label>
                          Number of Travelers
                          <input
                            type="number"
                            name="numberOfTravelers"
                            min="1"
                            max="200"
                            required
                            value={numberOfTravelers}
                            onChange={(e) => setNumberOfTravelers(Number(e.target.value))}
                          />
                        </label>
                      </div>

                      <div className="form-row">
                        <label>
                          Budget Preference
                          <select
                            name="budgetTier"
                            value={budgetRange}
                            onChange={(e) => setBudgetRange(e.target.value)}
                          >
                            <option value="Budget / Camping">Budget-Friendly / Camping</option>
                            <option value="Standard (Comfort)">Standard Comfort (3-Star Lodges / Vans)</option>
                            <option value="Premium Luxury">Premium Luxury (4/5-Star Camps & Cruisers)</option>
                            <option value="Flexible / Best Value">Flexible / Recommend Best Value</option>
                          </select>
                        </label>
                        <label>
                          Pickup Location
                          <input
                            type="text"
                            name="pickupLocation"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            placeholder="e.g. Nairobi CBD, JKIA Airport, Karen..."
                          />
                        </label>
                      </div>

                      <label>
                        Special Requests, Itinerary Wishes or Notes
                        <textarea
                          name="notes"
                          rows={3}
                          placeholder="Tell us about dietary preferences, tent rooming, children ages, or specific places you want to visit..."
                          value={destinationOrNotes}
                          onChange={(e) => setDestinationOrNotes(e.target.value)}
                        />
                      </label>
                    </div>

                    <div className="booking-submit-strip">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-gold w-full btn-lg"
                      >
                        {submitting ? (
                          <span>Sending to Safari Desk...</span>
                        ) : (
                          <>
                            <span>Submit Booking Enquiry</span>
                            <Icon name="arrow" size={18} />
                          </>
                        )}
                      </button>

                      <div className="privacy-badge">
                        <Icon name="shield" size={14} />
                        <small>
                          Your enquiry is encrypted and dispatched directly to our reservations team.
                        </small>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Right Column: Why Book & Quick Contact */}
            <div className="booking-sidebar-col">
              <div className="sidebar-card assistance-card">
                <span className="eyebrow">Direct Assistance</span>
                <h4>Need instant answers?</h4>
                <p>
                  Prefer discussing your plan with a real tour planner right now? Reach our WhatsApp
                  desk directly.
                </p>
                <a
                  href="https://wa.me/254722415892?text=Hello%20Chalcedony%2C%20I%20would%20like%20to%20plan%20a%20trip."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full"
                >
                  <Icon name="whatsapp" size={18} /> Chat with Tour Coordinator
                </a>
                <div className="phone-quick">
                  <Icon name="phone" size={15} />
                  <span>Or call us: +254 722 415 892</span>
                </div>
              </div>

              <div className="sidebar-card trust-perks-card">
                <h4>Why Book With Chalcedony?</h4>
                <ul className="perks-list">
                  <li>
                    <Icon name="check" size={16} />
                    <div>
                      <strong>Transparent Pricing</strong>
                      <small>No hidden park fees or unexpected fuel top-ups.</small>
                    </div>
                  </li>
                  <li>
                    <Icon name="check" size={16} />
                    <div>
                      <strong>Flexible Rescheduling</strong>
                      <small>Free date transfer on all group trips with 14 days notice.</small>
                    </div>
                  </li>
                  <li>
                    <Icon name="check" size={16} />
                    <div>
                      <strong>Certified Gold & Silver Guides</strong>
                      <small>KPSGA registered naturalists with deep wildlife tracking experience.</small>
                    </div>
                  </li>
                  <li>
                    <Icon name="check" size={16} />
                    <div>
                      <strong>Safe, Maintained Vehicles</strong>
                      <small>4WD Land Cruisers & speed-governed tour coaches with seatbelts.</small>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
