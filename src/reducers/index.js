// yaha pe sare reducer slice to import kr ke combine kr denge aur store me pass kr denge 

import {combineReducers}from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import cartReducer from  './slices/cartSlice'

const rootReducer= combineReducers({
    auth:authReducer,
    cart:cartReducer,
    profile:profileReducer,
})

export default rootReducer;