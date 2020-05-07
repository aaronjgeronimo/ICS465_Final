import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ClassList from '../pages/ClassList';
import Tutors from '../pages/Tutors';
import Students from '../pages/Students';
import EditProfile from '../pages/EditProfile';
import AddProfile from '../pages/AddProfile';
import EditMentor from '../pages/EditMentor';
import Statistics from '../pages/Statistics';
import Mentorapp from '../pages/Mentorapp';
import MyProfile from '../pages/MyProfile';
import Instruction from '../pages/Instruction';
import EditAvailability from '../pages/EditAvailability';
/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/classes" component={ClassList}/>
              <Route path="/tutors" component={Tutors}/>
              <Route path="/instruction" component={Instruction}/>
              <Route path="/myprofile/:_id" component={MyProfile}/>
              <ProtectedRoute path="/students" component={Students}/>
              <ProtectedRoute path="/list" component={ListStuff}/>
              <ProtectedRoute path="/add" component={AddStuff}/>
              <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
              <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
              <AdminProtectedRoute path="/stats" component={Statistics}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <ProtectedRoute path="/mentorapp" component={Mentorapp}/>
              <ProtectedRoute path="/editprofile/:_id" component={EditProfile}/>
              <ProtectedRoute path="/editavailability/:_id" component={EditAvailability}/>
              <ProtectedRoute path="/addprofile" component={AddProfile}/>
              <ProtectedRoute path="/editmentor/:_id" component={EditMentor}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
