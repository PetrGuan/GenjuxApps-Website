import { NextIntlClientProvider } from "next-intl";
import FeatureGrid from "@/components/bebilog/components/FeatureGrid";
import FeatureSection from "@/components/bebilog/components/FeatureSection";
import Footer from "@/components/bebilog/components/Footer";
import FooterCTA from "@/components/bebilog/components/FooterCTA";
import Hero from "@/components/bebilog/components/Hero";
import MidCTA from "@/components/bebilog/components/MidCTA";
import Nav from "@/components/bebilog/components/Nav";
import Privacy from "@/components/bebilog/components/Privacy";
import Pricing from "@/components/bebilog/components/Pricing";
import StickyCTA from "@/components/bebilog/components/StickyCTA";
import BabyFoodHub from "@/components/bebilog/features/BabyFoodHub";
import GrowthChart from "@/components/bebilog/features/GrowthChart";
import InsightsViz from "@/components/bebilog/features/InsightsViz";
import PredictionTimeline from "@/components/bebilog/features/PredictionTimeline";
import SmartLogViz from "@/components/bebilog/features/SmartLogViz";
import TrackingGrid from "@/components/bebilog/features/TrackingGrid";
import VaccineSchedule from "@/components/bebilog/features/VaccineSchedule";
import { bebilogMessages, FEATURES, type BebilogLocale } from "@/components/bebilog/data";

const featureVisuals = {
  smartLog: SmartLogViz,
  tracking: TrackingGrid,
  insights: InsightsViz,
  predictions: PredictionTimeline,
  growth: GrowthChart,
  vaccine: VaccineSchedule,
  food: BabyFoodHub,
} as const;

type BebilogSiteProps = {
  locale: BebilogLocale;
};

export default function BebilogSite({ locale }: BebilogSiteProps) {
  return (
    <div className="bebilog-site" lang={locale}>
      <NextIntlClientProvider locale={locale} messages={bebilogMessages[locale]}>
        <main className="min-h-screen bg-[#0a0a0a]">
          <Nav />
          <Hero />
          {FEATURES.map((feature, index) => {
            const Visual = featureVisuals[feature.key];

            return (
              <div key={feature.key}>
                <FeatureSection feature={feature}>
                  <Visual />
                </FeatureSection>
                {index === 3 ? <MidCTA /> : null}
              </div>
            );
          })}
          <FeatureGrid />
          <Privacy />
          <Pricing />
          <FooterCTA />
          <Footer />
          <StickyCTA />
        </main>
      </NextIntlClientProvider>
    </div>
  );
}
