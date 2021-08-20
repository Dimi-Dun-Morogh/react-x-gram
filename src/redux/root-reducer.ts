import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  userState: userReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
