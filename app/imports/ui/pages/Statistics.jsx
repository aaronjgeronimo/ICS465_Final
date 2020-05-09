import React from 'react';
import { Divider, Grid, Header, Loader, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mentors } from '/imports/api/mentor/mentor';
import { Profile } from '/imports/api/profile/profile';
import { Bar } from 'react-chartjs-2';

const state = {
    labels: ['STEM', 'Social Sciences', 'Humanities'],
    datasets: [
        {
            label: 'Classes',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [10, 5, 15],
        },
    ],
};
const state2 = {
    labels: ['STEM', 'Social Sciences', 'Humanities'],
    datasets: [
        {
            label: 'Students',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [8, 0, 4],
        },
    ],
};

class Statistics extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <div className="percent-padding-bottom margin-top">
            <Container>
                <div>
                <Bar
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Subjects Per Departments',
                            fontSize: 20,
                        },
                        legend: {
                            display: true,
                            position: 'right',
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 20,
                                },
                            }],
                        },
                    }}
                />
            </div>
                <br/>
                <div>
                    <Bar
                        data={state2}
                        options={{
                            title: {
                                display: true,
                                text: 'Students Per Department',
                                fontSize: 20,
                            },
                            legend: {
                                display: true,
                                position: 'right',
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        suggestedMin: 0,
                                        suggestedMax: 20,
                                    },
                                }],
                            },
                        }}
                    />
                </div>
            </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Statistics.propTypes = {
    mentors: PropTypes.array.isRequired,
    student: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe('Mentor');
    const subscription2 = Meteor.subscribe('ProfileLanding');
    return {
        mentors: Mentors.find({}).fetch(),
        student: Profile.find({}).fetch(),
        ready: subscription.ready() && subscription2.ready(),
    };
})(Statistics);
