import { createSelector } from 'reselect';

const selectMembership = (state: any) => state.membership;

export const selectMemberships = createSelector(
  [selectMembership],
  (membership) => membership.memberships,
);

export const selectErrorMemberships = createSelector(
  [selectMembership],
  (membership) => membership.error,
);

export const selectIsLoadingMemberships = createSelector(
  [selectMembership],
  (membership) => membership.isLoading,
);

export const selectSearchMemberships = createSelector(
  [selectMembership],
  (membership) => membership.filters.search,
);
