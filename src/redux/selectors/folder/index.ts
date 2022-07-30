import { createSelector } from 'reselect';

const selectFolder = (state: any) => state.folder;

export const selectFolders = createSelector(
  [selectFolder],
  (folder) => folder.folders,
);

export const selectErrorFolders = createSelector(
  [selectFolder],
  (folder) => folder.error,
);

export const selectIsLoadingFolders = createSelector(
  [selectFolder],
  (folder) => folder.isLoading,
);

export const selectSelectedFolder = createSelector(
  [selectFolder],
  (folder) => folder.selectedFolder,
);
