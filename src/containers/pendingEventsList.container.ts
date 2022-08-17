import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PendingEventsList from '../components/PendingEventsList';
import { getPendingEvents, resolveEvent } from '../redux/actions/event';
import {
  selectErrorEvents,
  selectIsLoadingEvents,
  selectPendingEvents,
} from '../redux/selectors/event';

const mapStateToProps = createStructuredSelector({
  error: selectErrorEvents,
  isLoading: selectIsLoadingEvents,
  events: selectPendingEvents,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPendingEvents: (teamId: number) => dispatch(getPendingEvents(teamId)),
  resolveEvent: (data: any) => dispatch(resolveEvent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingEventsList);
