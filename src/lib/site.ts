/**
 * Everything the page says that might change, in one place.
 *
 * Facts come from the app repository (ai-influencer-main): feature wording from the
 * mobile app's screens, packs and prices from PROJECT_STATUS.md, privacy and deletion
 * behaviour from backend/README.md and backend/api/account/delete.js.
 *
 *   SITE_URL             where the site is published (Vercel); Play Console links to its pages.
 *   PLAY_STORE_URL       empty while the app is in internal testing, so the page says "Coming soon
 *                        to Google Play" instead of linking. Once the store listing is public, set it to
 *                        https://play.google.com/store/apps/details?id=com.aiinfluencer.app
 *   CONTACT_EMAIL        on every legal page and in the footer; deletion requests arrive here.
 *   EARLY_ACCESS_EMAIL   where "Ask for early access" opens a new email (the same inbox).
 */

export const SITE_URL = "https://influenza-website.vercel.app";
export const PLAY_STORE_URL = "";
export const CONTACT_EMAIL = "dexterz.iqbalhussain@gmail.com";
export const EARLY_ACCESS_EMAIL = CONTACT_EMAIL;

/**
 * The pages Google Play asks for (privacy policy, terms, how to delete an account, support)
 * read the values below. They are not decoration: the policy names who runs the app and
 * promises how long deleted data stays in backups, so each must be true before launch.
 * `npm run build` warns if one is empty or still says YOUR.
 *
 *   OPERATOR_NAME         the company that runs the app, as registered
 *   OPERATOR_ENTITY_ID    its business entity ID (the filing's confirmation number is not published)
 *   OPERATOR_ADDRESS      its postal address, for people who write rather than email
 *   GOVERNING_LAW         whose law the Terms follow: the state the company is in
 *   BACKUP_RETENTION_DAYS how long a database backup is kept on S3: set an S3 lifecycle rule on the
 *                         `backups/` prefix to expire after this many days (backend/README.md, "Backups")
 *   DELETION_REPLY_DAYS   how long someone who asks by email waits for their account to be deleted
 *   LEGAL_UPDATED         change it whenever the policy or terms change
 */
export const OPERATOR_NAME = "QYVERO LLC";
export const OPERATOR_ENTITY_ID = "0451539778";
export const OPERATOR_ADDRESS = "412 E Washington Ave, Unit #1158, Washington, NJ 07882, United States";
export const GOVERNING_LAW = "the State of New Jersey, United States";
export const BACKUP_RETENTION_DAYS = 30;
export const DELETION_REPLY_DAYS = 30;
export const LEGAL_UPDATED = "27 October 2026";
export const APP_PACKAGE = "com.aiinfluencer.app";

export const BRAND = "Influenza AI";

export const earlyAccessHref = `mailto:${EARLY_ACCESS_EMAIL}?subject=${encodeURIComponent(
  "Influenza AI early access",
)}&body=${encodeURIComponent("Hi, I'd like to try Influenza AI on Android when it opens up.")}`;

/**
 * Imagery: the influencer photos come from the app's own Figma design (file
 * "Influenza App"), the phone screens from the real app (design-reference/e2e-shots)
 * and the design's Home and Create frames. "Nova Prime" is the influencer in those
 * app screenshots.
 */
export const INFLUENCER = "Nova Prime";

export const LOOKS = [
  { src: "img/look-neon.webp", label: "Neon studio", alt: "The influencer in a black suit with glowing lapels, in a neon-lit studio" },
  { src: "img/look-beige.webp", label: "Tailored beige", alt: "The same influencer in a beige trouser suit, holding a white handbag" },
  { src: "img/look-seated.webp", label: "Lounge", alt: "The same influencer seated in a cream suit, smiling at the camera" },
  { src: "img/look-white.webp", label: "All white", alt: "The same influencer seated in a white suit" },
];

/** Phone screens, in the order someone meets them in the app. */
export const APP_SCREENS = [
  { src: "img/app-home.webp", title: "Home", body: "Create, product videos and Motion Copy, one tap away." },
  { src: "img/app-create.webp", title: "Create", body: "Three steps: the basics, a reference, then generate." },
  { src: "img/app-profile.webp", title: "Profile", body: "Regenerate the main image or share it. Each try shows its cost in credits first." },
  { src: "img/app-videos.webp", title: "Videos", body: "Write what your influencer says, add up to three product photos, generate." },
  { src: "img/app-motion.webp", title: "Motion", body: "Upload a 3 to 30 second clip with one clearly visible person." },
  { src: "img/app-gallery.webp", title: "Gallery", body: "Videos, images and character sheets, saved for each influencer." },
];

export const USE_CASES = [
  { title: "Brands", body: "Give every launch the same recognisable face.", src: "img/look-beige.webp" },
  { title: "Online stores", body: "Turn a product photo into a video where someone presents it.", src: "img/look-seated.webp" },
  { title: "Creators and agencies", body: "Run several influencers from one account, each with a gallery of their own.", src: "img/look-white.webp" },
];

/** The app's own "Features to match" list (core/prompts/influencerPrompts.js). */
export const FEATURES_TO_MATCH = [
  "Face & identity",
  "Hair",
  "Skin tone",
  "Eyes",
  "Body & build",
  "Outfit",
  "Expression",
  "Background",
];

/** Google Play one-time products credits_5000 / credits_10000 / credits_20000. */
export const PACKS = [
  { credits: "5,000", price: "$20", perThousand: "$4.00" },
  { credits: "10,000", price: "$35", perThousand: "$3.50" },
  { credits: "20,000", price: "$70", perThousand: "$3.50" },
];

export const FAQ = [
  {
    q: "When can I get the app?",
    a: "Influenza AI is in early testing on Android. Ask for early access and we will get back to you when there is a place for you.",
  },
  {
    q: "Which phones does it run on?",
    a: "Android, through Google Play. That is the only version right now.",
  },
  {
    q: "How do credits work?",
    a: "Every image and video uses credits, depending on the model and the length of the clip. Credits are set aside when a generation starts and given back if it fails or is blocked.",
  },
  {
    q: "Is it a subscription?",
    a: "No. Credit packs are one-time purchases through Google Play. Google Play shows the price in your currency before you pay.",
  },
  {
    q: "Who can see what I make?",
    a: "Your uploads and results are stored privately and only your account can open them. Content that our moderation flags can be looked at by our team.",
  },
  {
    q: "What can't I make?",
    a: "Prompts, uploads and results are checked by automated moderation, and anything it blocks is not generated. Sending blocked content again and again suspends the account.",
  },
  {
    q: "How do I delete my account?",
    a: "In the app, open Settings, choose Delete account and confirm with your password. Your account, influencers, results and files are deleted permanently, and every device is signed out.",
  },
];
