import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Calendar = new Mongo.Collection('Calendar');

/** Create a schema to constrain the structure of documents associated with this collection. */
const CalendarSchema = new SimpleSchema({
  MondayAvailability: {
    type: String,
    allowedValues: ['Unavailable', 'Available'],
    defaultValue: 'Unavailable',
  },
  TuesdayAvailability: {
    type: String,
    allowedValues: ['Unavailable', 'Available'],
    defaultValue: 'Unavailable',
  },
  WednesdayAvailability: {
    type: String,
    allowedValues: ['Unavailable', 'Available'],
    defaultValue: 'Unavailable',
  },
  ThursdayAvailability: {
    type: String,
    allowedValues: ['Unavailable', 'Available'],
    defaultValue: 'Unavailable',
  },
  FridayAvailability: {
    type: String,
    allowedValues: ['Unavailable', 'Available'],
    defaultValue: 'Unavailable',
  },
  SaturdayAvailability: {
    type: String,
    allowedValues: ['Unavailable', 'Available'],
    defaultValue: 'Unavailable',
  },
  SundayAvailability: {
    type: String,
    allowedValues: ['Unavailable', 'Available'],
    defaultValue: 'Unavailable',
  },
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Calendar.attachSchema(CalendarSchema);

/** Make the collection and schema available to other code. */
export { Calendar, CalendarSchema };
