import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface commonState {
    count: number
}
const initialState: commonState = {
    count: 0
}

export const commonSlice = createSlice({
    name: 'CommonSlice',
    initialState,
    reducers: {
        opt: (state: commonState, action: PayloadAction<string>) => {
            //todo
            state.count++
        }
    },
    // extraReducers: {
    // }
})

export const { opt } = commonSlice.actions

export default commonSlice.reducer