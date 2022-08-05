import { connect } from 'react-redux';
import TaskRow from '../components/TaskRow';
import { deleteTask, updateTask } from '../redux/actions/task';

const mapDispatchToProps = (dispatch: any) => ({
  updateTask: (data: any) => dispatch(updateTask(data)),
  deleteTask: (taskId: number, folderId: number) =>
    dispatch(deleteTask(taskId, folderId)),
});

export default connect(null, mapDispatchToProps)(TaskRow);
