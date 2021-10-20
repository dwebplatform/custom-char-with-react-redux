import { configureStore } from '@reduxjs/toolkit'
import {charsReducer} from '../features/chars/charsSlice';
export const store = configureStore({
  reducer: {
    chars:charsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch