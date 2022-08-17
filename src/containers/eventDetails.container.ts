import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import EventDetails from '../components/EventDetails';
import { deleteEvent, getEvent } from '../redux/actions/event';
import { selectSelectedEvent } from '../redux/selectors/event';

const mapStateToProps = createStructuredSelector({
  event: selectSelectedEvent,
});

const mapDispatchToProps = (dispatch: any) => ({
  getEvent: (eventId: number, teamId: number) =>
    dispatch(getEvent(eventId, teamId)),
  deleteEvent: (eventId: number, teamId: number) =>
    dispatch(deleteEvent(eventId, teamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
