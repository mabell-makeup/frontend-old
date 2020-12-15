import React, {createContext, useReducer} from "react"
import {signup} from "../helper/authHelper"
import {apiRequest} from "../helper/requestHelper"
import {createReducer} from "../helper/storeHelper"

const initialState = {
  isLoggedIn: false
}

// Define Store
const authStore = createContext(initialState)

// Define Types
const LOGIN_SUCCESS = "LOGIN"

// Define ActionCreator
export const login = async (dispatch, username, password, email, nickname, gender, birthdate) => {
  await signup(username, password, email, nickname, gender, birthdate)
  dispatch({type: LOGIN_SUCCESS, payload: true})
}


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