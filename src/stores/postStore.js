import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"

export const initialState = {
  tags: ""
}

// Define Store
const postStore = createContext(initialState)

// Define Types
const ADD_POST_DATA = "ADD_POST_DATA"

// Define ActionCreator
export const updatePostData = (dispatch, data) => dispatch({type: ADD_POST_DATA, payload: data})


// Defin Provider
const {Provider} = postStore
const PostProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [ADD_POST_DATA]: (state, {payload}) => ({...state, ...payload})
  }), initialState)
  console.log("PostState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postStore, PostProvider}