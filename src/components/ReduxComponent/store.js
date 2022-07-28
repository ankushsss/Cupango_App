import { combineReducers } from "redux";
import {createStore}  from "redux";
import ViewRestaurentCurrentData from "./reducers/restaurantReducer";

const store = createStore( combineReducers({
    restaurentView:ViewRestaurentCurrentData,
}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store