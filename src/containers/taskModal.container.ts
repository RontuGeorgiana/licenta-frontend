import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TaskModal from '../components/TaskModal';
import { getTaskById, setTaskNull } from '../redux/actions/task';
import {
  selectErrorTasks,
  selectIsLoadingTasks,
  selectSelectedTask,
} from '../redux/selectors/task';

const mapStateToProps = createStructuredSelector({
  error: selectErrorTasks,
  isLoading: selectIsLoadingTasks,
  task: selectSelectedTask,
});

const mapDispatchToProps = (dispatch: any) => ({
  getTaskById: (taskId: number, teamId: number) =>
    dispatch(getTaskById(taskId, teamId)),
  setTaskNull: () => dispatch(setTaskNull()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);
