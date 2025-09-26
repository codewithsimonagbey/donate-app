import React, { useMemo, useState } from 'react';
import Button from '/imports/ui/components/Button.jsx';
import CampaignCard from '/imports/ui/components/CampaignCard.jsx';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80';

const LandingPage = () => {
  const [heroError, setHeroError] = useState(false);

  // Prefer this hero; if it fails, we switch to FALLBACK_IMAGE
  const heroSrc = useMemo(() => {
    if (heroError) return FALLBACK_IMAGE;
    return 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80';
  }, [heroError]);

  const campaigns = [
    {
      id: '1',
      title: 'Help Sarah Beat Cancer',
      image:
        'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80',
      goal: 10000,
      raised: 6200,
    },
    {
      id: '2',
      title: 'Support Clean Water in Ghana',
      image:
        'https://images.unsplash.com/photo-1503437313881-503a91226422?auto=format&fit=crop&w=1200&q=80',
      goal: 15000,
      raised: 8700,
    },
    {
      id: '3',
      title: 'Rebuild Homes After Flood',
      image:
        'https://images.unsplash.com/photo-1509817316-66b53a2f0f4d?auto=format&fit=crop&w=1200&q=80',
      goal: 20000,
      raised: 13400,
    },
  ];

  return (
    <div className="bg-[--color-bg] text-[--color-fg]">
      {/* ───────────── HERO ───────────── */}
      <section className="relative isolate overflow-hidden">
        {/* Responsive image with srcset + sizes and robust fallback */}
        <picture>
          <source
            type="image/webp"
            srcSet={`
              ${heroSrc}&fm=webp 800w,
              ${heroSrc}&fm=webp 1200w,
              ${heroSrc}&fm=webp 1600w,
              ${heroSrc}&fm=webp 2000w
            `}
            sizes="100vw"
          />
          <img
            src={heroSrc}
            srcSet={`
              ${heroSrc} 800w,
              ${heroSrc} 1200w,
              ${heroSrc} 1600w,
              ${heroSrc} 2000w
            `}
            sizes="100vw"
            alt="People supporting a fundraising campaign"
            className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh] object-cover object-center
                       brightness-90 dark:brightness-[.75] motion-safe:transition-[filter] motion-safe:duration-500"
            decoding="async"
            loading="eager"
            fetchpriority="high"
            referrerPolicy="no-referrer"
            onError={() => setHeroError(true)}
          />
        </picture>

        {/* Adaptive gradient overlay for readability */}
        <div
          className="pointer-events-none absolute inset-0
                     bg-gradient-to-t from-[--color-bg]/80 via-[--color-bg]/30 to-transparent
                     dark:from-black/70 dark:via-black/30 dark:to-transparent"
          aria-hidden="true"
        />

        {/* Centered hero content */}
        <div className="absolute inset-0 grid place-items-center px-4 sm:px-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold
                           text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.4)]">
              Make a Difference Today
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-100/95">
              Join thousands helping others through our secure and transparent crowdfunding platform.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              <Button size="md">Start a Campaign</Button>
              <Button />Donate Now
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FEATURED ───────────── */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10">
          Featured Campaigns
        </h2>

        <div className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <CampaignCard
              key={c.id}
              campaign={{
                ...c,
                // Guarantee each card has an image
                image: (c.image && c.image.trim()) || FALLBACK_IMAGE,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
