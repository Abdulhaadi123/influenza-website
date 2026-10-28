import type { Metadata } from "next";
import { LegalPage, Mail } from "@/components/legal/LegalPage";
import {
  APP_PACKAGE,
  BACKUP_RETENTION_DAYS,
  BRAND,
  DELETION_REPLY_DAYS,
  LEGAL_UPDATED,
  OPERATOR_ADDRESS,
  OPERATOR_ENTITY_ID,
  OPERATOR_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND}`,
  description: `What ${BRAND} collects, who handles it, how long it is kept and how to have it deleted.`,
};

/*
 * Every statement here is checked against what the app and its server do (app: mobile/app.json,
 * package.json and the sign-in, upload and purchase code; server: backend/db/migrations, the
 * account delete endpoint, the moderation notes in backend/README.md). When either changes —
 * a new service that receives data, a new kind of data kept — change this page and LEGAL_UPDATED.
 */

const SECTIONS: [string, string][] = [
  ["who", "Who we are"],
  ["short", "The short version"],
  ["collect", "What we collect"],
  ["permissions", "Camera and photos"],
  ["use", "How we use it"],
  ["share", "Who handles it for us"],
  ["keep", "How long we keep it"],
  ["rights", "Your choices and rights"],
  ["security", "Security"],
  ["children", "Children"],
  ["transfers", "Other countries"],
  ["changes", "Changes to this policy"],
  ["contact", "Contact"],
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={LEGAL_UPDATED}
      lead={
        <>
          {BRAND} lets you design an AI influencer and make images and videos of them. This page explains what the app and
          our servers handle, who helps us with it, how long we keep it, and how you can have it deleted.
        </>
      }
    >
      <ul className="toc" aria-label="On this page">
        {SECTIONS.map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`}>{label}</a>
          </li>
        ))}
      </ul>

      <h2 id="who">Who we are</h2>
      <p>
        The {BRAND} app (Android package <code>{APP_PACKAGE}</code>) is run by <strong>{OPERATOR_NAME}</strong> (“we”, “us”),
        entity ID {OPERATOR_ENTITY_ID}, {OPERATOR_ADDRESS}. We decide why and how your information is used, so we are the one
        responsible for it. You can reach us at <Mail /> or by post at that address.
      </p>

      <h2 id="short">The short version</h2>
      <ul>
        <li>We collect what is needed to run your account and to make what you ask for: your email, your name, what you create and upload, and your credits.</li>
        <li>There are no ads. We do not sell or rent your information, and we do not track you across other apps or websites. The app has no advertising or analytics tools in it.</li>
        <li>Your uploads and results are kept in private storage and open only to your account. Content that our automatic checks flag, or that someone reports, can be looked at by our team.</li>
        <li>To make an image or a video, the text and pictures you send are processed by AI services that work for us. They are named in “Who handles it for us” below.</li>
        <li>
          You can delete your account, and everything in it, from <strong>Settings → Delete account</strong> in the app, or by email.{" "}
          <a href="/delete-account/">How to delete your account</a>.
        </li>
      </ul>

      <h2 id="collect">What we collect</h2>

      <h3>Account details</h3>
      <p>
        Your email address, the name you choose, and your password. The password is kept only as a one-way scrambled value
        (an Argon2id hash), so nobody at {BRAND} can read it. We also keep whether you have confirmed your email and when the
        account was created and last changed.
      </p>
      <p>
        If you choose <strong>Continue with Google</strong>, Google tells us your email address, your name and a number that
        identifies your Google account. We keep that number, so the next time you choose Google we find your account. We never
        receive your Google password. An account made this way has no password of its own until you ask for one from{" "}
        <strong>Settings → Set a password</strong>.
      </p>

      <h3>Sign-in records</h3>
      <p>
        For each device you sign in on we keep a session: scrambled copies of its sign-in tokens, a short description of the
        app and phone (the “user agent” text the app sends), and when it was started and last used. A session ends when you
        sign out, change your password or delete your account.
      </p>

      <h3>What you create and upload</h3>
      <p>
        The influencers you design (their name, look and the choices you make for them), the text you write to describe an
        image or a video, the photos you take or choose (reference photos and product photos), video clips you add for Motion
        Copy, audio files, and the images and videos made for you, together with small preview pictures. These are stored in
        private cloud storage. A photo you upload can show a real person, so please read the <a href="/terms/">Terms of Use</a>{" "}
        about uploading only what you have the right to use.
      </p>

      <h3>Credits and purchases</h3>
      <p>
        A record of every change to your credit balance: credits bought, spent on a generation (with the model and the date),
        and given back when a generation fails or is blocked. When you buy a credit pack, Google Play takes the payment and
        RevenueCat tells us what was bought: the product, the store’s transaction number, whether it was a test purchase, and
        your account number. <strong>We never see your card or other payment details.</strong>
      </p>

      <h3>Safety checks and reports</h3>
      <p>
        Text and pictures are checked automatically before a generation is sent, and results are checked when they come back.
        If a request is refused we keep a short excerpt of the text (up to 400 characters) and the check’s scores, so that a
        person can see what was refused; we do not keep the contents of pictures in the check records. We count refusals,
        because repeated ones can suspend an account. A result that a check blocks is hidden from you and kept for review. If
        you report a result, we keep your report and any note you add.
      </p>

      <h3>Technical information</h3>
      <p>
        Like any online service, our servers process your IP address and the time of each request, and keep records of errors.
        We use this to keep the service running, to limit abuse and to investigate problems.
      </p>

      <h3>On your phone</h3>
      <p>
        The app keeps your sign-in in Android’s secure storage and a copy of your influencers and gallery on the phone so that
        screens open quickly. This stays on your phone and is removed when you uninstall the app.
      </p>

      <h3>What we do not collect</h3>
      <p>
        Your location, your contacts, recordings from your microphone, an advertising ID, or your card and bank details.
      </p>

      <h2 id="permissions">Camera and photos</h2>
      <p>
        The app asks Android for access only when you use a feature that needs it: the <strong>camera</strong> to take a
        reference photo, and your <strong>photos and videos</strong> to choose reference images, product photos and Motion
        Copy clips. It also saves or shares a result when you ask it to. You can say no, or take the permission back later in
        Android’s settings; the rest of the app keeps working, but you cannot add files that way.
      </p>

      <h2 id="use">How we use it</h2>
      <ul>
        <li><strong>To give you the service:</strong> sign you in, make the images and videos you ask for, keep your gallery, and count your credits.</li>
        <li><strong>To keep people safe:</strong> check what goes in and comes out, act on reports, stop abuse and fraud, and suspend accounts that break the rules in the <a href="/terms/">Terms of Use</a>.</li>
        <li><strong>To email you about your account:</strong> to confirm your address and to reset a password. We do not send marketing email.</li>
        <li><strong>To fix and secure the service,</strong> and to meet our legal duties.</li>
      </ul>
      <p>
        We do not use your uploads or results to train AI models of our own. If you are in the European Economic Area or the
        United Kingdom, the legal grounds we rely on are: that it is needed to provide the service you asked for (your
        contract with us), our legitimate interest in keeping the service safe and secure, our legal obligations, and your
        consent where you give it, for example when you allow camera or photo access.
      </p>

      <h2 id="share">Who handles it for us</h2>
      <p>
        We do not sell your information. We do pass it to the companies below, only so that they can do their part of the
        service for us, under their own terms and privacy policies.
      </p>
      <ul>
        <li>
          <strong>KIE (kie.ai)</strong> runs the AI image and video models. It receives the text and the pictures, video or
          audio you include in a generation request, and sends the result back.
        </li>
        <li>
          <strong>OpenAI</strong> does our automatic safety checks on text and on pictures (for a video, on still frames taken
          from it), and rewrites your text when you ask the app for a suggestion. It receives the text or picture being
          checked.
        </li>
        <li>
          <strong>Amazon Web Services</strong> holds the private storage for your uploads, results and previews, and our
          database backups.
        </li>
        <li>
          <strong>RevenueCat</strong> and <strong>Google Play</strong> handle credit-pack purchases. RevenueCat receives your
          account number and the purchase details from the store. Google handles the payment itself.
        </li>
        <li>
          <strong>Google</strong> signs you in when you choose Continue with Google. Google shows its own account picker on your
          phone and tells us who you are (see “Account details”); what Google itself receives is described in Google’s privacy
          policy.
        </li>
        <li><strong>An email delivery service</strong> sends the confirmation and password-reset emails, so it receives your email address and the message.</li>
        <li><strong>Our server hosting provider</strong> runs the servers the service lives on.</li>
      </ul>
      <p>
        We may also disclose information when the law requires it, to protect people’s safety (for example when content
        involves harm to a child), or to protect our rights. If the business is ever sold or reorganised, your information
        goes with it, and this policy keeps applying until you are told of a change.
      </p>

      <h2 id="keep">How long we keep it</h2>
      <ul>
        <li><strong>While you have an account,</strong> we keep your account details, influencers, uploads, results and credit history, so that your gallery and balance are there when you open the app.</li>
        <li><strong>Sign-in sessions</strong> end when you sign out, change your password or delete your account, or after 30 days without use.</li>
        <li><strong>When you delete your account,</strong> your files are removed from storage and your records are removed from our database straight away. This includes your influencers, results, credit history and the refused-text excerpts.</li>
      </ul>
      <div className="note">
        <p>
          <strong>What remains after you delete your account.</strong> Database backups are kept for up to{" "}
          {BACKUP_RETENTION_DAYS} days and then expire, so deleted data can sit in a backup until then; we do not restore a
          deleted account from one. We keep the purchase notices RevenueCat sent us (product, date, store transaction
          number), no longer linked to your account, for accounting and to catch fraud. A security log of what our staff did
          to an account (for example adding credits) is kept and may mention the email address.
        </p>
      </div>

      <h2 id="rights">Your choices and rights</h2>
      <p>
        You can see your name and email, change or set a password and delete your account in the app’s Settings. You can also
        email us to ask for a copy of your information, to correct it, or to object to or limit how we use it. We reply within{" "}
        {DELETION_REPLY_DAYS} days.
      </p>
      <p>
        Depending on where you live (for example the European Economic Area, the United Kingdom or California) the law gives
        you rights to access, correct, delete and move your information, to object to or restrict some uses, and to withdraw
        consent you gave. We do not sell your personal information or share it for advertising. If you think we have handled
        your information wrongly you can complain to your local data protection authority; we would like the chance to put it
        right first.
      </p>

      <h2 id="security">Security</h2>
      <p>
        The app talks to our servers over an encrypted connection (HTTPS). Passwords are stored as hashes. Files sit in private
        storage and are handed out only through short-lived links, after we check that they are yours. Each query for your
        data is tied to your signed-in session, and a session can be ended at once. No system is perfectly secure, so we also
        ask you to choose a strong password and to keep your phone locked.
      </p>

      <h2 id="children">Children</h2>
      <p>
        {BRAND} is for people aged 18 and over. It is not directed at children, and we do not knowingly collect information from
        anyone under 18. If you believe a child has an account, write to us and we will delete it. Our checks refuse sexual
        content involving anyone under 18, and an account that tries to make it is suspended.
      </p>

      <h2 id="transfers">Other countries</h2>
      <p>
        The companies above, and our own servers, may be in countries other than yours, including the United States. Where the
        law requires it, we rely on safeguards such as the standard contract clauses approved for sending information
        abroad.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        When we change this policy we change the date at the top of the page, and for an important change we also tell you in
        the app or by email.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions, requests or complaints about your information: <Mail subject={`${BRAND} privacy`} />, or by post to{" "}
        {OPERATOR_NAME}, {OPERATOR_ADDRESS}.
      </p>
    </LegalPage>
  );
}
