import { ReactNode } from "react";

export type IconName =
  | "arrow"
  | "bus"
  | "calendar"
  | "car"
  | "chevron"
  | "clock"
  | "close"
  | "compass"
  | "heart"
  | "hotel"
  | "instagram"
  | "mail"
  | "map"
  | "menu"
  | "phone"
  | "quote"
  | "shield"
  | "spark"
  | "star"
  | "users"
  | "whatsapp"
  | "filter"
  | "search"
  | "check"
  | "plus"
  | "trash"
  | "edit"
  | "lock"
  | "unlock"
  | "eye"
  | "camera"
  | "video"
  | "download"
  | "refresh"
  | "logout"
  | "dashboard"
  | "tag"
  | "fuel"
  | "seat"
  | "luggage"
  | "file-text";

export function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    bus: (
      <>
        <path d="M8 6v6" />
        <path d="M16 6v6" />
        <path d="M3 6h18v10H3z" />
        <path d="M5 16v3M19 16v3M3 12h18" />
        <circle cx="7" cy="16" r=".5" />
        <circle cx="17" cy="16" r=".5" />
      </>
    ),
    calendar: (
      <>
        <path d="M6 2v4M18 2v4M3 9h18" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
      </>
    ),
    car: (
      <>
        <path d="m5 11 2-5h10l2 5" />
        <path d="M3 11h18v7H3z" />
        <path d="M5 18v2M19 18v2" />
        <circle cx="7" cy="14.5" r=".5" />
        <circle cx="17" cy="14.5" r=".5" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5z" />
      </>
    ),
    heart: (
      <path d="M20.8 5.8a5.4 5.4 0 0 0-7.7 0L12 6.9l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7L12 22l8.8-8.5a5.4 5.4 0 0 0 0-7.7z" />
    ),
    hotel: (
      <>
        <path d="M4 22V3h16v19M2 22h20" />
        <path d="M8 7h2M14 7h2M8 11h2M14 11h2M10 22v-6h4v6" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    map: (
      <>
        <path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3zM9 3v15M15 6v15" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9z" />
    ),
    quote: (
      <>
        <path d="M4 15h5l2-6V5H4v10zM13 15h5l2-6V5h-7v10z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.3 4.7L18 9l-4.7 1.3L12 15l-1.3-4.7L6 9l4.7-1.3z" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z" />
      </>
    ),
    star: <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9z" />,
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M21 11.5a8.7 8.7 0 0 1-9 8.5 9.6 9.6 0 0 1-3.8-.8L3 21l1.7-5a8.2 8.2 0 0 1-1.2-4.5A8.7 8.7 0 0 1 12.5 3a8.7 8.7 0 0 1 8.5 8.5z" />
        <path d="M9 8.5c.5 3 2 4.5 5.5 6" />
      </>
    ),
    filter: (
      <>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
    trash: (
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </>
    ),
    edit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
    unlock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    camera: (
      <>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    video: (
      <>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
    refresh: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </>
    ),
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </>
    ),
    tag: (
      <>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </>
    ),
    fuel: (
      <>
        <line x1="3" y1="22" x2="15" y2="22" />
        <line x1="4" y1="9" x2="14" y2="9" />
        <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
        <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
      </>
    ),
    seat: (
      <>
        <path d="M7 11V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v7" />
        <path d="M4 14v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
        <path d="M6 18H4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3" />
        <path d="M18 18h2v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3" />
      </>
    ),
    luggage: (
      <>
        <rect x="4" y="7" width="16" height="14" rx="2" />
        <path d="M8 7V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
        <line x1="12" y1="7" x2="12" y2="21" />
      </>
    ),
    "file-text": (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || paths.compass}
    </svg>
  );
}

export function Logo({
  light = false,
  onClick,
}: {
  light?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`logo ${light ? "logo-light" : ""}`}
      onClick={onClick}
      aria-label="Chalcedony Adventures home"
      type="button"
    >
      <span className="logo-mark">
        <Icon name="compass" size={24} />
      </span>
      <span>
        <strong>CHALCEDONY</strong>
        <small>ADVENTURES</small>
      </span>
    </button>
  );
}
