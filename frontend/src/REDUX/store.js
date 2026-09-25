import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "../REDUX/authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./comapnaySlice"
import applicationSlice from "./applications"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    REGISTER,
    PURGE,
    PERSIST
} from "redux-persist";

import storageModule from "redux-persist/lib/storage";

const storage = storageModule.default;

const persistConfig = {
    key: "root",
    version: 1,
    storage: storage
};

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice
});

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export const persistor = persistStore(store);

export default store;

