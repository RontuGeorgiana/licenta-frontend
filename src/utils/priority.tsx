import { HorizontalRule, KeyboardArrowDown, KeyboardArrowUp, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";

export enum Priority {
  CRITICAL = 'critical',
  MAJOR = 'major',
  MEDIUM = 'medium',
  LOW = 'low',
  MINOR = 'minor'
}

export const PriorityIcons = {
    critical: <KeyboardDoubleArrowUp fontSize='medium' color='error'/>,
    major: <KeyboardArrowUp fontSize='medium' color='error'/>,
    medium: <HorizontalRule fontSize='medium' color='warning'/>,
    low: <KeyboardArrowDown fontSize='medium' color="secondary"/>,
    minor: <KeyboardDoubleArrowDown fontSize='medium' color="info"/>
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