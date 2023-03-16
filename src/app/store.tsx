import { configureStore } from '@reduxjs/toolkit'
import { alertsReducer } from '../Components/alert/alert.reducer'
import { tasksReducer } from '../pages/Task/reducer/task.reducer'

const store =  configureStore({
  reducer: {
    tasksReducer,
    alertsReducer

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;