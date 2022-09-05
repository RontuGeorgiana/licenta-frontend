import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FoldersContainer from '../components/FolderElements';
import { getFoldersBySpace, selectFolder } from '../redux/actions/folder';
import { getSpaceNavigation } from '../redux/actions/space';
import {
  selectErrorFolders,
  selectFolders,
  selectIsLoadingFolders,
  selectSelectedFolder,
} from '../redux/selectors/folder';
import { selectErrorSpace, selectIsLoadingSpace, selectSpaceNavigation } from '../redux/selectors/space';

const mapStateToProps = createStructuredSelector({
  navigation: selectSpaceNavigation,
  selectedFolder: selectSelectedFolder,
  error: selectErrorFolders || selectErrorSpace,
  isLoading: selectIsLoadingFolders || selectIsLoadingSpace,
});

const mapDispatchToProps = (dispatch: any) => ({
  getFolders: (spaceId: number) => dispatch(getFoldersBySpace(spaceId)),
  getNavigation: (spaceId: number) => dispatch(getSpaceNavigation(spaceId)),
  selectFolder: (folder: any) => dispatch(selectFolder(folder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoldersContainer);
