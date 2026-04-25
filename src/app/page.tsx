import { Hero } from '@/components/sections/hero';
import { ScrollVideo } from '@/components/sections/scroll-video';
import { PortfolioReel } from '@/components/sections/portfolio-reel';
import { Services } from '@/components/sections/services';
import { AboutTeaser } from '@/components/sections/about-teaser';
import { Testimonials } from '@/components/sections/testimonials';
import { ContactCTA } from '@/components/sections/contact-cta';
import { ColorMorphWatcher } from '@/components/common/color-morph-watcher';

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioReel />
      {/* <ScrollVideo /> */}
      <Services />
      <AboutTeaser />
      <Testimonials />
      <ContactCTA />
      <ColorMorphWatcher />
    </>
  );
}
