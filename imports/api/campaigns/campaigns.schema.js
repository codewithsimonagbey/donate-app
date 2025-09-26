import SimpleSchema from 'simpl-schema';

// Lenient http(s) URL guard. (Swap to stricter later if you like.)
const httpUrlRegex = /^https?:\/\/\S+$/i;

const CampaignSchema = new SimpleSchema({
  title: { type: String, min: 3, max: 120 },
  description: { type: String, optional: true, max: 5000 },
  goal: { type: Number, min: 1 },
  raised: { type: Number, min: 0, defaultValue: 0 },
  image: { type: String, regEx: httpUrlRegex }, // ← no SimpleSchema.RegEx.Url
  ownerId: { type: String, optional: true },
  createdAt: { type: Date, defaultValue: () => new Date() },
  updatedAt: { type: Date, optional: true },
});

export default CampaignSchema;
