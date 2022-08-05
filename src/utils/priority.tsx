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

export const numberToPriority = {
  1: Priority.CRITICAL.valueOf(),
  2: Priority.MAJOR.valueOf(),
  3: Priority.MEDIUM.valueOf(),
  4: Priority.LOW.valueOf(),
  5: Priority.MINOR.valueOf()
}

export const convertPriority = (num: any, name: any) => {
  if(num){
    return (numberToPriority as any)[num];
  }
  if(name){
    return Object.keys(numberToPriority)[Object.values(numberToPriority).indexOf(name)]
  }
  return
}