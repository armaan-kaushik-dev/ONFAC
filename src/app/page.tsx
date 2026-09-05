import Hero from '@/components/hero/Hero';
import Ticker from '@/components/sections/Ticker';
import Story from '@/components/sections/Story';
import Collection from '@/components/sections/Collection';
import Why from '@/components/sections/Why';
import SocialStrip from '@/components/sections/SocialStrip';
import Location from '@/components/sections/Location';
import FooterCta from '@/components/sections/FooterCta';

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Story />
      <Collection />
      <Why />
      <SocialStrip />
      <Location />
      <FooterCta />
    </main>
  );
}
