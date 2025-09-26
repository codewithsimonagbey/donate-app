import React, { useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import Campaigns from '/imports/api/campaigns/campaigns.collection.js';
import Button from '/imports/ui/components/Button.jsx';
import Progress from '/imports/ui/components/Progress.jsx';

const fmt = (n) => `$${(n ?? 0).toLocaleString()}`;

const CampaignView = () => {
  const { id } = useParams();

  // (You can switch to a single-campaign publication later; this keeps your current 'campaigns.all')
  const isReady = useSubscribe('campaigns.all')();
  const campaign = useTracker(() => Campaigns.findOne(id), [id]);

  const pct = useMemo(() => {
    if (!campaign || !campaign.goal) return 0;
    const val = (campaign.raised / campaign.goal) * 100;
    return Math.min(100, Math.max(0, val));
  }, [campaign]);

  const onShare = useCallback(async () => {
    const shareData = {
      title: campaign?.title ?? 'HelpSomebody Campaign',
      text: 'Support this campaign on HelpSomebody',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard');
      }
    } catch {
      // user cancelled or clipboard denied; noop
    }
  }, [campaign]);

  const onDonate = useCallback(() => {
    // Wire to your payment flow/modal later
    alert('Donate flow coming soon');
  }, []);

  if (!isReady) {
    // Simple skeleton
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="h-72 w-full rounded-[--radius-xl] bg-[--color-card] animate-pulse" />
        <div className="mt-6 h-8 w-2/3 rounded bg-[--color-card] animate-pulse" />
        <div className="mt-3 h-4 w-full rounded bg-[--color-card] animate-pulse" />
        <div className="mt-2 h-4 w-5/6 rounded bg-[--color-card] animate-pulse" />
        <div className="mt-6 h-2 w-full rounded bg-[--color-card] animate-pulse" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Campaign not found</h1>
        <p className="text-[--color-muted] mb-6">It may have been removed or the link is incorrect.</p>
        <Button as={Link} to="/campaigns" size="md">Back to Campaigns</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Media */}
      <div className="relative overflow-hidden rounded-[--radius-xl]">
        <picture>
          <source
            type="image/webp"
            srcSet={`${campaign.image}&fm=webp 1x`}
          />
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-[42vh] sm:h-[56vh] object-cover object-center brightness-95 dark:brightness-[.85]"
            loading="eager"
            decoding="async"
          />
        </picture>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[--color-bg]/80 via-transparent to-transparent dark:from-black/60"
          aria-hidden="true"
        />
      </div>

      {/* Title & Description */}
      <div className="mt-6">
        <h1 className="text-2xl sm:text-3xl font-bold">{campaign.title}</h1>
        <p className="mt-2 text-[--color-muted] text-sm sm:text-base">
          {campaign.description || 'No description provided.'}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <Progress value={pct} srLabel={`${campaign.title} funding progress`} />
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-semibold text-[--color-fg]">{fmt(campaign.raised)}</span>
          <span className="opacity-60">/</span>
          <span>{fmt(campaign.goal)}</span>
          <span className="ml-auto text-[--color-muted]">{Math.round(pct)}% funded</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button size="md" className="sm:flex-[0_0_auto]" onClick={onDonate}>Donate</Button>
        <Button size="md" variant="subtle" className="sm:flex-[0_0_auto]" onClick={onShare}>
          Share
        </Button>
        <Button as={Link} to="/campaigns" size="md" variant="ghost" className="sm:ml-auto">
          Back
        </Button>
      </div>

      {/* Meta (optional) */}
      {campaign.createdAt && (
        <p className="mt-6 text-xs text-[--color-muted]">
          Created on {new Date(campaign.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default CampaignView;
