import type { Metadata } from "next";
import { LegalPage, Mail } from "@/components/legal/LegalPage";
import { APP_PACKAGE, BRAND, GOVERNING_LAW, LEGAL_UPDATED, OPERATOR_ADDRESS, OPERATOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of Use | ${BRAND}`,
  description: `The rules for using ${BRAND}: your account, what you may create, credits and purchases.`,
};

/*
 * Written from how the app works: sign-up with a confirmed email, credits bought as one-time Google Play packs that
 * never expire and come back when a generation fails, automatic moderation with strikes that can suspend an account,
 * and an 18+ audience (the app makes realistic pictures of people). Keep it in step with src/lib/site.ts and the
 * Privacy Policy when any of that changes.
 */

const SECTIONS: [string, string][] = [
  ["agree", "Agreeing to these terms"],
  ["account", "Your account"],
  ["ai", "AI-made results"],
  ["content", "Your content"],
  ["rules", "What you must not do"],
  ["enforcement", "Checks, reports and suspension"],
  ["credits", "Credits and purchases"],
  ["ours", "What belongs to us"],
  ["service", "The service, and changes to it"],
  ["liability", "Our responsibility"],
  ["ending", "Ending your use"],
  ["law", "Law that applies"],
  ["changes", "Changes to these terms"],
  ["contact", "Contact"],
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated={LEGAL_UPDATED}
      lead={
        <>
          These are the rules for using {BRAND}, the Android app (package <code>{APP_PACKAGE}</code>) run by{" "}
          <strong>{OPERATOR_NAME}</strong> (“we”, “us”). Please read them. By creating an account or using the app you agree to
          them and to our <a href="/privacy/">Privacy Policy</a>.
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

      <h2 id="agree">Agreeing to these terms</h2>
      <p>
        You must be <strong>18 or older</strong> to use {BRAND}, and able to enter a binding agreement where you live. If you
        do not agree to these terms, do not use the app.
      </p>

      <h2 id="account">Your account</h2>
      <ul>
        <li>Give a real email address that you can read, and keep your details correct. New accounts must confirm that address before they can sign in.</li>
        <li>Keep your password secret and your phone locked. You are responsible for what happens under your account. Tell us at once if you think someone else has got in.</li>
        <li>One account is for one person. Do not sell, share or hand over your account.</li>
      </ul>

      <h2 id="ai">AI-made results</h2>
      <p>
        {BRAND} makes images and videos with artificial intelligence models run by other companies. Results can be wrong,
        odd, or different each time, and can look like real people or like other works by coincidence. We do not promise that
        a result will match what you pictured, that it is unique, or that it is fit for a particular purpose. Check a result
        before you rely on it or publish it.
      </p>
      <p>
        If you publish AI-made pictures or videos, say so where the law or the platform you publish on requires it, and do not
        present them as real footage of a real person or event in a way that could mislead people.
      </p>

      <h2 id="content">Your content</h2>
      <p>
        “Your content” is what you type, upload and make with the app. You keep your rights in it. You give us permission to
        store it, process it, and send it to the services that help us run the app (they are listed in the{" "}
        <a href="/privacy/#share">Privacy Policy</a>), only so that we can provide the service to you and keep it safe.
      </p>
      <p>You promise that:</p>
      <ul>
        <li>you own your content or have the right to use it, including the right to upload every photo and clip;</li>
        <li>
          when a photo, video or voice shows a real person, <strong>that person has agreed</strong> to it being used this way;
          and
        </li>
        <li>your content, and what you make from it, does not break the law or the rules in the next section.</li>
      </ul>
      <p>
        As between you and us, you may use the results you make, subject to these terms, the law, and the terms of the AI
        providers. The law on who owns AI-made works differs from country to country, and a result may not be protected by
        copyright. We do not claim to own your results.
      </p>

      <h2 id="rules">What you must not do</h2>
      <ul>
        <li><strong>Anything sexual involving a person under 18.</strong> This is always refused and the account is suspended.</li>
        <li>Explicit sexual content, or sexual content made from a real person’s photo or voice.</li>
        <li>Making a real person appear to say or do something they did not, to deceive, defame, harass, blackmail or impersonate them, or to commit fraud.</li>
        <li>Content that is hateful toward people for who they are, that threatens or encourages violence, that shows graphic gore, or that promotes self-harm.</li>
        <li>Anything illegal, or that infringes someone’s copyright, trademark, privacy or other rights.</li>
        <li>Trying to get around our checks, for example by disguising a request, or by sending a refused one again and again.</li>
        <li>Attacking, overloading or probing the app or its servers, copying it, taking it apart, or using bots or scripts to use it.</li>
        <li>Reselling credits or results as a service of your own, or using the app to build a competing product.</li>
      </ul>

      <h2 id="enforcement">Checks, reports and suspension</h2>
      <p>
        Text and files are checked automatically before they are sent to be made into something, and results are checked when
        they come back. A request that fails a check is refused and nothing is made. Content our checks flag, or that someone
        reports, can be reviewed by our team and removed.
      </p>
      <p>
        Repeated refusals suspend an account, and a request that involves a minor suspends it at once. We may also suspend or
        close an account that breaks these terms or the law, or that puts others or the service at risk. If you think a
        suspension is a mistake, write to us. If you see something that should not be there, use <strong>Report</strong> on
        the result in the gallery.
      </p>

      <h2 id="credits">Credits and purchases</h2>
      <ul>
        <li>Making an image or a video uses <strong>credits</strong>. The app shows how many a generation will cost before you start it. Costs depend on the model and, for video, the length, and can change.</li>
        <li>You buy credits in packs through <strong>Google Play</strong>. Each pack is a one-time purchase, not a subscription. Google Play shows the price in your currency before you pay, and its terms apply to the payment.</li>
        <li>Credits do not expire. They have no cash value, cannot be transferred or exchanged for money, and belong to one account.</li>
        <li>Credits are set aside when a generation starts and are given back if it fails or is blocked. Credits spent on a result that we later remove because it broke these terms are not returned.</li>
        <li>We do not refund purchases ourselves, except where the law requires it. Refunds follow Google Play’s rules. If Google refunds a purchase, we remove those credits from the account.</li>
        <li>If we ever close the app, we will give notice and an unused balance will be handled as the law requires.</li>
      </ul>

      <h2 id="ours">What belongs to us</h2>
      <p>
        The app, its design, name, logo and software belong to {OPERATOR_NAME} or its licensors. These terms give you the right
        to use the app, not to own any of it.
      </p>

      <h2 id="service">The service, and changes to it</h2>
      <p>
        We work to keep the app available, but it depends on other companies’ services and can be slow, change, or be down. We
        may add, change or remove features and models, and may stop the service, with notice where we can.
      </p>

      <h2 id="liability">Our responsibility</h2>
      <p>
        The app is provided “as is”. As far as the law allows, we are not responsible for indirect or consequential loss, for
        lost profit or data, or for what you do with a result, and our total responsibility to you for any claim is limited to
        what you paid us in the 12 months before it. Nothing in these terms limits liability that cannot be limited by law
        (for example for fraud or for death or personal injury caused by negligence), or your rights as a consumer where you
        live.
      </p>
      <p>
        You are responsible for your content and for how you use the results. If a claim is made against us because of your
        content or because you broke these terms, you will help us deal with it and, as far as the law allows, cover our
        reasonable costs.
      </p>

      <h2 id="ending">Ending your use</h2>
      <p>
        You can stop at any time by deleting your account (<a href="/delete-account/">how</a>). We can suspend or close your
        account as described above. What was meant to survive the end of these terms, such as the rules on your content and our
        responsibility, does.
      </p>

      <h2 id="law">Law that applies</h2>
      <p>
        These terms are governed by the law of {GOVERNING_LAW}. If you are a consumer, you also keep the protection of the
        mandatory laws of the place where you live, and you may bring a claim in the courts there.
      </p>

      <h2 id="changes">Changes to these terms</h2>
      <p>
        We may change these terms. When we do, we change the date at the top, and for an important change we tell you in the
        app or by email. If you keep using the app after a change, you accept it; if you do not, you can delete your account.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about these terms: <Mail subject={`${BRAND} terms`} />, or by post to {OPERATOR_NAME}, {OPERATOR_ADDRESS}.
      </p>
    </LegalPage>
  );
}
