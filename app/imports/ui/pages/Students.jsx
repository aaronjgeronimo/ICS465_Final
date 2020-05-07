import React from 'react';
import { Card, Container, Header, Loader, Divider } from 'semantic-ui-react';
import { Profile } from '/imports/api/profile/profile';
import PropTypes from 'prop-types';
import StudentCard from '/imports/ui/components/StudentCard';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class Students extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const divStyle = { paddingTop: '15px', paddingBottom: '20px' };
    return (
        <div style={divStyle}>
          <Divider hidden />
          <Header as="h2" textAlign="center">Maybe youd prefer studying in a group? </Header>
          <p className='text-align-center font-Small Nunito-font'>
            Here is a list of students that are also looking for help in the same class as you
          </p>
          <Container>
            <Header as="h2" textAlign="center" inverted>List Contacts</Header>
            <Card.Group>
              {this.props.student.map((student) => <StudentCard key={student._id} student={student}/>)}
            </Card.Group>
            <Divider hidden />
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Students.propTypes = {
  student: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profile');
  return {
    student: Profile.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Students);
