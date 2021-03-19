import React, {createContext, useReducer} from "react"
import {createReducer, formatMasterData} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {getMasterType} from "../graphql/queries"

export const initialState = {
  masterData: {},
  error: {
    errorType: false,
    message: ""
  }
}

// Define Store
const appStore = createContext(initialState)

// Define Types
const FETCH_MASTER_DATA = "FETCH_MASTER_DATA"
const CLEAR_ERROR = "CLEAR_ERROR"
const ADD_ERROR = "ADD_ERROR"

// Define ActionCreator
export const fetchMasterData = async dispatch => {
  const masterData = await apiRequest(getMasterType, {id: 0}, true, "getMasterType")
  dispatch({type: FETCH_MASTER_DATA, payload: formatMasterData(masterData)})
}
export const clearError = async dispatch => dispatch({type: CLEAR_ERROR})
export const addError = (dispatch, error={errorType: "", message: ""}) => {
  dispatch({type: ADD_ERROR, payload: error})
}

// Define Reducer
export const appReducer = createReducer(initialState, {
  [FETCH_MASTER_DATA]: (state, {payload}) => ({...state, masterData: payload}),
  [CLEAR_ERROR]: state => ({...state, error: initialState.error}),
  [ADD_ERROR]: (state, {payload}) => ({...state, error: payload})
})
