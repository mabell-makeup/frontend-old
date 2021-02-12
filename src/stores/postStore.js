import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {createPostType} from "../graphql/mutations"
import {listTagTypes} from "../graphql/queries"

export const initialState = {
  tmpPost: {
    tags: []
  },
  suggestionTags: []
}

// Define Store
const postStore = createContext(initialState)

// Define Types
const UPDATE_SUGGESTION_TAGS = "UPDATE_SUGGESTION_TAGS"
const UPDATE_TMP_POST = "UPDATE_TMP_POST"
const UPDATE_TMP_TAGS = "UPDATE_TMP_TAGS"

// Define ActionCreator
export const createPost = async tmpPost => {
  try {
    await apiRequest(createPostType, {input: tmpPost})
  } catch (error) {
    console.log("error create post: ", error)
  }
}
export const fetchTrendTags = async dispatch => {
  try {
    const response = await apiRequest(listTagTypes, {limit: 20})
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: response.listTagTypes.items})
  } catch (error) {
    console.log("error fetch trend tags: ", error)
  }
}
export const updateTmpPost = async (dispatch, tmpPost) => dispatch({type: UPDATE_TMP_POST, payload: tmpPost})
export const updateTmpTags = async (dispatch, tags) => dispatch({type: UPDATE_TMP_TAGS, payload: tags})

// Defin Provider
const {Provider} = postStore
const PostProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_SUGGESTION_TAGS]: (state, {payload}) => ({...state, suggestionTags: payload}),
    [UPDATE_TMP_POST]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, ...payload}}),
    [UPDATE_TMP_TAGS]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, tags: [...state.tmpPost.tags, payload]}})
  }), initialState)
  console.log("PostState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postStore, PostProvider}