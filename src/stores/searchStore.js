import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"

const initialState = {
  conditions: {
    userInfo: {
      personalColor: false,
      faceType: false
    },
    color: "",
    country: "",
    parts: "",
    hairStyle: ""
  }
}

// Define Store
const searchStore = createContext(initialState)

// Define Types
const UPDATE_CONDITIONS_USER_INFO = "UPDATE_CONDITIONS_USER_INFO"
const UPDATE_CONDITIONS_COLOR = "UPDATE_CONDITIONS_COLOR"
const UPDATE_CONDITIONS_COUNTRY = "UPDATE_CONDITIONS_COUNTRY"
const UPDATE_CONDITIONS_PARTS = "UPDATE_CONDITIONS_PARTS"
const UPDATE_CONDITIONS_HAIR_STYLE = "UPDATE_CONDITIONS_HAIR_STYLE"

// Define ActionCreator
export const updateConditionsUserInfo = (dispatch, userInfo) => dispatch({type: UPDATE_CONDITIONS_USER_INFO, payload: userInfo})
export const updateConditionsColor = (dispatch, color) => dispatch({type: UPDATE_CONDITIONS_COLOR, payload: color})
export const updateConditionsCountry = (dispatch, country) => dispatch({type: UPDATE_CONDITIONS_COUNTRY, payload: country})
export const updateConditionsParts = (dispatch, parts) => dispatch({type: UPDATE_CONDITIONS_PARTS, payload: parts})
export const updateConditionsHairStyle = (dispatch, hairStyle) => dispatch({type: UPDATE_CONDITIONS_HAIR_STYLE, payload: hairStyle})


// Defin Provider
const {Provider} = searchStore
const SearchProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_CONDITIONS_USER_INFO]: (state, {payload}) => ({conditions: {...state.conditions, userInfo: {...state.conditions.userInfo, ...payload}}}),
    [UPDATE_CONDITIONS_COLOR]: (state, {payload}) => ({conditions: {...state.conditions, color: payload}}),
    [UPDATE_CONDITIONS_COUNTRY]: (state, {payload}) => ({conditions: {...state.conditions, country: payload}}),
    [UPDATE_CONDITIONS_PARTS]: (state, {payload}) => ({conditions: {...state.conditions, parts: payload}}),
    [UPDATE_CONDITIONS_HAIR_STYLE]: (state, {payload}) => ({conditions: {...state.conditions, hairStyle: payload}})
  }), initialState)
  console.log("State is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {searchStore, SearchProvider}