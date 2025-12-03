import createSagaMiddleware from "@redux-saga/core";
// import logger from 'redux-logger'
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(sagaMiddleware),
  // .concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
