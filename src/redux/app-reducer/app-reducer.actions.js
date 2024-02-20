import { 
  SET_USER_INFO,
  SET_SERVER_CONFIG,
  SET_USER_LIST,
  UPDATE_USER_INFO
} from "./app-reducer.types";

import {
  StoreUserInfo,
  GetUserList,
  UpdateUserData,
  InsertNewUser
} from "./app-reducer.utils";

export const storeUserInfo = (request) => ({
  type: SET_USER_INFO,
  payload: StoreUserInfo(request)
});

export const storeServerConfig = (confObj) => ({
  type: SET_SERVER_CONFIG,
  payload: confObj
});

export const storeUserList = (request) => ({
  type: SET_USER_LIST,
  payload: GetUserList(request)
});

export const updateUserInfo = (request) => ({
  type: UPDATE_USER_INFO,
  payload: UpdateUserData(request)
});

export const insertUser = (request) => {
  InsertNewUser(request)
};