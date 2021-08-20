import tgApi from '../../api/telegram';
import { userActionTypes, UserActions } from './user.types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootStateType } from '../root-reducer';
import { TgUser } from '../../types';

type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown,
  Action<UserActions['type']>
>;

export const setUser = (data: TgUser | null) => ({
  type: userActionTypes.SET_USER,
  payload: data,
});

export const fetchUser = (): ThunkType => async (dispatch) => {
  const user = await tgApi.getUser();
  dispatch(setUser(user));
};

export const logOut = (): ThunkType => async (dispatch) => {
  await tgApi.logOut();
  dispatch(setUser(null));
};
