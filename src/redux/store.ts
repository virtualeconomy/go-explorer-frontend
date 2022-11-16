import {configureStore } from '@reduxjs/toolkit'
import CommonSlice from './slice/commonSlice'

const store = configureStore({
    reducer:{  //add slices for u need
        CommonSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch