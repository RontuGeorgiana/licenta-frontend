import axios from "axios";
import { getAuthToken } from "../../../auth/utils/utils";
import USER_TYPES from "../../types/user.types";

//TODO add get user details logit for appbar
export const getUserDetails = () => {
    return(dispatch: any) => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/users/details`

        const token = getAuthToken();

        dispatch({
          type: USER_TYPES.GET_USER_DETAILS_STARTED,
        });
        axios.get(apiUrl,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        .then((response: any)=>{
            dispatch({
                type: USER_TYPES.GET_USER_DETAILS_SUCCESS,
                details: response.data
            })
        })
        .catch((error)=>{
            dispatch({
                type: USER_TYPES.GET_USER_DETAILS_ERROR,
                error: error.response?.data,
            })
        })
    }
}