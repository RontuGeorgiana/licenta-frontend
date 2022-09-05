import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LayoutWrapper from "../components/LayoutWrapper";
import { getUserDetails } from "../redux/actions/user";
import { selectIsUserLoading, selectUserDetails, selectUserError } from "../redux/selectors/user";

const mapStateToProps = createStructuredSelector({
    userDetails: selectUserDetails,
    isLoading: selectIsUserLoading,
    error: selectUserError
});

const mapDispatchToProps = (dispatch: any) => ({
    getUserDetails: () => dispatch(getUserDetails())
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutWrapper)