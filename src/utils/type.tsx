import { CheckBox, CollectionsBookmark, ContentPaste, LibraryAddCheck } from "@mui/icons-material";
import theme from "../assets/theme";

export enum Type {
  EPIC = 'epic',
  TASK = 'task',
  STORY = 'story',
  SUBTASK = 'subtask',
}

export const TypeIcons = {
    epic: <CollectionsBookmark fontSize='small' color='secondary'/>,
    story: <ContentPaste fontSize='small' htmlColor={`${theme.palette.primary.dark}`}/>,
    task: <CheckBox fontSize='small' color='success'/>,
    subtask: <LibraryAddCheck fontSize='small' color="action"/>
}