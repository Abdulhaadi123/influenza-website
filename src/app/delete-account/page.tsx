import type { Metadata } from "next";
import { LegalPage, Mail } from "@/components/legal/LegalPage";
import { APP_PACKAGE, BACKUP_RETENTION_DAYS, BRAND, DELETION_REPLY_DAYS, LEGAL_UPDATED, OPERATOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Delete your account | ${BRAND}`,
  description: `How to delete your ${BRAND} account and its data, in the app or by email, and what is removed.`,
};

/*
 * The page Google Play's "Data deletion" form points at. It names the app and the developer,
 * gives the steps, says what is deleted and what is kept and for how long, and offers a way to ask
 * without opening the app. The in-app steps match src/screens/SettingsScreen.js; what is deleted
 * matches backend/api/account/delete.js (files first, then the user row and everything cascading from it).
 */

export default function DeleteAccountPage() {
  return (
    <LegalPage
      title="Delete your account"
      updated={LEGAL_UPDATED}
      lead={
        <>
          This page is for the <strong>{BRAND}</strong> app (Android package <code>{APP_PACKAGE}</code>), run by{" "}
          <strong>{OPERATOR_NAME}</strong>. You can delete your account and everything in it yourself in about a minute, or ask
          us to do it if you can no longer open the app.
        </>
      }
    >
      <h2 id="in-app">Delete it in the app</h2>
      <ol className="steps">
        <li>Open {BRAND} and sign in.</li>
        <li>
          Tap <strong>Settings</strong> in the bottom bar.
        </li>
        <li>
          Scroll to the bottom and tap <strong>Delete Account</strong>.
        </li>
        <li>Enter your password and confirm. Your account is deleted at once, and every phone signed in to it is signed out.</li>
      </ol>
      <p>
        Forgotten your password? Use <strong>Forgot password</strong> on the sign-in screen to set a new one, then follow the
        steps above, or ask us by email below.
      </p>

      <h2 id="by-email">Or ask us by email</h2>
      <p>
        If you can’t open the app (a lost phone, or you’ve uninstalled it), write to <Mail subject="Delete my account" /> from
        the email address your account uses, with the subject “Delete my account”. We may ask you to confirm it is you. We will
        delete the account and reply to say it is done, within {DELETION_REPLY_DAYS} days.
      </p>

      <h2 id="what">What is deleted, and what is kept</h2>
      <div className="two">
        <div className="card">
          <h3>Deleted straight away</h3>
          <ul>
            <li>Your account: email, name and password.</li>
            <li>Every influencer you made.</li>
            <li>Every photo, video and audio file you uploaded, and every image and video made for you, with their previews.</li>
            <li>Your gallery, your queue of generations, your settings.</li>
            <li>Your credit balance and credit history. Credits left in the account are lost and cannot be refunded.</li>
            <li>The refused-text excerpts and reports connected to you.</li>
            <li>Your sign-in sessions, on every device.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Kept for a while</h3>
          <ul>
            <li>
              <strong>Database backups,</strong> for up to {BACKUP_RETENTION_DAYS} days, then they expire. We do not restore a
              deleted account from one.
            </li>
            <li>
              <strong>Purchase notices</strong> from RevenueCat (what was bought, the date, the store’s transaction number), no
              longer linked to you, for accounting and to catch fraud.
            </li>
            <li>
              <strong>A security log</strong> of what our staff did to an account, such as adding credits. It can mention your
              email address.
            </li>
          </ul>
        </div>
      </div>

      <div className="note">
        <p>
          <strong>Deleting is permanent.</strong> We cannot bring an account back. If you only want to remove some of your
          content, you can delete a single result from the gallery, or a whole influencer, inside the app, and keep your
          account.
        </p>
      </div>

      <p>
        Purchases are made through Google Play. Deleting your account does not refund them; refunds follow Google Play’s own
        rules. How we handle your information is in the <a href="/privacy/">Privacy Policy</a>.
      </p>
    </LegalPage>
  );
}
