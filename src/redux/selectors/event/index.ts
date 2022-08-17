import { createSelector } from 'reselect';

const selectEvent = (state: any) => state.event;

export const selectEvents = createSelector(
  [selectEvent],
  (event) => event.events,
);

export const selectPendingEvents = createSelector(
  [selectEvent],
  (event) => event.pendingEvents,
);

export const selectSelectedEvent = createSelector(
  [selectEvent],
  (event) => event.selectedEvent,
);

export const selectIsLoadingEvents = createSelector(
  [selectEvent],
  (event) => event.isLoading,
);

export const selectErrorEvents = createSelector(
  [selectEvent],
  (event) => event.error,
);
