import type { Metadata } from "next";
import { LegalPage, Mail } from "@/components/legal/LegalPage";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: `Support | ${BRAND}`,
  description: `Get help with ${BRAND}: sign-in, credits and purchases, results, reporting content and deleting your account.`,
};

/* Answers match the app: credits are set aside when a generation starts and given back when it fails or is blocked
   (backend/api/_lib/billing.js), results can be reported from the gallery (src/components/ReportSheet.js). */

export default function SupportPage() {
  return (
    <LegalPage
      title="Support"
      lead={
        <>
          Something not working, or a question about your account? Write to <Mail subject={`${BRAND} support`} /> and tell us
          what happened. The answers below solve most things.
        </>
      }
    >
      <h2 id="contact">What to put in your email</h2>
      <p>
        The email address of your account, what you were doing, and what you saw instead (a screenshot helps). For a purchase,
        add the Google Play order number from your receipt (it starts with <code>GPA.</code>). Please do not send your password.
      </p>

      <h2 id="sign-in">I can’t sign in</h2>
      <ul>
        <li>Use <strong>Forgot password</strong> on the sign-in screen. We email you a link to choose a new one.</li>
        <li>A new account must confirm its email address first. Look for the message from us, including in spam, or ask the app to send it again.</li>
        <li>An account that broke the rules in the <a href="/terms/">Terms of Use</a> can be suspended. If you think that is a mistake, write to us.</li>
      </ul>

      <h2 id="credits">My credits didn’t arrive after I bought a pack</h2>
      <p>
        Credits normally appear soon after the purchase goes through. Close and reopen the app, and check your balance in{" "}
        <strong>Settings → Credits</strong>. If it is still wrong, email us with the order number and the email of your account and we will look it
        up and add what is missing.
      </p>

      <h2 id="failed">A generation failed or was blocked</h2>
      <p>
        Credits are set aside when a generation starts and are <strong>given back automatically</strong> if it fails or is
        blocked. If you do not see them back after a few minutes, write to us. Our automatic checks refuse some requests; a
        refused request costs you nothing.
      </p>

      <h2 id="report">Report a result</h2>
      <p>
        Open the result in the influencer’s <strong>Gallery</strong> and tap <strong>Report</strong>. Choose a reason and, if
        you like, add a note. You can also write to us.
      </p>

      <h2 id="refunds">Refunds</h2>
      <p>
        Credit packs are one-time purchases through Google Play, so refunds follow Google Play’s refund rules; you can ask
        Google from your Play Store order history. If Google refunds a purchase, we take those credits back out of the account.
        Credits spent on results that were made are not returned.
      </p>

      <h2 id="delete">Delete my account</h2>
      <p>
        You can do it in <strong>Settings → Delete Account</strong>, or by email. All the steps, and what is removed, are on the{" "}
        <a href="/delete-account/">Delete your account</a> page.
      </p>
    </LegalPage>
  );
}
