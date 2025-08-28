"use client";

import { useEffect, useRef } from "react";
import Particles from "react-tsparticles";

export default function BackgroundPattern({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.background = "#00A651";
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "#00A651" }}
    >
      <Particles
        id="background-particles"
        className="absolute inset-0 z-0"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
              },
              onHover: {
                enable: false,
              },
              resize: true,
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              enable: false,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: false,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            opacity: {
              value: 0.1,
            },
            shape: {
              type: "char",
              character: {
                value: "🚗",
                font: "Verdana",
                style: "",
                weight: "400",
                fill: true,
              },
            },
            size: {
              value: { min: 8, max: 16 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}