import { createSelector } from 'reselect';

const selectTask = (state: any) => state.task;

export const selectTasks = createSelector([selectTask], (task) => task.tasks);

export const selectErrorTasks = createSelector(
  [selectTask],
  (task) => task.error,
);

export const selectIsLoadingTasks = createSelector(
  [selectTask],
  (task) => task.isLoading,
);

export const selectSelectedTask = createSelector(
  [selectTask],
  (task) => task.selectedTask,
);
