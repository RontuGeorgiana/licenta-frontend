import { connect } from 'react-redux';
import CommentSection from '../components/CommentSection';
import { addComment } from '../redux/actions/comment';

const mapDispatchToProps = (dispatch: any) => ({
  addComment: (data: any) => dispatch(addComment(data)),
});

export default connect(null, mapDispatchToProps)(CommentSection);
