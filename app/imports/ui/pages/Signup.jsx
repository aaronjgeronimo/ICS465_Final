import React from 'react';
import { Calendar } from '/imports/api/Calendar/Calendar';
import { Profile } from '/imports/api/profile/profile';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  returnProfiles(userId) {
    return Profile.findOne({ owner: userId });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;
    const owner = email;
    const MondayAvailability = 'Unavailable';
    const TuesdayAvailability = 'Unavailable';
    const WednesdayAvailability = 'Unavailable';
    const ThursdayAvailability = 'Unavailable';
    const FridayAvailability = 'Unavailable';
    const SaturdayAvailability = 'Unavailable';
    const SundayAvailability = 'Unavailable';
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else
        if (!err) {
          // FlowRouter.go('/editprofile'); // or go(url)
          Calendar.insert({
            MondayAvailability, TuesdayAvailability,
            WednesdayAvailability, ThursdayAvailability,
            FridayAvailability, SaturdayAvailability,
            SundayAvailability, owner });
          Profile.insert({ firstName: email, lastName: email, studyClass: email, owner });
        }
    });
  }

  /** Display the signup form. */
  render() {
    return (
        <div className='inverted-section-with-padding'>
          <Container>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <p className="text-align-center Nunito-font font-medium font-color-white">
                  Sign up for a new
                  <span className="font-color-green"> Account</span>
                </p>
                <Form onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input
                        label="Email"
                        icon="user"
                        iconPosition="left"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <Form.Button content="Submit"/>
                    {this.props.currentUser ? (
                        <Message>
                          <span className=" font-small ">
                            Click <Link to={`/editprofile/${this.returnProfiles(this.props.currentUser)._id}`}
                                        className="font-color-green font-bold font-kindaSmall">
                            here</Link> to finish creating your profile
                          </span>
                        </Message>
                    ) : ''}
                  </Segment>
                </Form>
                <Message>
                  Already have an account? Login <Link to="/signin" className="font-color-green">here</Link>
                </Message>
                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Registration was not successful"
                        content={this.state.error}
                    />
                )}
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

Signup.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const SignupContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Signup);

export default withRouter(SignupContainer);
