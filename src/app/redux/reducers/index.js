import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import contactsApp from "./contactsApp";
import UserReducer from "./User";
import GuestReducer from "./Guest";

const exportReducers = (history) => {
  return combineReducers({
    router: connectRouter(history),
    userReducer: UserReducer,
    guestReducer: GuestReducer,
    contactsApp: contactsApp,
  });
};

export default exportReducers;
