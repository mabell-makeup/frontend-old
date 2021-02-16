import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {Auth} from "aws-amplify"
import {apiRequest} from "../helper/requestHelper"
import {getUserType, listPostTypes} from "../graphql/queries"
import {createUserType, updateUserType} from "../graphql/mutations"

const initialState = {
  is_logged_in: false,
  err_msg: "",
  new_user: {
    email: "",
    password: "",
    gender: "",
    name: "",
    nickname: "",
    birthdate: ""
  },
  user: {
    email: "",
    password: "",
    gender: "",
    name: "",
    nickname: "",
    birthdate: "",
    thumbnail: "",
    posts: [],
    skin_type: ""
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
const UPDATE_USER = "UPDATE_USER"
const UPDATE_MY_POSTS = "UPDATE_MY_POSTS"


// Define ActionCreator
export const login = async (navigation, dispatch, name, password) => {
  try {
    const user = await Auth.signIn(name, password)
    console.log("LOGIN_USER: ", user)
    dispatch({type: LOGIN_SUCCESS, payload: {...user.attributes, name: user.username}})
    navigation.navigate("TabScreen", {screen: "HomeScreen"})
    return user.attributes.sub
  } catch (error) {
    console.log("error signing in", error)
    dispatch({type: LOGIN_FAILURE, payload: error.message})
  }
}
export const signup = async (dispatch, {name, password, email, nickname, gender, birthdate}) => {
  try {
    const {user} = await Auth.signUp({
      username: name,
      password,
      attributes: {
        email,
        nickname,
        gender,
        birthdate
      }
    })
    await createUser(dispatch, {name, nickname: name})
    console.log("SIGNUP_USER:", user)
  } catch (error) {
    console.log("error signing up:", error)
  }
  dispatch({type: SIGNUP_SUCCESS, payload: true})
}
export const createUser = async (dispatch, newUser) => {
  try {
    await apiRequest(createUserType, {input: newUser})
    dispatch({type: UPDATE_USER, payload: newUser})
  } catch (error) {
    console.log("error createUser:", error)
  }
}
export const confirmSignup = async (dispatch, code, name, password, navigation) => {
  try {
    await Auth.confirmSignUp(name, code)
    login(navigation, dispatch, name, password)
  } catch (error) {
    console.log("error confirmSignup:", error)
  }
}
export const resendConfirmMail = async (name, navigation) => {
  try {
    await Auth.resendSignUp(name)
    navigation.push("SendConfirmationMail")
  } catch (error) {
    console.log("error resendConfirmMail:", error)
  }
}
export const logout = async (dispatch) => {
  try {
    await Auth.signOut({global: true})
  } catch (error) {
    console.log("error signing out: ", error)
  }
  dispatch({type: LOGOUT_SUCCESS})
}
export const updateNewUser = (dispatch, data) => dispatch({type: UPDATE_NEW_USER, payload: data})
export const cancelSignup = dispatch => dispatch({type: CANCEL_SIGNUP})
export const fetchUser = async (dispatch, sub) => {
  const user = await apiRequest(getUserType, {user_id: sub})
  console.log("FETCH_USER", user)
  dispatch({type: UPDATE_USER, payload: user.getUserType})
}
export const updateUser = async (dispatch, tmpUser) => {
  try {
    // await apiRequest(updateUserType, {input: tmpUser})
    await apiRequest(updateUserType, {input: tmpUser})
  } catch (error) {
    console.log("error update user: ", error)
  }
  dispatch({type: UPDATE_USER, payload: tmpUser})
}
export const fetchMyPosts = async (dispatch, user_id) => {
  try {
    const res = await apiRequest(listPostTypes, {filter: {user_id: {eq: user_id}}})
    dispatch({type: UPDATE_MY_POSTS, payload: res ? res.listPostTypes.items.map(post => ({id: post.post_id, imgSrc: post.thumbnail_img_src})) : []})
  } catch (error) {
    console.log("error fetch my posts: ", error)
  }
}

// Defin Provider
const {Provider} = authStore
const AuthProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [LOGIN_SUCCESS]: (state, {payload}) => ({...state, user: {...state.user, ...payload}, is_logged_in: true}),
    [LOGIN_FAILURE]: (state, {payload}) => ({...state, err_msg: payload}),
    [LOGOUT_SUCCESS]: state => ({...state, is_logged_in: false}),
    [UPDATE_NEW_USER]: (state, {payload}) => ({...state, new_user: {...state.new_user, ...payload}}),
    [CANCEL_SIGNUP]: state => ({...state, new_user: initialState.new_user}),
    [UPDATE_USER]: (state, {payload}) => ({...state, user: {...state.user, ...payload}}),
    [UPDATE_MY_POSTS]: (state, {payload}) => ({...state, user: {...state.user, posts: payload}})
  }), initialState)
  console.log("State is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {authStore, AuthProvider}