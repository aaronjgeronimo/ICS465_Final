import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Menu, Grid, Loader, Dropdown, Header, Container, Divider } from 'semantic-ui-react';
import { Mentors } from '/imports/api/mentor/mentor';
import MentorCard from '/imports/ui/components/MentorCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClassList extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  state = { activeIndex: [] }

  handleClick = (e, titleProps) => {
    console.log(`titleProps: ${titleProps}`);
    console.log(titleProps);
    const { activeIndex } = this.state;
    let isItIn = false;
    let i;
    for (i = 0; i < activeIndex.length; i++) {
      if (activeIndex[i] === titleProps.name) {
        isItIn = true;
        activeIndex.splice(i, 1);
        console.log(activeIndex);
      }
    }
    if (isItIn === false) {
      activeIndex.splice(0);
      activeIndex.push(titleProps.name);
    }
    console.log(activeIndex);

    this.setState({ activeIndex });
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { activeItem } = this.state || {};
    const { subject } = this.state;
    const divStyle = { paddingBottom: '20px' };
    return (
        <Grid style={divStyle}>
          <Grid.Row>
            <Container>
              <Divider hidden />
              <Header as="h1" textAlign="center">Classes Available</Header>
              <Header as='h3' dividing/>
            </Container>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column width = {1}>
              <Divider vertical hidden />
            </Grid.Column>
            <Grid.Column width = {3}>
              <Menu vertical>
                <Menu.Item>
                  <Menu.Header>STEM</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                        name='Physics'
                        active={subject === 'Physics'} onClick={this.handleClick}
                    />
                    <Menu.Item
                        name='Chemistry'
                        active={subject === 'Chemistry'} onClick={this.handleClick}
                    />
                    <Menu.Item
                        name='Biology'
                        active={subject === 'Biology'} onClick={this.handleClick}
                    />
                    <Dropdown item text='Engineering'>
                      <Dropdown.Menu>
                        <Dropdown.Item text='Mechanical' name='Mechanical' active=
                            {subject === 'Mechanical'} onClick={this.handleClick}/>
                        <Dropdown.Item text='Civil' name='Civil' active=
                            {subject === 'Civil'} onClick={this.handleClick}/>
                        <Dropdown.Item text='Electrical' name='Electrical' active=
                            {subject === 'Electrical'} onClick={this.handleClick} />
                        <Dropdown.Item text='Computer' name='Computer' active=
                            {subject === 'Computer'} onClick={this.handleClick}/>
                        <Dropdown.Item text='Software' name='Software Engineering' active=
                            {subject === 'Software Engineering'} onClick={this.handleClick}/>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item
                        name='Math'
                        active={subject === 'Math'} onClick={this.handleClick}
                    />
                  </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                  <Menu.Header>Social Sciences</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                        name='Psychology'
                        active={subject === 'Psychology'} onClick={this.handleClick}
                    />
                    <Menu.Item
                        name='Antrhopology'
                        active={subject === 'Anthropology'} onClick={this.handleClick}
                    />
                    <Menu.Item
                        name='Sociology'
                        active={subject === 'Sociology'} onClick={this.handleClick}
                    />
                    <Menu.Item
                        name='Political Science'
                        active={subject === 'Political Science'} onClick={this.handleClick}
                    />
                    <Menu.Item
                        name='Economics'
                        active={subject === 'Economics'} onClick={this.handleClick}
                    />
                  </Menu.Menu>
                </Menu.Item>
                  <Menu.Item>
                    <Menu.Header>Humanities</Menu.Header>
                    <Menu.Menu>
                      <Menu.Item
                          name='Philosophy'
                          active={subject === 'Philosophy'} onClick={this.handleClick}
                      />
                      <Menu.Item
                          name='History'
                          active={subject === 'History'} onClick={this.handleClick}
                      />
                      <Dropdown item text='Languages'>
                        <Dropdown.Menu>
                          <Dropdown.Item text='English' name='English' active=
                              {subject === 'English'} onClick={this.handleClick}/>
                          <Dropdown.Item text='Japanese' name='Japanese' active=
                              {subject === 'Japanese'} onClick={this.handleClick}/>
                          <Dropdown.Item text='Korean' name='Korean' active=
                              {subject === 'Korean'} onClick={this.handleClick}/>
                          <Dropdown.Item text='Mandarin' name='Mandarin' active=
                              {subject === 'Mandarin'} onClick={this.handleClick}/>
                          <Dropdown.Item text='Spanish' name='Spanish' active=
                              {subject === 'Spanish'} onClick={this.handleClick}/>
                          <Dropdown.Item text='German' name='German' active=
                              {subject === 'German'} onClick={this.handleClick}/>
                          <Dropdown.Item text='Russian' name='Russian' active=
                              {subject === 'Russian'} onClick={this.handleClick}/>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Menu.Item
                          name='Religion'
                          active={subject === 'Religion'} onClick={this.handleClick}
                      />
                      <Menu.Item
                          name='Law'
                          active={subject === 'Law'} onClick={this.handleClick}
                      />
                      <Dropdown item text='Art'>
                        <Dropdown.Menu>
                          <Dropdown.Item text='Drawing' name='Drawing' active=
                              {subject === 'Drawing'} onClick={this.handleClick}
                          />
                          <Dropdown.Item text='Painting' name='Painting' active=
                              {subject === 'Painting'} onClick={this.handleClick}
                          />
                          <Dropdown.Item text='Poetry' name='Poetry' active=
                              {subject === 'Poetry'} onClick={this.handleClick}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu.Menu>
                  </Menu.Item>
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    <Menu.Item>
                      <Menu.Header>Tester</Menu.Header>
                      <Menu.Menu>
                        <Menu.Item
                            name='Data Structures'
                            active={subject === 'Data Structures'} onClick={this.handleClick}
                        />
                        <Menu.Item
                            name='Class2'
                            active={subject === 'Class2'} onClick={this.handleClick}
                        />
                        <Menu.Item
                            name='Advanced AI'
                            active={activeItem === 'Advanced AI'}
                            onClick={ this.handleItemClick }
                        />
                      </Menu.Menu>
                    </Menu.Item>
                ) : ''}
              </Menu>
            </Grid.Column>
            <Grid.Column width = {10}>
              <Grid container columns={3}>
              {this.props.mentors.filter(
                  mentor => (this.state.activeIndex && (this.state.activeIndex.includes((mentor.class1 || mentor.class2 || mentor.class3)))),
              ).map(
                  (mentor, index) => <MentorCard key={index} mentor={mentor} />,
              )}

                {this.props.mentors.filter(
                    mentor => (this.state.activeIndex && (this.state.activeIndex.includes((mentor.class2)))),
                ).map(
                    (mentor, index) => <MentorCard key={index} mentor={mentor} />,
                )}

                {this.props.mentors.filter(
                    mentor => (this.state.activeIndex && (this.state.activeIndex.includes((mentor.class3)))),
                ).map(
                    (mentor, index) => <MentorCard key={index} mentor={mentor} />,
                )}
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ClassList.propTypes = {
  mentors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  /*
  Going to need to make a mentor.js file in '/startup/server'
  11/25/18
  -subscribed 'MentorAdmin' is from '/startup/server/mentor.js'
   */

  const subscription = Meteor.subscribe('Mentor');
  return {
    mentors: Mentors.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ClassList);
