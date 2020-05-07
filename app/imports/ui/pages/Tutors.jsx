import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { Mentors } from '/imports/api/mentor/mentor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import CalendarItem from '../components/CalendarItem';
import { Calendar } from '/imports/api/Calendar/Calendar';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Tutors extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        /*
        11/15/18 - Jeff
        Implementing layout for mentor list display
        Nothing Changed yet
        Only changed mentor references and imported Mentors schema from /imports/api/mentor/mentor
        {this.props.mentors.map(mentor => <MentorItemAdmin key={mentor._id} mentor={mentor} />)}
        */
        <div className="container">
          <div className="ui center aligned container">
            {this.props.Calendar.map((calendar) => <CalendarItem key={calendar._id} Calendar={calendar}/>)}
          </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Tutors.propTypes = {
  mentors: PropTypes.array.isRequired,
  student: PropTypes.array.isRequired,
  Calendar: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Mentor');
  const subscription3 = Meteor.subscribe('Calendar');
  return {
    mentors: Mentors.find({}).fetch(),
    Calendar: Calendar.find({}).fetch(),
    ready: subscription.ready() && subscription3.ready(),
  };
})(Tutors);
