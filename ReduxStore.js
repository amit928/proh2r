import { createStore } from "redux";
import ReduxReducer from "./src/ReduxReducer";


const GlobalStore = createStore(ReduxReducer);

export default GlobalStore;