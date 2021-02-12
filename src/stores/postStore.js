import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {createPostType} from "../graphql/mutations"
import {listTagTypes} from "../graphql/queries"

export const initialState = {
  tmpPost: {
    tags: ""
  },
  suggestionTags: []
}

// Define Store
const postStore = createContext(initialState)

// Define Types
const CREATE_POST = "CREATE_POST"
const UPDATE_SUGGESTION_TAGS = "UPDATE_SUGGESTION_TAGS"

// Define ActionCreator
export const createPost = async post => {
  try {
    await apiRequest(createPostType, {input: post})
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

// Defin Provider
const {Provider} = postStore
const PostProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [CREATE_POST]: (state, {payload}) => ({...state, ...payload}),
    [UPDATE_SUGGESTION_TAGS]: (state, {payload}) => ({...state, suggestionTags: payload})
  }), initialState)
  console.log("PostState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postStore, PostProvider}