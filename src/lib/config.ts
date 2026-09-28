import type { ImageMetadata } from 'astro';
import raw from '../config/site.json';

export interface Link { label: string; href: string }
export interface Hours { days: string; time: string }
export interface SocialLink { platform: 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'google' | 'yelp' | 'linkedin' | 'x' | string; url: string; label: string }
export interface Stat { value: string; label: string }
export interface FaqItem { question: string; answer: string }
export interface FloorOption {
  name: string;
  description: string;
  /** Draws the swatch: `flake` (speckled chips), `solid`, `metallic` (marbled swirl) or `quartz` (fine sand). */
  style: 'flake' | 'solid' | 'metallic' | 'quartz';
  /** First color is the base coat; the rest are chip/vein colors. */
  colors: string[];
  /** Optional photo shown instead of the CSS swatch (public path, URL, or a file in src/assets/images/). */
  image?: string;
  /** `cover` (default) fills the swatch and crops; `contain` shows the whole image centered, letterboxed on white. */
  imageFit?: 'cover' | 'contain';
  bestFor?: string;
  /** Makes the card a link, e.g. "/full-flake" for a detail page defined under `pages`. */
  href?: string;
  /** Open the link in a new browser tab. */
  newTab?: boolean;
}
export interface PageSection {
  /** Anchor id for the jump links, e.g. "where". */
  id: string;
  heading: string;
  body?: string[];
  bullets?: string[];
  /** Numbered steps, for a process section. */
  steps?: { title: string; text: string }[];
}
export interface ContentPage {
  title: string;
  eyebrow?: string;
  intro: string;
  /** Wide image at the top of the page. */
  image?: string;
  sections: PageSection[];
  cta?: Link;
  /** Heading and sentence for the closing call-to-action box. */
  ctaHeading?: string;
  ctaText?: string;
}
export interface Service {
  icon: string;
  title: string;
  description: string;
  features?: string[];
  /** Short chips shown on the card, e.g. ["Residential", "Commercial"]. */
  bestFor?: string[];
  startingAt?: string;
}
export interface PortfolioItem {
  src: string;
  alt: string;
  title: string;
  /** The coating system used, e.g. "1/4\" flake, polyaspartic topcoat". */
  system?: string;
  location?: string;
  category: string;
  /** Tile shape in the grid. `wide` spans two columns on large screens. */
  orientation?: 'landscape' | 'wide' | 'square' | 'portrait';
}

export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    logo: { src: string; alt: string; showName: boolean };
    description: string;
    yearFounded: number;
    /** Optional license or certification line shown under the contact details. */
    license?: string;
    /** Image used when the site is shared on social media (Open Graph). Public path or full URL. */
    shareImage?: string;
  };
  contact: {
    phone: string;
    /** Optional second line, shown in the contact section and footer. */
    altPhone?: string;
    email: string;
    address: { street?: string; city: string; state: string; zip?: string };
    hours: Hours[];
    serviceArea: string;
    bookingNote?: string;
  };
  social: SocialLink[];
  nav: Link[];
  header: { cta?: Link; showPhone: boolean };
  hero: {
    /**
     * `photo` (default): full-screen background photo with the headline over it.
     * `banner`: shows `image` intact (for a branded graphic with its own text), with the headline below it.
     */
    layout?: 'photo' | 'banner';
    eyebrow?: string;
    heading: string;
    subheading: string;
    image: string;
    /** CSS object-position for the hero photo, e.g. "center 60%". Controls what stays in frame when it's cropped. */
    imagePosition?: string;
    /**
     * Blur radius in px for the photo-layout background. Use a few px when the image has its own
     * lettering that would clash with the headline; it keeps the colors and shapes as a backdrop.
     */
    imageBlur?: number;
    /** Banner layout only: `cover` fills the width and crops; `contain` shows the whole graphic uncropped. */
    imageFit?: 'cover' | 'contain';
    /** Banner layout only: hide the sharp graphic and keep just the blurred backdrop behind the headline. */
    hideImage?: boolean;
    primaryCta: Link;
    secondaryCta?: Link;
    /** Short trust points rendered as a check list under the buttons. */
    highlights?: string[];
    /** Banner layout: put the quote form in the hero's right column instead of the highlights box. */
    showForm?: boolean;
    formHeading?: string;
    stats?: Stat[];
  };
  services: { eyebrow: string; heading: string; intro: string; items: Service[] };
  portfolio: {
    eyebrow: string;
    heading: string;
    intro: string;
    allLabel: string;
    categories: string[];
    items: PortfolioItem[];
    /** `uniform` (default): every tile is the same 3:2 size with even gaps. `mixed`: tiles use their `orientation`, and `wide` spans two columns. */
    grid?: 'uniform' | 'mixed';
    /** Optional "Our Options" block under the gallery. Remove it to hide. */
    options?: { heading: string; intro: string; items: FloorOption[]; finishes?: string[] };
  };
  /** Optional. Remove the key or empty `items` to hide the section. */
  /** Extra pages, keyed by URL slug: `"full-flake"` becomes /full-flake. */
  pages?: Record<string, ContentPage>;
  faq?: { eyebrow: string; heading: string; intro: string; cta?: Link; items: FaqItem[] };
  contactForm: {
    eyebrow: string;
    heading: string;
    intro: string;
    /** Form endpoint (Formspree, Netlify, your own API). Leave empty to fall back to the visitor's email app. */
    action: string;
    method: 'POST' | 'GET';
    submitLabel: string;
    successMessage: string;
    propertyOptions: string[];
    serviceOptions: string[];
    timelineOptions: string[];
  };
  footer: { text: string; links: Link[] };
  theme: {
    background: string;
    surface: string;
    text: string;
    accent: string;
    accentDark: string;
    /** Text color on accent-colored buttons. Defaults to near-black; use white for darker brand colors. */
    onAccent?: string;
  };
}

export const site: SiteConfig = raw as SiteConfig;

/** "2140 Industrial Blvd, Suite B, Houston, TX 77002". Street and zip are optional for mobile-only crews. */
export const fullAddress = (): string => {
  const a = site.contact.address;
  const region = [a.state, a.zip].filter(Boolean).join(' ');
  return [a.street, a.city, region].filter(Boolean).join(', ');
};

/** Strips formatting so the phone works in a tel: link. */
export const telHref = (): string => `tel:${site.contact.phone.replace(/[^\d+]/g, '')}`;

export const mailHref = (): string => `mailto:${site.contact.email}`;

/** tel: link for any formatted phone string. */
export const telFor = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const mapsHref = (): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`;

export const isExternal = (href: string): boolean => /^https?:\/\//.test(href);

/** Makes in-page anchors ("#contact") work from sub-pages by pointing them back at the home page. */
export const navHref = (href: string, pathname: string): string =>
  href.startsWith('#') && pathname !== '/' ? `/${href}` : href;

const assetImages = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG}',
  { eager: true },
);

/**
 * Resolves an image value from site.json.
 * - A bare filename ("garage-flake.jpg") is looked up in src/assets/images/ and optimized by Astro.
 * - A path starting with "/" (public folder) or a full URL is used as-is.
 */
export const resolveImage = (src: string): ImageMetadata | string => {
  if (src.startsWith('/') || isExternal(src)) return src;
  const match = assetImages[`../assets/images/${src}`];
  if (!match) {
    throw new Error(`site.json references "${src}", but no such file exists in src/assets/images/.`);
  }
  return match.default;
};
