import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Mentors } from '../../api/mentor/mentor.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName}`);
  Mentors.insert(data);
}

/** Initialize the collection if empty. */
if (Mentors.find().count() === 0) {
  if (Meteor.settings.defaultMentors) {
    console.log('Creating default mentors.');
    Meteor.settings.defaultMentors.map(data => addData(data));
  }
}

/** This subscription publishes REGARDLESS of user */
Meteor.publish('Mentor', function publish() {
  return Mentors.find();
});


/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('MentorAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Mentors.find();
  }
  return this.ready();
});
