import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Mentors = new Mongo.Collection('Mentors');

/** Create a schema to constrain the structure of documents associated with this collection. */
const MentorSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  class1: {
    type: String,
    allowedValues: ['Physics', 'Chemistry', 'Biology', 'Mechanical', 'Civil',
      'Electrical', 'Computer', 'Software Engineering', 'Math', 'Psychology', 'Anthropology',
      'Sociology', 'Political Science', 'Economics', 'Philosophy', 'History',
      'English', 'Japanese', 'Korean', 'Mandarin', 'Spanish', 'German', 'Russian',
      'Religion', 'Law', 'Drawing', 'Painting', 'Poetry', 'None'],
    defaultValue: 'None',
  },
  class2: {
    type: String,
    allowedValues: ['Physics', 'Chemistry', 'Biology', 'Mechanical', 'Civil',
      'Electrical', 'Computer', 'Software Engineering', 'Math', 'Psychology', 'Anthropology',
      'Sociology', 'Political Science', 'Economics', 'Philosophy', 'History',
      'English', 'Japanese', 'Korean', 'Mandarin', 'Spanish', 'German', 'Russian',
      'Religion', 'Law', 'Drawing', 'Painting', 'Poetry', 'None'],
    defaultValue: 'None',
  },
  class3: {
    type: String,
    allowedValues: ['Physics', 'Chemistry', 'Biology', 'Mechanical', 'Civil',
      'Electrical', 'Computer', 'Software Engineering', 'Math', 'Psychology', 'Anthropology',
      'Sociology', 'Political Science', 'Economics', 'Philosophy', 'History',
      'English', 'Japanese', 'Korean', 'Mandarin', 'Spanish', 'German', 'Russian',
      'Religion', 'Law', 'Drawing', 'Painting', 'Poetry', 'None'],
    defaultValue: 'None',
  },
  owner: String,
  /*
  can eventually include
  -----------------
  image: String,
   */
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Mentors.attachSchema(MentorSchema);

/** Make the collection and schema available to other code. */
export { Mentors, MentorSchema };
