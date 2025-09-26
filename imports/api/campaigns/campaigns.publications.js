import { Meteor } from 'meteor/meteor';
import Campaigns from './campaigns.collection.js';

// All campaigns (public fields)
const publishAllCampaigns = function () {
  return Campaigns.find({}, {
    fields: {
      title: 1,
      description: 1,
      goal: 1,
      raised: 1,
      image: 1,
      createdAt: 1,
    },
    sort: { createdAt: -1 },
    limit: 60,
  });
};

Meteor.publish('campaigns.all', publishAllCampaigns);

export default publishAllCampaigns;
