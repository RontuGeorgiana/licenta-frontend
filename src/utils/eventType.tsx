import { Call, Flight, LocalActivity, NotificationsActive } from "@mui/icons-material";

export enum EventType {
    LEAVE = 'leave',
    CALL = 'call',
    REMINDER = 'reminder',
    OTHER = 'other',
  }

export const EventIcons = {
    leave: <Flight fontSize='small' color="info"/>,
    call: <Call fontSize='small' color="info"/>,
    reminder: <NotificationsActive fontSize='small' color="info"/>,
    other: <LocalActivity fontSize='small' color="info"/>
}