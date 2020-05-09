import React from 'react';
import { Mentors, MentorSchema } from '/imports/api/mentor/mentor';
import { Grid, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SelectField from 'uniforms-semantic/SelectField';


/** Renders the Page for adding a document. */
class EditMentor extends React.Component {

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
    const { firstName, lastName, class1, class2, class3, _id } = data;
    Mentors.update(_id, { $set: { firstName, lastName, class1, class2, class3 } }, this.insertCallback());

  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <div className="inverted-section-OF">
          <Grid centered container>
            <Grid.Column>
              <p className="text-align-center Nunito-font font-medium
              small-padding-top font-color-white">Edit <span className="font-color-green">Mentor</span></p>
              <AutoForm model={this.props.doc} schema={MentorSchema} onSubmit={this.submit}>
                <Segment>
                  <TextField name='firstName'/>
                  <TextField name='lastName'/>
                  <SelectField name='class1'/>
                  <SelectField name='class2'/>
                  <SelectField name='class3'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeuser@foo.com'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

EditMentor.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Mentor');
  return {
    doc: Mentors.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditMentor);
