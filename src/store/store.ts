import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import {
  userPreferencesReducer,
  userPreferencesSlice
} from './userPreferences/slice'
import { planetsApi } from '@services/planets'

const persistConfig = {
  key: userPreferencesSlice.name,
  storage: AsyncStorage,
  whitelist: ['favoritePlanets']
}

const persistedUserPreferencesReducer = persistReducer(
  persistConfig,
  userPreferencesReducer
)

export const store = configureStore({
  reducer: {
    userPreferences: persistedUserPreferencesReducer,
    [planetsApi.reducerPath]: planetsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(planetsApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
