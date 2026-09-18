"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOMEPAGE_IMAGES } from "@/lib/site-assets";

gsap.registerPlugin(ScrollTrigger);

export default function PropertyThesisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Image: clip-path reveal from bottom
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Gold rule reveal
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Text stagger reveal
      const textEls = textRef.current?.querySelectorAll(".reveal-text");
      if (textEls?.length) {
        gsap.fromTo(
          textEls,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="thesis-heading"
      className="relative overflow-hidden bg-[var(--surface-section-alt)]"
    >
      <div className="container-wide py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Image — spans left 7 of 12 */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative overflow-hidden"
              style={{ aspectRatio: "3/2" }}
            >
              <Image
                src={HOMEPAGE_IMAGES.exteriorMaster}
                alt="Architectural exterior — stone, glass and walnut in harmony, Kolkata"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
                priority={false}
              />
            </div>
          </div>

          {/* Text — spans right 5 of 12 */}
          <div
            ref={textRef}
            className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6"
          >
            {/* Gold rule */}
            <div
              ref={lineRef}
              className="h-px w-16"
              style={{
                backgroundColor: "var(--color-gold-400)",
                transformOrigin: "left center",
              }}
              aria-hidden="true"
            />

            <p className="reveal-text text-label text-[var(--color-stone-500)] tracking-[0.16em]">
              The Residence
            </p>

            <h2
              id="thesis-heading"
              className="reveal-text text-section text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 500 }}
            >
              A property is more<br />than its floor plan.
            </h2>

            <div className="reveal-text w-12 h-px bg-[var(--color-stone-200)]" aria-hidden="true" />

            <p className="reveal-text text-body-lg text-[var(--text-secondary)] leading-relaxed">
              It is the quality of morning light through floor-to-ceiling glass.
              The proportion of a room that makes it feel inhabitable.
              The view that becomes part of how you live.
            </p>

            <p className="reveal-text text-body text-[var(--text-secondary)] leading-relaxed">
              Sky-High Properties selects only what is genuinely worth living in —
              properties where the architecture, position and finish are all
              considered together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
