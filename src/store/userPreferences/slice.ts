import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Planet } from '@services/planets'

export interface UserPreferenceState {
  favoritePlanets: Record<number, Planet>
}

const initialState: UserPreferenceState = {
  favoritePlanets: {}
}

export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    addToFavorites: (state, { payload: planet }: PayloadAction<Planet>) => {
      state.favoritePlanets[planet.id] = planet
    },
    removeFromFavorites: (state, { payload: planetId }: PayloadAction<number>) => {
      delete state.favoritePlanets[planetId]
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToFavorites, removeFromFavorites } = userPreferencesSlice.actions

export const userPreferencesReducer = userPreferencesSlice.reducer
