import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { animeApi } from './services/anime'
import { tagApi } from './services/tag'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [animeApi.reducerPath]: animeApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeApi.middleware,tagApi.middleware),
    
})