import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Calendar } from '../../api/Calendar/Calendar.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.MondayAvailability} `);
  Calendar.insert(data);
}

/** Initialize the collection if empty. */
if (Calendar.find().count() === 0) {
  if (Meteor.settings.defaultCalendar) {
    console.log('Creating default Calendar.');
    Meteor.settings.defaultCalendar.map(data => addData(data));
  }
}

Meteor.publish('Calendar', function publish() {
  if (this.userId) {
    return Calendar.find({});
  }
  return this.ready();
});
/**
/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin.
Meteor.publish('Calendar', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Calendar.find();
  }
  return this.ready();
});
*/