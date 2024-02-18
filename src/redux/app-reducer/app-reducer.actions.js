import { 
  SET_USER_INFO,
  SET_SERVER_CONFIG,
  SET_USER_LIST
} from "./app-reducer.types";

import {
  StoreUserInfo,
  GetUserList
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