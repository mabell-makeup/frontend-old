import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {Auth} from "aws-amplify"
import {apiRequest} from "../helper/requestHelper"
import {getUserType, listPostTypes, countPosts} from "../graphql/queries"
import {createUserType, updateUserType} from "../graphql/mutations"
import {addError, fetchMasterData} from "./appStore"

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
    thumbnail_img_src: "",
    posts: [],
    skin_type: "",
    post_count: 0,
    face_type: "",
    base_color: "",
    season: ""
  },
  nextToken: ""
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
const FETCH_MY_POSTS = "FETCH_MY_POSTS"
const UPDATE_MY_POSTS = "UPDATE_MY_POSTS"
const UPDATE_NEXT_TOKEN = "UPDATE_NEXT_TOKEN"


// Define ActionCreator
export const login = async (navigation, dispatch, name, password) => {
  try {
    const user = await Auth.signIn(name, password)
    await fetchUser(dispatch, user.attributes.sub)
    await fetchMasterData(dispatch)
    await dispatch({type: LOGIN_SUCCESS, payload: {...user.attributes, name: user.username}})
  } catch (e) {
    console.log("error signing in", e)
    dispatch({type: LOGIN_FAILURE, payload: e.message})
    if (!["InvalidParameterException", "NotAuthorizedException", "UserNotConfirmedException"].includes(e.code)) {
      addError(dispatch, {errorType: "AUTH_ERROR", message: "予期せぬエラーが発生しました。"})
    }
  }
}
export const signup = async (dispatch, {name, password, email, birthdate}) => {
  try {
    const {user} = await Auth.signUp({
      username: name,
      preferred_username: name,
      password,
      attributes: {
        email,
        nickname: name,
        birthdate
      }
    })
    console.log("SIGNUP_USER:", user)
  } catch (error) {
    console.log("error signing up:", error)
    throw error
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
export const confirmSignup = async (dispatch, code, name, password, navigation, setError) => {
  try {
    await Auth.confirmSignUp(name, code)
  } catch (error) {
    console.log("error confirmSignup:", error)
    setError(["確認コードが間違っています"])
  }
  try {
    await login(navigation, dispatch, name, password)
    await createUser(dispatch, {name, nickname: name})
  } catch (error) {
    console.log("error confirmSignup:", error)
    addError(dispatch, {errorType: "REQUEST_ERROR", message: "予期せぬエラーが発生しました"})
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
export const logout = async dispatch => {
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
    const user = await Auth.currentAuthenticatedUser()
    await Auth.updateUserAttributes(user, {preferred_username: tmpUser.name})
    await apiRequest(updateUserType, {input: tmpUser})
    dispatch({type: UPDATE_USER, payload: tmpUser})
  } catch (error) {
    console.log("error update user: ", error)
  }
}
// eslint-disable-next-line complexity
export const fetchMyPosts = async (dispatch, user_id, nextToken) => {
  try {
    const res = await apiRequest(listPostTypes, nextToken ? {filter: {user_id: {eq: user_id}}, nextToken} : {filter: {user_id: {eq: user_id}}})
    dispatch({type: nextToken ? UPDATE_MY_POSTS : FETCH_MY_POSTS, payload: res ? res.listPostTypes.items.map(post => ({id: post.post_id, imgSrc: post.thumbnail_img_src, DateTime: post.DateTime})) : []})
    dispatch({type: UPDATE_NEXT_TOKEN, payload: res.listPostTypes.nextToken ? res.listPostTypes.nextToken : ""})
  } catch (error) {
    console.log("error fetch my posts: ", error)
  }
}
export const fetchPostCount = async (dispatch, user_id) => {
  try {
    const res = await apiRequest(countPosts, {filter: {user_id: {eq: user_id}}, limit: 1000000})
    dispatch({type: UPDATE_USER, payload: {post_count: res ? res.listPostTypes.items.length : 0}})
  } catch (error) {
    console.log("error fetch post count: ", error)
  }
}

// Define Reducer
export const authReducer = createReducer(initialState, {
  [LOGIN_SUCCESS]: (state, {payload}) => ({...state, user: {...state.user, ...payload}, is_logged_in: true}),
  [LOGIN_FAILURE]: (state, {payload}) => ({...state, err_msg: payload}),
  [LOGOUT_SUCCESS]: () => initialState,
  [UPDATE_NEW_USER]: (state, {payload}) => ({...state, new_user: {...state.new_user, ...payload}}),
  [CANCEL_SIGNUP]: state => ({...state, new_user: initialState.new_user}),
  [UPDATE_USER]: (state, {payload}) => ({...state, user: {...state.user, ...payload}}),
  [FETCH_MY_POSTS]: (state, {payload}) => ({...state, user: {...state.user, posts: payload}}),
  [UPDATE_MY_POSTS]: (state, {payload}) => ({...state, user: {...state.user, posts: [...state.user.posts, ...payload]}}),
  [UPDATE_NEXT_TOKEN]: (state, {payload}) => ({...state, nextToken: payload})
})
