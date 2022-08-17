import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getTeamById } from '../redux/actions/team';
import { selectSelectedTeam } from '../redux/selectors/team';
import Team from '../views/Team';

const mapStateToProps = createStructuredSelector({
  team: selectSelectedTeam,
});

const mapDispatchToProps = (dispatch: any) => ({
  getTeam: (teamId: number) => dispatch(getTeamById(teamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
