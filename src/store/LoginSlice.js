import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    isLoggedIn: false,
    userMail: null,
    userName: null,
    userImage:null,
    assignedPolitician: null,
    userLocation: {
        latitude: null,
        longitude: null,
    },
}

const LoginSlice = createSlice({
    name:'Login',
    initialState,
    reducers : {
        handleLoginClick(state,action) {
            state.isLoggedIn = true;
            state.userName = action.payload.name;
            state.userMail = action.payload.email;
            state.userImage  = action.payload.image;
            state.assignedPolitician = action.payload.assignedPolitician
        },
        handleLocationSetting(state,action) {
            state.userLocation.latitude = action.payload.latitude;
            state.userLocation.longitude = action.payload.longitude;
        }
        
    }
})

export const loginActions = LoginSlice.actions;
export const loginReducer =  LoginSlice.reducer;