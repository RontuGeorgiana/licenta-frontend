import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FoldersContainer from '../components/FolderElements';
import { getFoldersBySpace, selectFolder } from '../redux/actions/folder';
import {
  selectErrorFolders,
  selectFolders,
  selectIsLoadingFolders,
} from '../redux/selectors/folder';

const mapStateToProps = createStructuredSelector({
  folders: selectFolders,
  error: selectErrorFolders,
  isLoading: selectIsLoadingFolders,
});

const mapDispatchToProps = (dispatch: any) => ({
  getFolders: (spaceId: number) => dispatch(getFoldersBySpace(spaceId)),
  selectFolder: (folder: any) => dispatch(selectFolder(folder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoldersContainer);
