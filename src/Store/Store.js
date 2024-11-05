import { configureStore } from '@reduxjs/toolkit'

import showReducer from './ShowSlice'

export default configureStore({
  reducer: {
    show: showReducer,
  },
})
