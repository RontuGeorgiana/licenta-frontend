import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getTasksByFolder } from '../redux/actions/task';
import { selectSelectedFolder } from '../redux/selectors/folder';
import {
  selectErrorTasks,
  selectIsLoadingTasks,
  selectTasks,
} from '../redux/selectors/task';
import Folder from '../views/Folder';

const mapStateToProps = createStructuredSelector({
  tasks: selectTasks,
  error: selectErrorTasks,
  isLoading: selectIsLoadingTasks,
  selectedFolder: selectSelectedFolder,
});

const mapDispatchToProps = (dispatch: any) => ({
  getTasks: (folderId: number) => dispatch(getTasksByFolder(folderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
