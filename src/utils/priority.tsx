import { HorizontalRule, KeyboardArrowDown, KeyboardArrowUp, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";

export enum Priority {
  CRITICAL = 'critical',
  MAJOR = 'major',
  MEDIUM = 'medium',
  LOW = 'low',
  MINOR = 'minor'
}

export const PriorityIcons = {
    critical: <KeyboardDoubleArrowUp fontSize='small' color='error'/>,
    major: <KeyboardArrowUp fontSize='small' color='error'/>,
    medium: <HorizontalRule fontSize='small' color='warning'/>,
    low: <KeyboardArrowDown fontSize='small' color="secondary"/>,
    minor: <KeyboardDoubleArrowDown fontSize='small' color="info"/>
}