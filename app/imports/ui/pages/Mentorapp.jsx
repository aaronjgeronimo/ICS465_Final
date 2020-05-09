import React from 'react';
import { Mentors, MentorSchema } from '/imports/api/mentor/mentor';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class Mentorapp extends React.Component {

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
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const {
      firstName,
      lastName,
      class1,
      class2,
      class3,
    } = data;
    const owner = Meteor.user().username;
    Mentors.insert({
      firstName,
      lastName,
      class1,
      class2,
      class3,
      owner,
    }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Divider hidden/>
            <Header as="h2" textAlign="center">Mentorship App</Header>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={MentorSchema} onSubmit={this.submit}>
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
    );
  }
}

export default Mentorapp;
