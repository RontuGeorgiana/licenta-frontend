import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  createFolder,
  getFoldersBySpace,
  selectFolder,
} from '../redux/actions/folder';
import {
  selectErrorFolders,
  selectFolders,
  selectIsLoadingFolders,
} from '../redux/selectors/folder';
import Space from '../views/Space';

const mapStateToProps = createStructuredSelector({
  folders: selectFolders,
  error: selectErrorFolders,
  isLoading: selectIsLoadingFolders,
});

const mapDispatchToProps = (dispatch: any) => ({
  getFolders: (spaceId: number) => dispatch(getFoldersBySpace(spaceId)),
  selectFolder: (folder: any) => dispatch(selectFolder(folder)),
  createFolder: (data: any) => dispatch(createFolder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
