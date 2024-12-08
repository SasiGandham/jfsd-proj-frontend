import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    aadhar: null,    
}

const SignUpSlice = createSlice({
    name: 'signUpUserSlice',
    initialState,
    reducers: {
        signUpStage1: function (state,action) {
            state.email =  action.payload.email,
            state.aadhar= action.payload.aadharNumber
            console.log(action.payload)
        },
    }

})

export const signUpActions = SignUpSlice.actions;

export const signUpReducer =  SignUpSlice.reducer;  