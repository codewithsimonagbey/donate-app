import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Campaigns from './campaigns.collection.js';
import CampaignSchema from './campaigns.schema.js';

// Helper: validate/clean on insert payload
const validateInsert = (payload) => {
  // allow description optional at method-level too
  const schemaForInsert = CampaignSchema.pick('title', 'description', 'goal', 'image');
  const doc = schemaForInsert.clean(payload, { removeEmptyStrings: true, trimStrings: true });
  schemaForInsert.validate(doc);
  return doc;
};

// Helper: validate/clean $set modifier on update
const validateUpdateSet = (setObj) => {
  const schemaForUpdate = CampaignSchema.pick(
    'title', 'description', 'goal', 'image', 'raised'
  );
  const cleaned = schemaForUpdate.clean(setObj, { removeEmptyStrings: true, trimStrings: true });
  schemaForUpdate.validate(cleaned);
  return cleaned;
};

const createCampaign = function (payload) {
  check(payload, {
    title: String,
    description: Match.Optional(String),
    goal: Number,
    image: String,
  });
  if (!this.userId) throw new Meteor.Error('not-authorized');

  const doc = validateInsert(payload);

  const _id = Campaigns.insert({
    ...doc,
    raised: 0,
    ownerId: this.userId,
    createdAt: new Date(),
  });
  return { _id };
};

const updateCampaign = function ({ _id, modifier }) {
  check(_id, String);
  check(modifier, Object);
  if (!this.userId) throw new Meteor.Error('not-authorized');

  const $set = validateUpdateSet({ ...(modifier.$set || {}) });
  $set.updatedAt = new Date();

  Campaigns.update({ _id }, { ...modifier, $set });
  return { _id };
};

const removeCampaign = function (_id) {
  check(_id, String);
  if (!this.userId) throw new Meteor.Error('not-authorized');

  Campaigns.remove({ _id });
  return { _id };
};

Meteor.methods({
  'campaigns.create': createCampaign,
  'campaigns.update': updateCampaign,
  'campaigns.remove': removeCampaign,
});

export { createCampaign, updateCampaign, removeCampaign };
