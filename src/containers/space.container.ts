import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getFoldersBySpace } from '../redux/actions/folder';
import Space from '../views/Space';
import {selectFolders, selectErrorFolders, selectIsLoadingFolders} from '../redux/selectors/folder';

const mapStateToProps = createStructuredSelector({
 folders: selectFolders,
 error: selectErrorFolders,
 isLoading: selectIsLoadingFolders,
});

const mapDispatchToProps = (dispatch: any) => ({
  getFolders: (spaceId: number) => dispatch(getFoldersBySpace(spaceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
