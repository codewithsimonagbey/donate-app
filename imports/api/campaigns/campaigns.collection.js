import { Mongo } from 'meteor/mongo';
import CampaignSchema from './campaigns.schema.js';

const Campaigns = new Mongo.Collection('campaigns');

// Attach schema (requires aldeed:collection2)
Campaigns.attachSchema(CampaignSchema);

export default Campaigns;
