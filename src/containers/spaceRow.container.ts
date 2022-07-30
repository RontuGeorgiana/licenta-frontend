import { connect } from 'react-redux';
import SpaceRow from '../components/SpaceRow';
import { deleteSpace, editSpace } from '../redux/actions/space';

const mapDispatchToProps = (dispatch: any) => ({
  editSpace: (data: any) => dispatch(editSpace(data)),
  deleteSpace: (spaceId: number) => dispatch(deleteSpace(spaceId)),
});

export default connect(null, mapDispatchToProps)(SpaceRow);
