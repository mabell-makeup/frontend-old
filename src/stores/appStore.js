import React, {createContext, useReducer} from "react"
import {createReducer, formatMasterData} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {getMasterType} from "../graphql/queries"

export const initialState = {
  suggestionKeywords: [],
  masterData: {}
}

// Define Store
const appStore = createContext(initialState)

// Define Types
const UPDATE_SUGGESTION_KEYWORDS = "UPDATE_SUGGESTION_KEYWORDS"
const FETCH_MASTER_DATA = "FETCH_MASTER_DATA"

// Define ActionCreator
export const updateSuggestionKeywords = (dispatch, keywords) => dispatch({type: UPDATE_SUGGESTION_KEYWORDS, payload: keywords})
export const fetchMasterData = async dispatch => {
  const masterData = await apiRequest(getMasterType, {id: 0}, true, "getMasterType")
  dispatch({type: FETCH_MASTER_DATA, payload: formatMasterData(masterData)})
}

// Defin Provider
const {Provider} = appStore
const AppProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_SUGGESTION_KEYWORDS]: (state, {payload}) => ({...state, suggestionKeywords: payload}),
    [FETCH_MASTER_DATA]: (state, {payload}) => ({...state, masterData: payload})
  }), initialState)
  console.log("AppState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {appStore, AppProvider}