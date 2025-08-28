"use client";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/animation/ScrollReveal";
import ScrollFloat from "@/components/animation/ScrollFloat";
import ShinyText from "@/components/animation/ShinyText";

export default function Hero({ className = "", onOrderNow, onLearnMore }) {
  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      window.location.href = "/learn-more";
    }
  };

  const handleDownload = () => {
    window.location.href = "/download";
  };

  return (
    <section
      className={`relative flex min-h-[85vh] w-full flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8 ${className}`}
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-4xl space-y-8">
          <ScrollReveal
            direction="up"
            delay={0.2}
            duration={0.8}
            distance={30}
            className="space-y-4"
          >
            <h1
              id="hero-heading"
              className="font-heading text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Drive the Future
              <br />
              <span className="text-green-300">Today</span>
            </h1>
          </ScrollReveal>

          <ScrollFloat
            amplitude={8}
            frequency={2}
            delay={0.5}
            className="max-w-2xl"
          >
            <p className="text-lg font-medium leading-relaxed text-green-100 sm:text-xl lg:text-2xl">
              Experience the ultimate in electric vehicle technology with our revolutionary
              autonomous driving system and sustainable energy solutions.
            </p>
          </ScrollFloat>

          <ScrollReveal
            direction="up"
            delay={0.8}
            duration={0.6}
            distance={20}
            className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6"
          >
            <Button
              onClick={handleDownload}
              size="lg"
              className="group relative overflow-hidden bg-white text-green-800 shadow-2xl transition-all duration-300 hover:bg-green-50 hover:shadow-3xl hover:scale-105 active:scale-95"
            >
              <ShinyText className="text-lg font-semibold">
                Download Now
              </ShinyText>
            </Button>

            <Button
              onClick={handleLearnMore}
              variant="outline"
              size="lg"
              className="border-2 border-white bg-transparent text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-green-800 hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <span className="text-lg font-semibold">Learn More</span>
            </Button>
          </ScrollReveal>
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        Hero section loaded with call-to-action buttons for downloading and learning more
      </div>
    </section>
  );
}