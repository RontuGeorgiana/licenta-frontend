import USER_TYPES from "../../types/user.types";

const initialState = {
    details: null,
    isLoading: false,
    error: null,
};

const userReducer = (state = initialState, action: any) =>{
    switch(action.type){
        case USER_TYPES.GET_USER_DETAILS_STARTED:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case USER_TYPES.GET_USER_DETAILS_ERROR:
            return{
                ...state,
                isLoading: false,
                error: action.error
            }
        case USER_TYPES.GET_USER_DETAILS_SUCCESS:
            return{
                ...state,
                details: action.details,
                isLoading: false,
                error: null
            }
        default:
            return state;
    }
}

export default userReducer;
  