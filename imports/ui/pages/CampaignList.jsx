import React from 'react';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import Campaigns from '/imports/api/campaigns/campaigns.collection.js';
import CampaignCard from '/imports/ui/components/CampaignCard.jsx';

// Default fallback image (unsplash free image)
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80';

const CampaignList = () => {
  const isReady = useSubscribe('campaigns.all')();
  const campaigns = useTracker(
    () => Campaigns.find({}, { sort: { createdAt: -1 } }).fetch(),
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        All Campaigns
      </h1>

      {!isReady ? (
        <p className="text-[--color-muted] text-center">Loading…</p>
      ) : campaigns.length === 0 ? (
        <p className="text-[--color-muted] text-center">No campaigns yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <CampaignCard
              key={c._id}
              campaign={{
                ...c,
                image: c.image || FALLBACK_IMAGE, // ✅ fallback image
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;
