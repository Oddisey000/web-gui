import {store} from '../root.store';

import { 
  GET_ORDER_NUMBERS,
  GET_EQUIPMENT_LIST,
  RESET_EQUIPMENT_LIST,
  GET_DATA_FROM_DB,
  SET_USER_INFO,
  SET_SERVER_CONFIG,
  SET_USER_LIST
} from "./app-reducer.types";

import { 
  GetOrdersInfo,
  GetEquipmentInfo,
  ResetEquipmentInfo,
  GetDataFromDB,
  StoreUserInfo,
  GetUserList
} from "./app-reducer.utils";

export const getOrdersFromDB = () => ({
  type: GET_ORDER_NUMBERS,
  payload: GetOrdersInfo(store.getState())
});

export const getEquipmentList = (request) => ({
  type: GET_EQUIPMENT_LIST,
  payload: GetEquipmentInfo(request)
});

export const resetEquipmentList = () => ({
  type: RESET_EQUIPMENT_LIST,
  payload: ResetEquipmentInfo()
});

export const getDataFromDB = (request) => ({
  type: GET_DATA_FROM_DB,
  payload: GetDataFromDB(request)
});

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