import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ManageUsersModal from '../components/ManageUsersModal';
import { IUpdateMember } from '../interfaces/updateMember.interface';
import {
  addMembership,
  deleteMembership,
  getMembershipsByTeam,
  updateMembership,
} from '../redux/actions/membership';
import {
  selectErrorMemberships,
  selectIsLoadingMemberships,
  selectMemberships,
} from '../redux/selectors/membership';

const mapStateToProps = createStructuredSelector({
  memberships: selectMemberships,
  error: selectErrorMemberships,
  isLoading: selectIsLoadingMemberships,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMemberships: (teamId: number) => dispatch(getMembershipsByTeam(teamId)),
  updateMembership: (data: IUpdateMember) => dispatch(updateMembership(data)),
  addMembership: (data: any) => dispatch(addMembership(data)),
  deleteMembership: (data: any) => dispatch(deleteMembership(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersModal);
