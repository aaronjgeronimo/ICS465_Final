import React from 'react';
import { Header, Icon, Segment, List, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Mentors } from '/imports/api/mentor/mentor';
import { withRouter, NavLink } from 'react-router-dom';


/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class MentorItemAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  /* When the delete button is clicked, remove the corresponding item from the collection. */
  onClick() {
    Mentors.remove(this.props.mentor._id, this.deleteCallback);
  }

  render() {
    return (
        /*
        11/25/18
        Fit this back into AdminMentorList later
           {this.props.mentors.map((mentor) => <MentorItemAdmin key={mentor._id} mentor={mentor} />)}
         */
      <Segment>
        <Header as='h1'><Icon name='user'/>{this.props.mentor.firstName} {this.props.mentor.lastName}</Header>
        <Header as='h2'><Icon name='book'/>Subjects</Header>
        <List bulleted relaxed>
          <List.Item>{this.props.mentor.class1}</List.Item>
          <List.Item>{this.props.mentor.class2}</List.Item>
          <List.Item>{this.props.mentor.class3}</List.Item>
        </List>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Button basic onClick={this.onClick}>Delete</Button>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Button basic as={NavLink} exact to={`/editmentor/${this.props.mentor._id}`} key='editmentor'>Edit</Button>
        ) : ''}
      </Segment>
    );
  }
}

/** Require a document to be passed to this component. */
MentorItemAdmin.propTypes = {
  mentor: PropTypes.object.isRequired,
};

export default withRouter(MentorItemAdmin);
