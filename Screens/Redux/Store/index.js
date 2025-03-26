// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { busreducer } from "./Reducer";

// // Correct function name (combineReducers)
// const rootReducer = combineReducers({
//   bus: busreducer,
// });

// // Consistent naming (exporting store)
// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;  // Correct export
import {createStore, combineReducers} from 'redux';
import {productReducer} from './Reducer';

// Combine reducers (if you have multiple reducers)
const rootReducer = combineReducers({
  productReducer, // Correct way to structure reducers
});

const store = createStore(rootReducer);

export default store;
