import { connect } from 'react-redux';
import FolderRow from '../components/FolderRow';
import {
  createFolder,
  deleteFolder,
  editFolder,
} from '../redux/actions/folder';

const mapDispatchToProps = (dispatch: any) => ({
  editFolder: (data: any, spaceId: number) =>
    dispatch(editFolder(data, spaceId)),
  deleteFolder: (folderId: number, spaceId: number) =>
    dispatch(deleteFolder(folderId, spaceId)),
  createFolder: (data: any) => dispatch(createFolder(data)),
});

export default connect(null, mapDispatchToProps)(FolderRow);
