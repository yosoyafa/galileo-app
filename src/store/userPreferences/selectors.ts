import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

export const selectFavoritePlanets = (state: RootState) =>
  state.userPreferences.favoritePlanets

export const selectFavoritePlanetsArray = createSelector(
  selectFavoritePlanets,
  favoritePlanets => Object.values(favoritePlanets)
)
