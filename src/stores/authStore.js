import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {Auth} from "aws-amplify"
import {apiRequest} from "../helper/requestHelper"
import {getUserType} from "../graphql/queries"

const initialState = {
  isLoggedIn: true,
  errMsg: "",
  newUser: {
    mail: "",
    password: "",
    gender: "",
    username: "",
    nickname: "",
    birthdate: ""
  },
  user: {
    mail: "",
    password: "",
    gender: "",
    username: "",
    nickname: "",
    birthdate: "",
    thumbnail: "https://raw.githubusercontent.com/daiti0113/Joker-assets/main/images/users/user1/user1.jpg",
    posts: [...Array(4).keys()].map(idx => ({id: idx + 1, imgSrc: `https://raw.githubusercontent.com/daiti0113/Joker-assets/main/images/users/user${idx + 1}/posts/1.jpg`}))
  }
}

// Define Store
const authStore = createContext(initialState)

// Define Types
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_FAILURE = "LOGIN_FAILURE"
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
const UPDATE_NEW_USER = "UPDATE_NEW_USER"
const CANCEL_SIGNUP = "CANCEL_SIGNUP"
const FETCH_USER = "FETCH_USER"


// Define ActionCreator
export const login = async (navigation, dispatch, username, password) => {
  try {
    const user = await Auth.signIn(username, password)
    console.log("LOGIN_USER: ", user)
    dispatch({type: LOGIN_SUCCESS, payload: {isLoggedIn: true, user: user.attributes}})
    navigation.navigate("TabScreen", {screen: "HomeScreen"})
    return user.attributes.sub
  } catch (error) {
    console.log("error signing in", error)
    dispatch({type: LOGIN_FAILURE, payload: error.message})
  }
}

export const signup = async (dispatch, {username, password, email, nickname, gender, birthdate}) => {
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
  dispatch({type: LOGOUT_SUCCESS, payload: false})
}

export const updateNewUser = (dispatch, data) => dispatch({type: UPDATE_NEW_USER, payload: data})
export const cancelSignup = dispatch => dispatch({type: CANCEL_SIGNUP})

export const fetchUser = async (dispatch, sub) => {
  const user = await apiRequest(getUserType, {user_id: sub})
  console.log("FETCH_USER", user)
  dispatch({type: FETCH_USER, payload: user.getUserType})
}

// Defin Provider
const {Provider} = authStore
const AuthProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [LOGIN_SUCCESS]: (state, {payload}) => ({...state, ...payload}),
    [LOGIN_FAILURE]: (state, {payload}) => ({...state, errMsg: payload}),
    [LOGOUT_SUCCESS]: (state, {payload}) => ({...state, isLoggedIn: payload}),
    [UPDATE_NEW_USER]: (state, {payload}) => ({...state, newUser: {...state.newUser, ...payload}}),
    [CANCEL_SIGNUP]: state => ({...state, newUser: initialState.newUser}),
    [FETCH_USER]: (state, {payload}) => ({...state, user: {...state.user, ...payload}})
  }), initialState)
  console.log("State is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {authStore, AuthProvider}