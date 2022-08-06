import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SetAssigneeModal from '../components/SetAssigneeModal';
import {
  getMembershipsByTeam,
  onSearchMembership,
} from '../redux/actions/membership';
import {
  selectMemberships,
  selectSearchMemberships,
} from '../redux/selectors/membership';

const mapStateToProps = createStructuredSelector({
  search: selectSearchMemberships,
  memberships: selectMemberships,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMemberships: (teamId: number, search:string) => dispatch(getMembershipsByTeam(teamId, search)),
  onSearchMembership: (search: string) => dispatch(onSearchMembership(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetAssigneeModal);
