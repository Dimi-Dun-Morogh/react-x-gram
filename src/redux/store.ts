import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middlewares = [];
middlewares.push(thunk);

if (process.env.NODE_ENV === 'development') middlewares.push(logger);

export interface IAction<T, P> {
  readonly type: T;
  readonly payload?: P;
}


export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});
