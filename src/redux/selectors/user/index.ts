import { createSelector } from "reselect";

const selectUser = (state: any) => state.user;

export const selectUserDetails = createSelector([selectUser], (user) => user.details);

export const selectIsUserLoading = createSelector([selectUser], (user)=> user.isLoading);
 
export const selectUserError = createSelector([selectUser], (user)=>user.error)
