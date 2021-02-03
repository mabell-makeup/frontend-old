import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"

export const initialState = {
  data: {
  }
}

// Define Store
const postStore = createContext(initialState)

// Define Types
const ADD_POST_DATA = "ADD_POST_DATA"

// Define ActionCreator
export const addPostData = (dispatch, data) => dispatch({type: ADD_POST_DATA, payload: data})


// Defin Provider
const {Provider} = postStore
const PostProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [ADD_POST_DATA]: (state, {payload}) => ({...state, data: {...state.data, ...payload}})
  }), initialState)
  console.log("PostState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postStore, PostProvider}