import React from 'react';
import { Profile, ProfileSchema } from '/imports/api/profile/profile';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class EditProfile extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Edit failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Edit successful!' });
    }
  }

  /** On submit, insert the data. */
  submit(data) {
  const { firstName, lastName, studyClass, _id } = data;
  Profile.update(_id, { $set: { firstName, lastName, studyClass } }, this.insertCallback());
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <div className=" small-padding-bottom inverted-section-OF">
          <Grid centered container>
            <Grid.Column>
              <p className="text-align-center Nunito-font font-medium small-padding-top font-color-white">
                Edit <span className="font-color-green">Profile</span></p>
              <AutoForm schema={ProfileSchema} onSubmit={this.submit} model={this.props.doc}>
                <Segment>
                  <TextField name='firstName'/>
                  <TextField name='lastName'/>
                  <TextField name='studyClass'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value= "fakeuser@foo.com" />
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profile');
  return {
    doc: Profile.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);
// export default EditProfile;
