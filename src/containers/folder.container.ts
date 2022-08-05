import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTeamByFolder } from '../redux/actions/folder';
import {
  createTask,
  deleteTask,
  getTasksByFolder,
  updateTask,
} from '../redux/actions/task';
import {
  selectFolderTeam,
  selectSelectedFolder,
} from '../redux/selectors/folder';
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
  team: selectFolderTeam,
});

const mapDispatchToProps = (dispatch: any) => ({
  getTasks: (folderId: number) => dispatch(getTasksByFolder(folderId)),
  updateTask: (data: any) => dispatch(updateTask(data)),
  createTask: (data: any) => dispatch(createTask(data)),
  deleteTask: (taskId: number, folderId: number) =>
    dispatch(deleteTask(taskId, folderId)),
  getFolderTeam: (folderId: number) => dispatch(selectTeamByFolder(folderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
