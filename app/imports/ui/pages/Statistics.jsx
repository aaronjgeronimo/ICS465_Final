import React from 'react';
import { Divider, Grid, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class Statistics extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Divider hidden />
            <Header as="h2" textAlign="center">Statistics</Header>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Statistics.propTypes = {
  // stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Statistics');
  return {
    // stuffs: Stuffs.find({}).fetch(), Nothing to fetch yet
    ready: subscription.ready(),
  };
})(Statistics);
