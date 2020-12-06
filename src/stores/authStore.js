import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"

const initialState = {
  isLoggedIn: false
}

// Define Store
const authStore = createContext(initialState)

// Define Types
const LOGIN_SUCCESS = "LOGIN"

// Define ActionCreator
export const login = (dispatch, isSuccess) => dispatch({type: LOGIN_SUCCESS, payload: isSuccess})


// Defin Provider
const {Provider} = authStore
const AuthProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [LOGIN_SUCCESS]: (state, {payload}) => ({...state, isLoggedIn: payload})
  }), initialState)
  console.log("State is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {authStore, AuthProvider}