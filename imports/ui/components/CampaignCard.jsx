import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Progress from './Progress.jsx';
import Button from './Button.jsx';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80';

const currency = (n) => `$${(n ?? 0).toLocaleString()}`;

const CampaignCard = ({ campaign }) => {
  const [errored, setErrored] = useState(false);

  // Prefer campaign image; if missing or error, use fallback
  const imgSrc = useMemo(() => {
    const src = campaign?.image?.trim?.() || '';
    return errored || !src ? FALLBACK_IMAGE : src;
  }, [campaign?.image, errored]);

  const pct = campaign?.goal ? (campaign.raised / campaign.goal) * 100 : 0;

  return (
    <article
      className={
        'group relative flex flex-col overflow-hidden rounded-[--radius-xl] ' +
        'bg-[--color-card] shadow-sm ring-1 ring-[--color-card-border] ' +
        'hover:shadow-md transition'
      }
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[--color-card-border]">
        {/* Use picture for future extensibility; img handles onError fallback */}
        <picture>
          <source type="image/webp" srcSet={`${imgSrc}&fm=webp 1x`} />
          <img
            src={imgSrc}
            alt={campaign.title || 'Campaign image'}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            onError={() => setErrored(true)}
          />
        </picture>

        {/* Soft gradient for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />

        {/* Funded badge */}
        <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          {Math.round(pct)}% funded
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <h3 className="line-clamp-2 text-base/6 md:text-lg/7 font-semibold text-[--color-fg]">
          {campaign.title}
        </h3>

        {/* Progress + stats */}
        <div className="space-y-2">
          <Progress value={pct} srLabel={`${campaign.title} funding progress`} />
          <div className="flex items-baseline justify-between text-xs md:text-sm text-[--color-muted]">
            <span>
              <span className="font-semibold text-[--color-fg]">
                {currency(campaign.raised)}
              </span>{' '}
              raised
            </span>
            <span>goal {currency(campaign.goal)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-2 flex gap-2">
          <Button
            as={Link}
            to={`/campaigns/${campaign._id || campaign.id}`}
            size="sm"
            className="flex-1"
          >
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Donate
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CampaignCard;
