import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "redux/reducers";
import config from "config";
import rootSaga from "../sagas";

const initialState = {};
const { DEV_TOOLS } = config;
let composeEnhancer = compose;
const sagaMiddleware = createSagaMiddleware();

if (DEV_TOOLS && DEV_TOOLS.enableReduxDevTools) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
}

const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
