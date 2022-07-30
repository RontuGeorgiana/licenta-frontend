import { connect } from 'react-redux';
import { getFoldersBySpace } from '../redux/actions/folder';
import Space from '../views/Space';

const mapDispatchToProps = (dispatch: any) => ({
  getFolders: (spaceId: number) => dispatch(getFoldersBySpace(spaceId)),
});

export default connect(null, mapDispatchToProps)(Space);
