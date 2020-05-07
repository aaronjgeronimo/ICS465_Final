import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CalendarItem extends React.Component {
  colorCell(avail) {
    if (avail === 'Unavailable') {
      return 'redBlock';
    }
    return 'greenBlock';
  }

  render() {
    return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>Availability of {this.props.Calendar.owner}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sunday</Table.HeaderCell>
              <Table.HeaderCell>Monday</Table.HeaderCell>
              <Table.HeaderCell>Tuesday</Table.HeaderCell>
              <Table.HeaderCell>Wednesday</Table.HeaderCell>
              <Table.HeaderCell>Thursday</Table.HeaderCell>
              <Table.HeaderCell>Friday</Table.HeaderCell>
              <Table.HeaderCell>Saturday</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell style={{ width: '14%' }} className={this.colorCell(this.props.Calendar.SundayAvailability)}>
                {this.props.Calendar.SundayAvailability}</Table.Cell>
              <Table.Cell style={{ width: '14%' }} className={this.colorCell(this.props.Calendar.MondayAvailability)}>
                {this.props.Calendar.MondayAvailability}</Table.Cell>
              <Table.Cell style={{ width: '14%' }} className={this.colorCell(this.props.Calendar.TuesdayAvailability)}>
                {this.props.Calendar.TuesdayAvailability}</Table.Cell>
              <Table.Cell style={{ width: '14%' }} className={this.colorCell(this.props.Calendar.WednesdayAvailability)}>
                {this.props.Calendar.WednesdayAvailability}</Table.Cell>
              <Table.Cell style={{ width: '14%' }} className={this.colorCell(this.props.Calendar.ThursdayAvailability)}>
                {this.props.Calendar.ThursdayAvailability}</Table.Cell>
              <Table.Cell style={{ width: '14%' }} className={this.colorCell(this.props.Calendar.FridayAvailability)}>
                {this.props.Calendar.FridayAvailability}</Table.Cell>
              <Table.Cell style={{ width: '14%' }} className={this.colorCell(this.props.Calendar.SaturdayAvailability)}>
                {this.props.Calendar.SaturdayAvailability}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
    );
  }
}

CalendarItem.propTypes = {
  Calendar: PropTypes.object.isRequired,
};
export default CalendarItem;
