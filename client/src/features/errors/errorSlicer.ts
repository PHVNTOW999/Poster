import {createSlice} from "@reduxjs/toolkit";

interface InitialState {
    errorList: any[],
}

const initialState: InitialState = {
    errorList: [],
}

const errorSlicer = createSlice({
    name: 'Errors',
    initialState,
    reducers: {
        addError(state, action) {
            state.errorList.push(action.payload)
        }
    },
})

export const {addError} = errorSlicer.actions;
export const errors = errorSlicer.reducer;