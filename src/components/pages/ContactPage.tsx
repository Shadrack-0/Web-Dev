import { FormEvent, useState } from "react";
import { NavigationPage } from "../../types";
import { StorageService } from "../../services/storage";
import { useFormspree } from "../../hooks/useFormspree";
import { Icon } from "../ui/Icon";

export function ContactPage({
  onNavigate,
}: {
  onNavigate: (page: NavigationPage) => void;
}) {
  const { submitting, succeeded, errors, submit, reset } = useFormspree();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General inquiry");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Send via Formspree API
    await submit({
      fullName: name,
      phone,
      email,
      subject,
      message,
      formType: "Contact Message",
      submittedAt: new Date().toLocaleString("en-GB"),
    });

    // 2. Also log locally in Admin Portal database
    StorageService.createInquiry({
      fullName: name,
      phone,
      email,
      serviceType: "General enquiry",
      preferredDate: new Date().toISOString().split("T")[0],
      numberOfTravelers: 1,
      destinationOrNotes: `[Subject: ${subject}] ${message}`,
    });
  };

  const faqs = [
    {
      q: "How do I secure my booking for an upcoming trip or safari?",
      a: "Bookings are confirmed with a 30% to 50% commitment deposit via Lipa na M-PESA or direct bank transfer. The remaining balance can be settled 3 to 7 days before departure or upon vehicle dispatch.",
    },
    {
      q: "Can I customize a private safari for my family or corporate team?",
      a: "Absolutely! Over 50% of our operations are tailor-made private tours. You choose your preferred departure dates, group size, and whether you prefer budget luxury tented camps or 5-star lodges.",
    },
    {
      q: "What is included in the vehicle hire daily rate?",
      a: "Our standard car and bus hire rates include a fully licensed, defensive-driving certified chauffeur-guide and unlimited mileage within the agreed itinerary. Fuel and park vehicle entrance permits can be packaged together or invoiced separately based on client preference.",
    },
    {
      q: "What is your cancellation and refund policy?",
      a: "Cancellations made 14 days or more before departure receive a 90% refund or free credit rollover to any future trip. For shorter notices, camp cancellation charges apply as per our partner lodge agreements.",
    },
    {
      q: "Do you cater to dietary requirements on group trips?",
      a: "Yes. All our partner camps, lodges, and buffet stops cater to vegetarian, vegan, halal, gluten-free, and child-friendly meal requirements. Simply mention your preferences when booking.",
    },
  ];

  return (
    <div className="page-contact">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-kicker">
            <button onClick={() => onNavigate("home")} type="button">
              Home
            </button>
            <span>/</span>
            <strong>Contact Us</strong>
          </div>
          <h1>
            We’d Love to
            <br />
            Hear from <em>You.</em>
          </h1>
          <p className="page-hero-sub">
            Have questions about a safari, need an immediate vehicle charter quote, or want to
            visit our offices in Nairobi? Our travel desk is always ready to assist.
          </p>
        </div>
      </section>

      {/* Direct Contact Cards */}
      <section className="section contact-cards-section">
        <div className="container">
          <div className="contact-info-grid">
            {/* WhatsApp */}
            <div className="contact-card highlight-card">
              <div className="contact-icon-bubble">
                <Icon name="whatsapp" size={26} />
              </div>
              <h3>WhatsApp Chat</h3>
              <p>For instant quotations, packing advice, and fast responses within minutes.</p>
              <a
                href="https://wa.me/254722415892?text=Hello%20Chalcedony%20Adventures%2C%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold btn-sm"
              >
                +254 722 415 892
              </a>
              <small>Available 24/7 on WhatsApp</small>
            </div>

            {/* Email */}
            <div className="contact-card">
              <div className="contact-icon-bubble">
                <Icon name="mail" size={26} />
              </div>
              <h3>Email Enquiries</h3>
              <p>Send detailed RFPs, corporate travel itineraries, or formal invoice requests.</p>
              <a
                href="mailto:hello@chalcedonyadventures.com"
                className="contact-card-link"
              >
                hello@chalcedonyadventures.com
              </a>
              <small>Average reply time: under 2 hours</small>
            </div>

            {/* Office */}
            <div className="contact-card">
              <div className="contact-icon-bubble">
                <Icon name="map" size={26} />
              </div>
              <h3>Nairobi Headquarters</h3>
              <p>The Promenade, 4th Floor, General Mathenge Drive, Westlands, Nairobi.</p>
              <span className="contact-card-sub">Mon – Sat: 8:00 AM – 6:00 PM</span>
              <small>Visitor parking available</small>
            </div>

            {/* Emergency Hotline */}
            <div className="contact-card">
              <div className="contact-icon-bubble">
                <Icon name="phone" size={26} />
              </div>
              <h3>Direct Calls & Hotline</h3>
              <p>For urgent tour coordination, flight transfers, and on-trip assistance.</p>
              <a href="tel:+254722415892" className="contact-card-link">
                +254 722 415 892 / +254 703 652 119
              </a>
              <small>24-hour safari dispatch line</small>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="section bg-light-sand">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Form Column */}
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>
              <p>Fill out the form below and our team will get in touch shortly.</p>

              {succeeded ? (
                <div className="contact-success-state">
                  <div className="success-icon-wrap">
                    <Icon name="check" size={32} />
                  </div>
                  <h4>Message Sent to Safari Desk!</h4>
                  <p>
                    Thank you for reaching out, <strong>{name}</strong>. Your message has been
                    dispatched to our email and logged into our reservations system. We will contact
                    you via WhatsApp or email within 2 hours.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      reset();
                      setName("");
                      setPhone("");
                      setEmail("");
                      setMessage("");
                    }}
                    type="button"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="standard-form">
                  {errors && errors.length > 0 && (
                    <div className="admin-error-box" style={{ marginBottom: "16px" }}>
                      <Icon name="close" size={16} />
                      <span>{errors.join(", ")}</span>
                    </div>
                  )}

                  <div className="form-row">
                    <label>
                      Your Full Name
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Samuel Kamau"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>
                    <label>
                      Phone Number (WhatsApp)
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+254 7..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Email Address
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <label>
                      Inquiry Subject
                      <select
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      >
                        <option value="General inquiry">General Inquiry</option>
                        <option value="Upcoming group trip">Upcoming Group Trip</option>
                        <option value="Custom safari quote">Custom Safari Quote</option>
                        <option value="Vehicle hire">Car / Bus Hire</option>
                        <option value="Hotel booking">Lodge / Hotel Booking</option>
                        <option value="Partnership">Partnership / Corporate</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Your Message / Travel Details
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your expected travel dates, destinations, number of people..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary w-full"
                  >
                    {submitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Icon name="arrow" size={17} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Location & Map Card */}
            <div className="contact-location-panel">
              <div className="location-visual-card">
                <div className="location-pin-header">
                  <Icon name="map" size={24} />
                  <div>
                    <h4>Nairobi Operations Center</h4>
                    <span>The Promenade, Westlands</span>
                  </div>
                </div>
                <div className="simulated-map-box">
                  <div className="map-road-graphic">
                    <div className="road road-h" />
                    <div className="road road-v" />
                    <div className="map-pin-point">
                      <div className="pulse-circle" />
                      <div className="pin-icon">
                        <Icon name="compass" size={16} />
                      </div>
                      <span className="pin-label">Chalcedony Adventures HQ</span>
                    </div>
                  </div>
                </div>
                <div className="location-directions-text">
                  <h5>Driving Directions:</h5>
                  <p>
                    From Nairobi CBD, take Waiyaki Way into Mpaka Road, then branch onto General
                    Mathenge Drive. We are situated at The Promenade, opposite the Oval.
                  </p>
                </div>
              </div>

              {/* Social Channels Card */}
              <div className="social-connect-card">
                <h4>Join Our Travel Community</h4>
                <p>Stay updated with our latest trip drops, discounts, and safari videos.</p>
                <div className="social-pills-row">
                  <a
                    href="https://www.instagram.com/chalcedonyadventures"
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                  >
                    <Icon name="instagram" size={17} /> Instagram
                  </a>
                  <a
                    href="https://wa.me/254722415892"
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                  >
                    <Icon name="whatsapp" size={17} /> WhatsApp Group
                  </a>
                  <a
                    href="https://www.facebook.com/chalcedonyadventures"
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section contact-faq-section">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about planning, booking, and traveling with us.</p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  className={`faq-item ${isOpen ? "open" : ""}`}
                  key={index}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    type="button"
                  >
                    <span>{faq.q}</span>
                    <Icon
                      name="chevron"
                      size={18}
                      className={`faq-chevron ${isOpen ? "rotate" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
