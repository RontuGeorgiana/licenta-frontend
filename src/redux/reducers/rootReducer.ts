import { combineReducers } from 'redux';

import event from './event';
import folder from './folder';
import membership from './membership';
import task from './task';
import team from './team';
import user from './user';
import space from './space';

const rootReducer = combineReducers({
  team,
  membership,
  folder,
  task,
  event,
  user,
  space
});

export default rootReducer;
