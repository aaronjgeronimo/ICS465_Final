import React from 'react';
import { Grid, Card, Container, List, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class MentorCard extends React.Component {
  render() {
    return (
        /*
        11/25/18
        Fit this back into AdminMentorList later
           {this.props.mentors.map((mentor) => <MentorItemAdmin key={mentor._id} mentor={mentor} />)}
         */
        <Grid.Column>
          <Card className='green-outline'>
            <Card.Header className='mentor-card-header font-smaller font-color-white'>
              <Icon name='user'/>{this.props.mentor.firstName} {this.props.mentor.lastName}
            </Card.Header>
            <Card.Content>
              <Container>
                <Grid>

                  <Grid.Column className='text-align-center mentor-card-content font-color-white'>
                    <Icon name='book'/>
                    <List>
                      <List.Item>{this.props.mentor.class1}</List.Item>
                      <List.Item>{this.props.mentor.class2}</List.Item>
                      <List.Item>{this.props.mentor.class3}</List.Item>
                    </List>
                  </Grid.Column>
                </Grid>
              </Container>
            </Card.Content>
          </Card>
        </Grid.Column>
    );
  }
}

/** Require a document to be passed to this component. */
MentorCard.propTypes = {
  mentor: PropTypes.object.isRequired,
};

export default MentorCard;
