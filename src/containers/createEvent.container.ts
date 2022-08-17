import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CreateEvent from '../components/CreateEvent';
import { createEvent } from '../redux/actions/event';
import { getMembershipsByTeam } from '../redux/actions/membership';
import { selectMemberships } from '../redux/selectors/membership';

const mapStateToProps = createStructuredSelector({
  memberships: selectMemberships,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMemberships: (teamId: number, search: string) =>
    dispatch(getMembershipsByTeam(teamId, search)),
  createEvent: (data: any) => dispatch(createEvent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
