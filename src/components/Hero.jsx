"use client";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFloat from "@/components/ScrollFloat";
import ShinyText from "@/components/ShinyText";

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
      className={`relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-green-500 overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Scattered Dots Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 2 + 2) + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <div className="space-y-12">
          <ScrollReveal
            direction="up"
            delay={0.2}
            duration={0.8}
            distance={30}
            className="space-y-6"
          >
            <h1
              id="hero-heading"
              className="font-heading text-6xl font-bold leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              PEER-TO-PEER LOCAL
              <br />
              DELIVERY ANYWHERE,
              <br />
              <span className="text-white">ANYTIME.</span>
            </h1>
          </ScrollReveal>

          <ScrollFloat
            amplitude={8}
            frequency={2}
            delay={0.5}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl font-medium leading-relaxed text-white opacity-90 sm:text-2xl lg:text-2xl">
              RoadGoally connects you with friends, families, acquaintances, and anyone to deliver anything you need – quick, safe, and easy.
            </p>
          </ScrollFloat>

          <ScrollReveal
            direction="up"
            delay={0.8}
            duration={0.6}
            distance={20}
            className="flex flex-col gap-6 pt-8 sm:flex-row sm:gap-8 justify-center items-center"
          >
            <Button
              onClick={handleDownload}
              size="lg"
              className="group relative overflow-hidden bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:bg-gray-100 hover:shadow-3xl hover:scale-105 active:scale-95 border-0"
            >
              Download
            </Button>

            <Button
              onClick={handleLearnMore}
              variant="outline"
              size="lg"
              className="border-2 border-white bg-transparent text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:text-green-600 hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              Learn More
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