import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"

const initialState = {
  conditions: {
    userInfo: {
      personalColor: false,
      faceType: false
    },
    color: "",
    country: "",
    parts: "",
    hairStyle: "",
    items: []
  },
  suggestionItems: [],
  searchResult: [],
  tmpResult: []
}

// Define Store
const searchStore = createContext(initialState)

// Define Types
const UPDATE_CONDITIONS_USER_INFO = "UPDATE_CONDITIONS_USER_INFO"
const UPDATE_CONDITIONS_COLOR = "UPDATE_CONDITIONS_COLOR"
const UPDATE_CONDITIONS_COUNTRY = "UPDATE_CONDITIONS_COUNTRY"
const UPDATE_CONDITIONS_PARTS = "UPDATE_CONDITIONS_PARTS"
const UPDATE_CONDITIONS_HAIR_STYLE = "UPDATE_CONDITIONS_HAIR_STYLE"
const UPDATE_CONDITIONS_ITEMS = "UPDATE_CONDITIONS_ITEMS"
const UPDATE_SUGGESTION_ITEMS = "UPDATE_SUGGESTION_ITEMS"
const FETCH_POSTS = "FETCH_POSTS"
const UPDATE_SEARCH_RESULT = "UPDATE_SEARCH_RESULT"

// Define ActionCreator
export const updateConditionsUserInfo = (dispatch, userInfo) => dispatch({type: UPDATE_CONDITIONS_USER_INFO, payload: userInfo})
export const updateConditionsColor = (dispatch, color) => dispatch({type: UPDATE_CONDITIONS_COLOR, payload: color})
export const updateConditionsCountry = (dispatch, country) => dispatch({type: UPDATE_CONDITIONS_COUNTRY, payload: country})
export const updateConditionsParts = (dispatch, parts) => dispatch({type: UPDATE_CONDITIONS_PARTS, payload: parts})
export const updateConditionsHairStyle = (dispatch, hairStyle) => dispatch({type: UPDATE_CONDITIONS_HAIR_STYLE, payload: hairStyle})
export const updateConditionsItems = (dispatch, selectedItems, itemId) => {
  const newSelectedItems = selectedItems.includes(itemId)
    ? selectedItems.filter(selected => selected !== itemId)
    : [...selectedItems, itemId]
  dispatch({type: UPDATE_CONDITIONS_ITEMS, payload: newSelectedItems})
}
export const updateSuggestionItems = (dispatch, items) => dispatch({type: UPDATE_SUGGESTION_ITEMS, payload: items})
export const fetchPosts = (dispatch, conditions) => {
  const {error, loading, data} = apiRequest(`{
    posts(
      personal_color: "yellowAutumn",
      faceType: "coolCasual",
      color: "#fff",
      country: "japan",
      parts: "eyeMake",
      hairStyle: "short",
      items: [1, 4, 5]
    ) {
      post_id
      thumbnail_img_src
      }
  }`)
  !loading && !error && dispatch({type: FETCH_POSTS, payload: data.posts.map(post => ({id: post.post_id, imgSrc: post.thumbnail_img_src}))})
}
export const updateSearchResult = (dispatch) => dispatch({type: UPDATE_SEARCH_RESULT})


// Defin Provider
const {Provider} = searchStore
const SearchProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_CONDITIONS_USER_INFO]: (state, {payload}) => ({...state, conditions: {...state.conditions, userInfo: {...state.conditions.userInfo, ...payload}}}),
    [UPDATE_CONDITIONS_COLOR]: (state, {payload}) => ({...state, conditions: {...state.conditions, color: payload}}),
    [UPDATE_CONDITIONS_COUNTRY]: (state, {payload}) => ({...state, conditions: {...state.conditions, country: payload}}),
    [UPDATE_CONDITIONS_PARTS]: (state, {payload}) => ({...state, conditions: {...state.conditions, parts: payload}}),
    [UPDATE_CONDITIONS_HAIR_STYLE]: (state, {payload}) => ({...state, conditions: {...state.conditions, hairStyle: payload}}),
    [UPDATE_CONDITIONS_ITEMS]: (state, {payload}) => ({...state, conditions: {...state.conditions, items: payload}}),
    [UPDATE_SUGGESTION_ITEMS]: (state, {payload}) => ({...state, suggestionItems: payload}),
    [FETCH_POSTS]: (state, {payload}) => ({...state, tmpResult: payload}),
    [UPDATE_SEARCH_RESULT]: state => ({...state, searchResult: state.tmpResult})
  }), initialState)
  console.log("State is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {searchStore, SearchProvider}