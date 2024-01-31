import INITIAL_STATE from "../root.state";
import { 
  GET_ORDER_NUMBERS,
  GET_EQUIPMENT_LIST,
  RESET_EQUIPMENT_LIST,
  GET_DATA_FROM_DB
} from "./app-reducer.types";

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBERS:
      return {
        ...state,
        ordersToSelect: action.payload
      };
    case GET_EQUIPMENT_LIST:
      return {
        ...state,
        testingEquipmentToSelect: action.payload
      };
    case RESET_EQUIPMENT_LIST:
      return {
        ...state,
        testingEquipmentToSelect: action.payload
      };
    case GET_DATA_FROM_DB:
      return {
        ...state,
        tableRecordset: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;