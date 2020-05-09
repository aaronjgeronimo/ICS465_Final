import React from 'react';
import { Calendar, CalendarSchema } from '/imports/api/Calendar/Calendar';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class EditAvailability extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const {
      MondayAvailability, TuesdayAvailability,
      WednesdayAvailability, ThursdayAvailability,
      FridayAvailability, SaturdayAvailability,
      SundayAvailability, _id } = data;
    Calendar.update(_id, {
      $set: {
        MondayAvailability, TuesdayAvailability,
        WednesdayAvailability, ThursdayAvailability,
        FridayAvailability, SaturdayAvailability,
        SundayAvailability } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <div className="small-padding-top more-padding-bottom inverted-section">
          <Grid centered container>
            <p className="text-align-center Nunito-font font-medium small-padding-top font-color-white">Edit <span className="font-color-green">Calendar</span></p>
            <AutoForm schema={CalendarSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <Grid centered container>
                  <Grid.Column>
                    <SelectField name='MondayAvailability'/>
                    <SelectField name='TuesdayAvailability'/>
                    <SelectField name='WednesdayAvailability'/>
                    <SelectField name='ThursdayAvailability'/>
                    <SelectField name='FridayAvailability'/>
                    <SelectField name='SaturdayAvailability'/>
                    <SelectField name='SundayAvailability'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                    <HiddenField name='owner' value='fakeuser@foo.com'/>
                  </Grid.Column>
                </Grid>
              </Segment>
            </AutoForm>
          </Grid>
        </div>
    );
  }
}

EditAvailability.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Calendar');
  return {
    doc: Calendar.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditAvailability);
// export default EditProfile;
