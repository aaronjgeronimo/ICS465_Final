import React from 'react';
import { Grid, Loader, Header, Button, Segment, Image } from 'semantic-ui-react';
import { Profile } from '/imports/api/profile/profile';
import { Calendar } from '/imports/api/Calendar/Calendar';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CalendarItem from '../components/CalendarItem';

/** Renders the Page for displaying a single document. */
class MyProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Grid as={Segment}>
                <Grid.Row columns='equal'>
                  <Grid.Column width={4}>
                    <Image src='../images/mrfullmoon.jpeg' size='medium'/>
                  </Grid.Column>
                  <Grid.Column>
                    <Grid>
                      <Grid.Row columns='equal'>
                        <Grid.Column textAlign='center'>
                          <Header as="h1" textAlign="center">
                            {this.props.doc.firstName} {this.props.doc.lastName}</Header>
                        </Grid.Column>
                        <Grid.Column textAlign='right' width={4}>
                          {(Meteor.user().username === this.props.doc.owner) ? (
                              <Button basic color='blue' as={Link} icon='edit' content='Edit Profile'
                                      to={`/editprofile/${this.props.doc._id}`}/>
                          ) : ''}
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={1}>
                        <Grid.Column>
                          <Segment textAlign='center'>
                            <Header.Subheader>Subject needed help in: {this.props.doc.studyClass}
                            </Header.Subheader>
                            <Grid celled relaxed>
                              <Grid.Row columns={2} relaxed='true'>
                                <div className="ui center aligned container">
                                  {this.props.Calendar.map((calendar) => <CalendarItem key={calendar._id} Calendar={calendar}/>)}
                                </div>
                                <Grid.Column>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Segment>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require the presence of a Profile document in the props object. Uniforms adds 'model' to the props, which we use. */
MyProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  profiles: PropTypes.array,
  Calender: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('Profile');
  const subscription2 = Meteor.subscribe('Calendar');
  // Get access to Profile documents.
  return {
    doc: Profile.findOne(documentId),
    Calendar: Calendar.find({ owner: Meteor.user() ? Meteor.user().username : '' }).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(MyProfile);
