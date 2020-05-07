import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Profile = new Mongo.Collection('Profile');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ProfileSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  studyClass: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Profile.attachSchema(ProfileSchema);

/** Make the collection and schema available to other code. */
export { Profile, ProfileSchema };
