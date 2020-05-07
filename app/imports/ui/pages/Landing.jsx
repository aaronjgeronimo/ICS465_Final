import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Accordion, Divider, Icon, Image, Container, Loader } from 'semantic-ui-react';
import { Mentors } from '/imports/api/mentor/mentor';
import { Profile } from '/imports/api/profile/profile';
import MentorCard from '/imports/ui/components/MentorCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import CalendarItem from '../components/CalendarItem';
import { Calendar } from '/imports/api/Calendar/Calendar';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { activeIndex } = this.state;
    return (
        <div>
          <div className="background-site">
            <div className="ui center aligned container container-width big-padding-bottom">
              <p className="Nunito-font font-large big-padding-top">
                <span className="font-bold font-color-white">Welcome to</span>
                <span className="font-bold font-color-green"> Stud</span>
                <span className="font-color-green">Budd</span>
                <p className="font-small font-color-white medium-padding-bottom">
                  <span className="font-bold font-color-lightgrey">P</span>eople
                  <span className="font-bold font-color-lightgrey"> H</span>ave
                  <span className="font-bold font-color-lightgrey"> Q</span>uestions,
                  <span className="font-bold font-color-lightgrey"> S</span>o
                  <span className="font-bold font-color-lightgrey"> H</span>elp
                  <span className="font-bold font-color-lightgrey"> T</span>hem
                  <span className="font-bold font-color-lightgrey"> P</span>lease.
                </p>
              </p>
              <div className="ui center aligned container small-padding-bottom">
                <span className="Nunito-font font-medium font-bold font-color-green">
                  Our Top Mentors
                </span>
              </div>
              <Grid centered container stackable columns={3}>
                {this.props.mentors.slice(0, 3).map(mentor => <MentorCard key={mentor._id} mentor={mentor}/>)}
              </Grid>
            </div>
          </div>
          <div>
            <div className="ui center aligned container">
              <Header/>
              <Grid container columns={2}>
                <Grid.Column>
                  <p className="Nunito-font font-medium text-align-right margin-bottom-minus-10"><span
                      className="font-bold">Why use Stud</span>Budd?</p>
                  <p className="text-align-right font-small">
                    <span className="font-bold">Develop</span> your Study Habits.
                    <br/>
                    <span className="font-bold">Strengthen</span> your knowledge.
                    <br/>
                    <span className="font-bold">Establish Connections</span> with classmates.
                    <br/>
                    <span className="font-bold">Get the Grade.</span>
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p className="Nunito-font font-medium text-align-left margin-bottom-minus-10">
                    <span className="font-bold font-large font-color-green">{this.props.student.length}</span> Students.
                    <br/>
                    <span className="font-bold font-large font-color-green">{this.props.mentors.length}</span> Mentors.
                    <br/>
                    <span className="font-bold font-large font-color-green">17</span> Subjects.
                  </p>
                </Grid.Column>
              </Grid>
            </div>
          </div>
          <div className="Nunito-font font-small">
            <Container>
              <Divider hidden/>
              <Header as="h2" textAlign="left">Intructions For Students</Header>
              <Accordion exclusive={false} fluid styled>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Sign Up
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <p>
                    The sign up page is where you sign up for an account as a student to interact
                    with other students or choose an available tutoring session to join. Using your email
                    and creating your password.
                    <Image className="align-center"
                           src='https://raw.githubusercontent.com/studbudd/studbudd/Issue41-Instructions/app/public/images/StudentSignUp.png'
                           size='big'/>
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Sign In
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                  <p>
                    After creating an account from the Sign Up page, you can log in with your email
                    and password to gain access to the Classes and Tutors page.
                    <Image className="align-center"
                           src='https://raw.githubusercontent.com/studbudd/studbudd/Issue41-Instructions/app/public/images/StudentSignIn.png'
                           size='big'/>
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Editing your profile
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <p>
                    You can use the Edit Profile page to change your first name, last name, and a
                    class that you are looking for help in.
                    <Image className="align-center"
                           src='https://raw.githubusercontent.com/studbudd/studbudd/Issue41-Instructions/app/public/images/StudentEditProfile.png'
                           size='big'/>
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Class List
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                  <p>
                    If you are signed in as a student, you will be able to select from a variety of classes
                    that are offered by Tutors to help you. Within the classes, it will also show you when
                    and where the tutoring sessions will be held.
                    <Image className="align-center"
                           src='https://raw.githubusercontent.com/studbudd/studbudd/Issue41-Instructions/app/public/images/StudentClassList.png'
                           size='big'/>
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Students Page
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 4}>
                  <p>
                    Once you are logged in as a student, you will be able to create a study session
                    with fellow students who are also interested or need help in your course/ subject.
                    <Image className="align-center"
                           src='https://raw.githubusercontent.com/studbudd/studbudd/Issue41-Instructions/app/public/images/StudentStudentPage.png'
                           size='big'/>
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 5} index={5} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Tutors
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 5}>
                  <p>
                    The Tutors page will allow students to view tutors that has applied and has
                    been approved, as well as their major and area of strength.
                    <Image className="align-center"
                           src='https://raw.githubusercontent.com/studbudd/studbudd/Issue41-Instructions/app/public/images/StudentTutors.png'
                           size='big'/>
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 6} index={6} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Sign Out
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 6}>
                  <p>
                    Completely signs you out of your account so other people on the computer will
                    not be able to change nor view your information and sesssions.
                    <Image className="align-center"
                           src='https://raw.githubusercontent.com/studbudd/studbudd/Issue41-Instructions/app/public/images/StudentSignOut.png'
                           size='big'/>
                  </p>
                </Accordion.Content>
              </Accordion>
              <Header as="h2" textAlign="left">Intructions For Tutors</Header>
              <Accordion exclusive={false} fluid styled>
                <Accordion.Title active={activeIndex === 7} index={7} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Sign In
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 7}>
                  <p>
                    Once you are approved as a tutor, you will be able to sign in using your email.
                    Which then you will gain accesses Classes page, Tutors page, as well as being
                    able to change your profile.
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 8} index={8} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Mentorship Application
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 8}>
                  <p>
                    By filling and submitting this form, you are applying to become a tutor for the students
                    in need of help. After submitting, you will then wait for verification from
                    admins to see if you are qualified to be a tutor.
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 9} index={9} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Class List
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 9}>
                  <p>
                    Tutors: If you are signed in as a tutor, you will be able to create a class you are
                    willing to offer help to students in need. After creating tutoring session, you will be
                    able to choose your availability and location of the tutoring session.
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 10} index={10} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Tutors
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 10}>
                  <p>
                    The Tutors page will allow tutors to view other tutors that has applied and has been
                    approved, as well as their major and area of strength. As well as checking to see if
                    their own profile has been uploaded.
                  </p>
                </Accordion.Content>
                <Accordion.Title active={activeIndex === 11} index={11} onClick={this.handleClick}>
                  <Icon name='dropdown'/>
                  Sign Out
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 11}>
                  <p>
                    Completely signs you out of your account so other people on the computer will not
                    be able to change nor view your information and sesssions.
                  </p>
                </Accordion.Content>
              </Accordion>
              <Divider hidden/>
            </Container>
          </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Landing.propTypes = {
  mentors: PropTypes.array.isRequired,
  student: PropTypes.array.isRequired,
  Calendar: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Mentor');
  const subscription2 = Meteor.subscribe('ProfileLanding');
  const subscription3 = Meteor.subscribe('Calendar');
  return {
    mentors: Mentors.find({}).fetch(),
    student: Profile.find({}).fetch(),
    Calendar: Calendar.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(Landing);
