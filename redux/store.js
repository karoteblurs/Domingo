import { configureStore } from '@reduxjs/toolkit'
import placesSlice from './placesSlice'


export const store = configureStore({
  reducer:
    placesSlice
  
})