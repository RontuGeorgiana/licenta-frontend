import { createSelector } from 'reselect';

const selectSpace = (state: any) => state.space;

export const selectSpaceNavigation = createSelector(
  [selectSpace],
  (space) => space.navigation,
);

export const selectErrorSpace = createSelector(
  [selectSpace],
  (space) => space.error,
);

export const selectIsLoadingSpace = createSelector(
  [selectSpace],
  (space) => space.isLoading,
);