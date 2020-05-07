import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Profile } from '/imports/api/profile/profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentCard extends React.Component {
  returnProfiles(userId) {
    if (Profile.findOne({ owner: userId }) === '') {
      return 'xxxx';
    }
    return Profile.findOne({ owner: userId })._id;
  }
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.student.firstName} {this.props.student.lastName}</Card.Header>
            <Card.Meta>{this.props.student.studyClass}</Card.Meta>
            <Button basic color='green' as={Link} icon='edit' content='View Profile'
                    to={`/myprofile/${this.returnProfiles(this.props.student.owner)}`}/>
          </Card.Content>
          <Card.Meta>owner:{this.props.student.owner}</Card.Meta>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudentCard);
