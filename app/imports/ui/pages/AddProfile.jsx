import React from 'react';
import { Profile, ProfileSchema } from '/imports/api/profile/profile';
import { Grid, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders the Page for adding a document. */
class AddProfile extends React.Component {

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
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { firstName, lastName, studyClass } = data;
    const owner = Meteor.user().username;
    Profile.insert({ firstName, lastName, studyClass, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <div className="inverted-section">
        <Grid centered container>
          <Grid.Column>
            <p className="text-align-center Nunito-font font-medium small-padding-top font-color-white">Add <span className="font-color-green">Profile</span></p>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ProfileSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <TextField name='studyClass'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value= {this.props.currentUser}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
        </div>
    );
  }
}

AddProfile.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const AddProfileContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(AddProfile);

export default withRouter(AddProfileContainer);
