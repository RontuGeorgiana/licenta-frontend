import { combineReducers } from 'redux';

import event from './event';
import folder from './folder';
import membership from './membership';
import task from './task';
import team from './team';

const rootReducer = combineReducers({
  team,
  membership,
  folder,
  task,
  event,
});

export default rootReducer;
