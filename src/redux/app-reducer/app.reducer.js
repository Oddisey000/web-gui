import INITIAL_STATE from "../root.state";
import { 
  SET_USER_INFO,
  SET_SERVER_CONFIG,
  SET_USER_LIST,
  CREATE_NEW_USER,
  GET_USER_GROUP_LIST
} from "./app-reducer.types";

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        loggedInUser: action.payload
      };
    case SET_SERVER_CONFIG:
      return {
        ...state,
        configurationData: action.payload
      };
    case SET_USER_LIST:
      return {
        ...state,
        userlist: action.payload
      };
    case CREATE_NEW_USER:
      return {
        ...state,
        userlist: action.payload
      };
    case GET_USER_GROUP_LIST:
      return {
        ...state,
        userGroupList: action.payload
      }
    default:
      return state;
  }
};

export default appReducer;