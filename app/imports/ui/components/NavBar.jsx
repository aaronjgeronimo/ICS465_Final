import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Loader } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Calendar } from '/imports/api/Calendar/Calendar';
import { Profile } from '/imports/api/profile/profile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  returnProfile(userId) {
    if (Calendar.findOne({ owner: userId }) === '') {
      return 'xxxx';
    }
    return Calendar.findOne({ owner: userId })._id;
  }

  returnProfiles(userId) {
    if (Profile.findOne({ owner: userId }) === '') {
      return 'xxxx';
    }
    return Profile.findOne({ owner: userId })._id;
  }

  dropDownMenu() {
    if (this.props.currentUser === '') {
      return (
          <Dropdown text="Login" pointing="top right" icon={'user'}>
            <Dropdown.Menu>
              <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
              <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
            </Dropdown.Menu>
          </Dropdown>
      );
    }
    return (
        <div>
              <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item icon="archive" text="Mentorship Application" as={NavLink} exact to="/mentorapp"/>
                  <Dropdown.Item icon="user" text="My Profile" as={NavLink}
                                 exact to={`/myprofile/${this.returnProfiles(this.props.currentUser)}`}/>
                  <Dropdown.Item icon="user" text="Edit Profile" as={NavLink}
                                 exact to={`/editprofile/${this.returnProfiles(this.props.currentUser)}`}/>
                  <Dropdown.Item icon="user" text="Edit Availability" as={NavLink}
                                 exact to={`/editavailability/${this.returnProfile(this.props.currentUser)}`}/>
                  <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                </Dropdown.Menu>
              </Dropdown>
        </div>
    );
  }

  renderPage() {
    const menuStyle = { marginBottom: '0px' };
    return (
        <div>
          <Menu style={menuStyle} attached="top" borderless inverted>
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Image size='medium' src="/images/StudBudd2-transperent.png"/>
            </Menu.Item>
            <Menu.Item as={NavLink} activeClassName="active" exact to='/classes'
                       key='classes' className='font-kindaSmall Nunito-font'>Classes</Menu.Item>
            <Menu.Item as={NavLink} activeClassName="active" exact to='/instruction' key='instruction'
                       className='font-kindaSmall Nunito-font'>Instructions</Menu.Item>
            {this.props.currentUser ? (
                [<Menu.Item as={NavLink} activeClassName="active"
                            exact to="/students" key='add'
                            className='font-kindaSmall Nunito-font'>Students</Menu.Item>]
            ) : ''}
            {this.props.currentUser ? (
                [<Menu.Item as={NavLink} activeClassName="active" exact to='/tutors'
                       key='tutors' className='font-kindaSmall Nunito-font'>Availabilities</Menu.Item>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Menu.Item as={NavLink} activeClassName="active" exact to="/stats" key='admin'
                           className='font-kindaSmall Nunito-font'>User Statistics</Menu.Item>
            ) : ''}
            <Menu.Item position="right">
              {this.dropDownMenu()} </Menu.Item>
          </Menu>
        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  ready: PropTypes.bool,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  ready: Meteor.subscribe('Calendar').ready() && Meteor.subscribe('Profile').ready(),
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
