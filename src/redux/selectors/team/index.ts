import { createSelector } from 'reselect';

const selectTeam = (state: any) => state.team;

export const selectTeams = createSelector([selectTeam], (team) => team.teams);

export const selectSelectedTeam = createSelector(
  [selectTeam],
  (team) => team.selectedTeam,
);

export const selectErrorTeams = createSelector(
  [selectTeam],
  (team) => team.error,
);

export const selectIsLoadingTeams = createSelector(
  [selectTeam],
  (team) => team.isLoading,
);
