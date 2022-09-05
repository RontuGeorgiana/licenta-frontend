import SPACE_TYPES from "../../types/space.types"

const initialState = {
    navigation: {},
    isLoading: false,
    error: null
}

const spaceReducer = (state = initialState, action: any) => {
    switch(action.type){
        case SPACE_TYPES.GET_SPACE_NAVIGATION_STARTED:
            return{
                ...state,
                isLoading: true,
                error: null
            }
        case SPACE_TYPES.GET_SPACE_NAVIGATION_SUCCESS:
            return{
                ...state,
                navigation: action.navigation,
                isLoading: false,
                error: null
            }
        case SPACE_TYPES.GET_SPACE_NAVIGATION_ERROR:
            return{
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }

}

export default spaceReducer;