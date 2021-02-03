import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"

export const initialState = {
  suggestionKeywords: []
}

// Define Store
const appStore = createContext(initialState)

// Define Types
const UPDATE_SUGGESTION_KEYWORDS = "UPDATE_SUGGESTION_KEYWORDS"

// Define ActionCreator
export const updateSuggestionKeywords = (dispatch, keywords) => dispatch({type: UPDATE_SUGGESTION_KEYWORDS, payload: keywords})

// Defin Provider
const {Provider} = appStore
const AppProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_SUGGESTION_KEYWORDS]: (state, {payload}) => ({...state, suggestionKeywords: payload})
  }), initialState)
  console.log("AppState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {appStore, AppProvider}