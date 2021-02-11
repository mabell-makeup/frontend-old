import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {createPostType} from "../graphql/mutations"

export const initialState = {
  tags: ""
}

// Define Store
const postStore = createContext(initialState)

// Define Types
const CREATE_POST = "CREATE_POST"

// Define ActionCreator
export const createPost = async post => {
  try {
    await apiRequest(createPostType, {input: post})
  } catch (error) {
    console.log("error create post: ", error)
  }
}

// Defin Provider
const {Provider} = postStore
const PostProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [CREATE_POST]: (state, {payload}) => ({...state, ...payload})
  }), initialState)
  console.log("PostState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postStore, PostProvider}