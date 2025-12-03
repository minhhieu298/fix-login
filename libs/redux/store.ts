"use client";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "@/store/rootReducer";
import rootSaga from "@/store/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
