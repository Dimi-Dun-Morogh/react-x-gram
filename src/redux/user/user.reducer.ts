import { TgUser } from "../../types";
import { UserActions, userActionTypes } from "./user.types";

const initialState = {
  user: null as TgUser |  null
};

export type InitilUserState  = typeof initialState;

const userReducer = (state: InitilUserState = initialState,
  action: UserActions): InitilUserState =>{
    switch (action.type) {
      case userActionTypes.SET_USER:
        return {
          ...state,
          user  : action.payload!,
        }

      default:
        return state;
    }
  }

  export default userReducer;