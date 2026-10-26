import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import RevealOnScroll from "@/components/RevealOnScroll";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Create from "@/components/sections/Create";
import Looks from "@/components/sections/Looks";
import Promote from "@/components/sections/Promote";
import Motion from "@/components/sections/Motion";
import InsideApp from "@/components/sections/InsideApp";
import { Faq, Footer, GetApp, HowItWorks, Manifesto, Packs, Trust, UseCases } from "@/components/sections/BrandPage";

/**
 * One scroll, one story: the influencer, then the app's three features as
 * pinned chapters, the real app, and the brand page.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Create />
        <Looks />
        <Promote />
        <Motion />
        <InsideApp />
        <Manifesto />
        <UseCases />
        <HowItWorks />
        <Packs />
        <Trust />
        <Faq />
        <GetApp />
      </main>
      <Footer />
      <RevealOnScroll />
    </SmoothScroll>
  );
}
