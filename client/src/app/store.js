import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../auth/authSlice'

export default configureStore({
  reducer: {
    auth: authSlice
  },
})