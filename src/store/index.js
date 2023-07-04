import { configureStore } from '@reduxjs/toolkit';
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import carsReducer from './cars-slice.js';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['filters'],
};

const persistedCarsReducer = persistReducer(persistConfig, carsReducer);
const store = configureStore({
    reducer: persistedCarsReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);
export default store;