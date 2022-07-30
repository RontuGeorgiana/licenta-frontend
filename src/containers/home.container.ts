import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addSpace } from '../redux/actions/space';
import {
  addTeam,
  deleteTeam,
  getTeams,
  leaveTeam,
  renameTeam,
} from '../redux/actions/team';
import {
  selectErrorTeams,
  selectIsLoadingTeams,
  selectTeams,
} from '../redux/selectors/team';
import Home from '../views/Home';

const mapStateToProps = createStructuredSelector({
  teams: selectTeams,
  error: selectErrorTeams,
  isLoading: selectIsLoadingTeams,
});

const mapDispatchToProps = (dispatch: any) => ({
  getTeams: () => dispatch(getTeams()),
  addTeam: (name: string) => dispatch(addTeam(name)),
  renameTeam: (teamId: number, newName: string) =>
    dispatch(renameTeam(teamId, newName)),
  deleteTeam: (teamId: number) => dispatch(deleteTeam(teamId)),
  leaveTeam: (teamId: number) => dispatch(leaveTeam(teamId)),
  addSpace: (data: any) => dispatch(addSpace(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
