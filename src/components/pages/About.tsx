import { teamMembers } from "../../data/seedData";
import { NavigationPage } from "../../types";
import { Icon } from "../ui/Icon";

export function About({
  onNavigate,
}: {
  onNavigate: (page: NavigationPage) => void;
}) {
  return (
    <div className="page-about">
      {/* Page Header */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-kicker">
            <button onClick={() => onNavigate("home")} type="button">
              Home
            </button>
            <span>/</span>
            <strong>About Us</strong>
          </div>
          <h1>
            Driven by Passion,
            <br />
            United by <em>Adventure.</em>
          </h1>
          <p className="page-hero-sub">
            Learn about our journey, our commitment to East African conservation, and the
            passionate team behind every unforgettable Chalcedony experience.
          </p>
        </div>
      </section>

      {/* Company Story & Origins */}
      <section className="section about-story-section">
        <div className="container">
          <div className="about-split-grid">
            <div className="about-text-col">
              <span className="eyebrow">Our Story</span>
              <h2>Rooted in Kenya, Created for Travelers Worldwide</h2>
              <p>
                Founded over 8 years ago in Nairobi, Chalcedony Adventures started with a humble
                mission: to make Kenya’s awe-inspiring wildlife, dramatic landscapes, and warm
                cultural tapestry accessible, safe, and deeply meaningful for every traveler.
              </p>
              <p>
                Over the years, we have grown from a single safari vehicle carrying passionate
                weekend hikers into a full-service travel, tour, transport, and lodge booking
                partner. We have served thousands of corporate teams, families, university
                expeditions, and solo globetrotters from across the globe.
              </p>
              <p>
                Yet our core principle remains unchanged: we do not just arrange logistics; we
                create environments where people feel alive, connected, and inspired.
              </p>

              <div className="about-stat-row">
                <div className="stat-box">
                  <strong>8+</strong>
                  <span>Years of Operations</span>
                </div>
                <div className="stat-box">
                  <strong>500+</strong>
                  <span>Happy Travelers</span>
                </div>
                <div className="stat-box">
                  <strong>45+</strong>
                  <span>Kenyan Destinations</span>
                </div>
                <div className="stat-box">
                  <strong>100%</strong>
                  <span>Safety Record</span>
                </div>
              </div>
            </div>

            <div className="about-image-collage">
              <div className="collage-card top-img">
                <img
                  src="https://images.unsplash.com/photo-1709567484031-87bc70607500?auto=format&fit=crop&w=1000&q=80"
                  alt="Chalcedony travelers sharing campfire laughter"
                />
              </div>
              <div className="collage-card bottom-img">
                <img
                  src="https://images.unsplash.com/photo-1547471080-d5e8a6d4fb4c?auto=format&fit=crop&w=1000&q=80"
                  alt="Land Cruiser safari game drive"
                />
              </div>
              <div className="experience-badge-float">
                <Icon name="shield" size={28} />
                <div>
                  <strong>Certified & Licensed</strong>
                  <small>Tourism Regulatory Authority (TRA)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision & Values */}
      <section className="section bg-light-sand">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Guiding Light</span>
            <h2>Our Mission, Vision & Core Values</h2>
            <p>The foundations that guide every tour, itinerary, and guest interaction.</p>
          </div>

          <div className="pillar-grid">
            <div className="pillar-card">
              <div className="pillar-icon">
                <Icon name="compass" size={28} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide authentic, transformative, and meticulously planned travel experiences
                across Kenya while supporting local communities and preserving our natural heritage
                for generations to come.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Icon name="spark" size={28} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be East Africa’s most trusted and heartwarming travel partner—celebrated for
                uncompromising safety, personal touch, customer delight, and sustainable tourism.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Icon name="shield" size={28} />
              </div>
              <h3>Safety & Compliance</h3>
              <p>
                Zero compromises on passenger well-being. All vehicles are fitted with speed
                governors, certified tracking, comprehensive passenger insurance, and driven by
                defensive-driving certified captains.
              </p>
            </div>
          </div>

          {/* 4 Values Row */}
          <div className="values-row-full">
            <div className="val-item">
              <div className="val-icon">
                <Icon name="heart" size={22} />
              </div>
              <h4>Heartfelt Hospitality</h4>
              <p>We treat every guest as family. From the first enquiry to the airport farewell.</p>
            </div>
            <div className="val-item">
              <div className="val-icon">
                <Icon name="users" size={22} />
              </div>
              <h4>Community Uplift</h4>
              <p>We actively partner with local Maasai villages, guides, and regional eco-camps.</p>
            </div>
            <div className="val-item">
              <div className="val-icon">
                <Icon name="check" size={22} />
              </div>
              <h4>Honest Transparency</h4>
              <p>Clear, inclusive pricing with no hidden charges, surprise park fees, or fuel traps.</p>
            </div>
            <div className="val-item">
              <div className="val-icon">
                <Icon name="star" size={22} />
              </div>
              <h4>Local Mastery</h4>
              <p>Deep native knowledge of wildlife migration patterns, hidden trails, and seasonal weather.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Behind the Scenes</span>
            <h2>Meet the Leadership & Field Guides</h2>
            <p>
              The dedicated naturalists, logistics coordinators, and fleet managers making your
              adventures effortless.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <article className="team-card" key={member.id}>
                <div className="team-img-wrapper">
                  <img src={member.image} alt={member.name} />
                  <span className="team-exp-badge">{member.experience}</span>
                </div>
                <div className="team-content">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="ready-cta-section">
        <div className="container">
          <div className="ready-cta-card">
            <div className="ready-cta-content">
              <span className="eyebrow">Experience the Difference</span>
              <h2>Ready to plan your journey with us?</h2>
              <p>
                Our travel consultants are ready to answer any questions or design a custom group
                quote today.
              </p>
            </div>
            <div className="ready-cta-actions">
              <button
                className="btn btn-gold"
                onClick={() => onNavigate("booking")}
                type="button"
              >
                Start Your Enquiry <Icon name="arrow" size={18} />
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => onNavigate("contact")}
                type="button"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
