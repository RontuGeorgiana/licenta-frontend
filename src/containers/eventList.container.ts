import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import EventList from '../components/EventsList';
import { getEvents } from '../redux/actions/event';
import {
  selectErrorEvents,
  selectEvents,
  selectIsLoadingEvents,
} from '../redux/selectors/event';

const mapStateToProps = createStructuredSelector({
  error: selectErrorEvents,
  isLoading: selectIsLoadingEvents,
  events: selectEvents,
});

const mapDispatchToProps = (dispatch: any) => ({
  getEvents: (teamId: number, filters: any) =>
    dispatch(getEvents(teamId, filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
