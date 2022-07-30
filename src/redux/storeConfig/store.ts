import { applyMiddleware, createStore } from 'redux';
import createDebounced from 'redux-debounced';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const middleware = [thunk, createDebounced()];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

export { store };
