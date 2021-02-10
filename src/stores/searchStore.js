import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest, camelToSnake} from "../helper/requestHelper"
import {listPostTypes} from "../graphql/queries"

export const initialState = {
  conditions: {},
  searchResult: [],
  tmpResult: [],
  tmpConditions: {
    baseColor: "",
    season: "",
    faceType: "",
    skinType: "",
    color: "",
    lame: "",
    country: "",
    makeUpCategory: "",
    hairStyle: "",
    items: [],
    keywords: ""
  }
}

// Define Store
const searchStore = createContext(initialState)

// Define Types
const UPDATE_TMP_CONDITIONS = "UPDATE_TMP_CONDITIONS"
const FETCH_POSTS = "FETCH_POSTS"
const UPDATE_SEARCH_RESULT = "UPDATE_SEARCH_RESULT"
const UPDATE_CONDITIONS = "UPDATE_CONDITIONS"

// Define ActionCreator
/* isToggleがtrueの場合、preTmpConditionsとnextConditionが同じ際、初期値をセットする */
export const updateTmpConditions = (dispatch, preTmpConditions, nextCondition, isToggle=true) => {
  Object.entries(nextCondition).map(async ([key, val]) => {
    const isClear = isToggle && preTmpConditions[key] === val
    const payload = isClear ? {[key]: initialState.tmpConditions[key]} : {[key]: val}
    dispatch({type: UPDATE_TMP_CONDITIONS, payload})
    await fetchPosts(dispatch, payload)
  })
  
}
export const fetchPosts = async (dispatch, tmpConditions) => {
  const filteredConditions = Object.fromEntries(Object.entries(tmpConditions)
    // eslint-disable-next-line no-unused-vars
    .filter(([key, val]) => typeof val !== "undefined")
    .map(([key, val]) => ([camelToSnake(key), {eq: val}]))
  )
  const res = Object.keys(filteredConditions).length > 0
    ? await apiRequest(listPostTypes, {filter: filteredConditions})
    : await apiRequest(listPostTypes)
  dispatch({type: FETCH_POSTS, payload: res ? res.listPostTypes.items.map(post => ({id: post.post_id, imgSrc: post.thumbnail_img_src})) : []})
}
export const updateSearchResult = dispatch => dispatch({type: UPDATE_SEARCH_RESULT})
export const updateConditions = dispatch => dispatch({type: UPDATE_CONDITIONS})

// Defin Provider
const {Provider} = searchStore
const SearchProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_TMP_CONDITIONS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, ...payload}}),
    [FETCH_POSTS]: (state, {payload}) => ({...state, tmpResult: payload}),
    [UPDATE_SEARCH_RESULT]: state => ({...state, searchResult: state.tmpResult}),
    [UPDATE_CONDITIONS]: state => ({...state, conditions: state.tmpConditions})
  }), initialState)
  console.log("SearchState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {searchStore, SearchProvider}