import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {Auth} from "aws-amplify"

const initialState = {
  isLoggedIn: false,
  errMsg: ""
}

// Define Store
const authStore = createContext(initialState)

// Define Types
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_FAILURE = "LOGIN_FAILURE"
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"


// Define ActionCreator
export const login = async (dispatch, username, password) => {
  try {
    const user = await Auth.signIn(username, password)
    console.log(user)
    dispatch({type: LOGIN_SUCCESS, payload: true})
  } catch (error) {
    console.log("error signing in", error)
    dispatch({type: LOGIN_FAILURE, payload: error.message})
  }
}

export const signup = async (dispatch, username, password, email, nickname, gender, birthdate) => {
  try {
    const {user} = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        nickname,
        gender,
        birthdate
      }
    })
    console.log("SIGNUP_USER:", user)
  } catch (error) {
    console.log("error signing up:", error)
  }
  dispatch({type: SIGNUP_SUCCESS, payload: true})
}

export const logout = async (dispatch) => {
  try {
    await Auth.signOut({global: true})
  } catch (error) {
    console.log("error signing out: ", error)
  }
  dispatch({type: LOGOUT_SUCCESS, payload: true})
}


// Defin Provider
const {Provider} = authStore
const AuthProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [LOGIN_SUCCESS]: (state, {payload}) => ({...state, isLoggedIn: payload}),
    [LOGIN_FAILURE]: (state, {payload}) => ({...state, errMsg: payload})
  }), initialState)
  console.log("State is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {authStore, AuthProvider}