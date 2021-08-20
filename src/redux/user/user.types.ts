import { TgUser } from "../../types";
import { IAction } from "../store";

export enum userActionTypes  {
  SET_USER = 'SET_USER'
}

export type SetUser = IAction<userActionTypes.SET_USER, TgUser | null>


export type UserActions = SetUser