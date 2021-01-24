import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"

export const initialState = {
  conditions: {},
  suggestionKeywords: [],
  searchResult: [],
  tmpResult: [],
  tmpConditions: {
    target: "makeup",
    personalColor: {baseColor: "", season: ""},
    faceType: "",
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
const UPDATE_SUGGESTION_KEYWORDS = "UPDATE_SUGGESTION_KEYWORDS"
const FETCH_POSTS = "FETCH_POSTS"
const UPDATE_SEARCH_RESULT = "UPDATE_SEARCH_RESULT"
const UPDATE_CONDITIONS = "UPDATE_CONDITIONS"

// Define ActionCreator
/* isToggleがtrueの場合、preTmpConditionsとnextConditionが同じ際、初期値をセットする */
export const updateTmpConditions = (dispatch, preTmpConditions, nextCondition, isToggle=true) => {
  Object.entries(nextCondition).map(([key, val]) => {
    const isClear = isToggle && preTmpConditions[key] === val
    dispatch({type: UPDATE_TMP_CONDITIONS, payload: isClear ? {[key]: initialState.tmpConditions[key]} : {[key]: val}})
  })
}
export const updateSuggestionKeywords = (dispatch, keywords) => dispatch({type: UPDATE_SUGGESTION_KEYWORDS, payload: keywords})
// eslint-disable-next-line complexity
export const fetchPosts = (dispatch, conditions={}) => {
  const {error, loading, data} = apiRequest(`${`{
    posts(
      ${conditions.keywords ? `keywords: ${conditions.keywords},` : ""}
      ${conditions.personalColor ? `personal_color: ${conditions.personalColor},` : ""}
      ${conditions.faceType ? `face_type: ${conditions.faceType},` : ""}
      ${conditions.color ? `color: ${conditions.color},` : ""}
      ${conditions.country ? `country: ${conditions.country},` : ""}
      ${conditions.makeUpCategory ? `makeUpCategory: ${conditions.makeUpCategory},` : ""}
      ${conditions.hairStyle ? `hair_style: ${conditions.hairStyle},` : ""}
      ${conditions.items ? `hair_style: [${conditions.items.join(",")}],` : ""}
      ${conditions.order ? `order: ${conditions.order},` : ""}`.slice(0, -1)}
    ) {
      post_id
      thumbnail_img_src
      }
  }`)
  !loading && !error && dispatch({type: FETCH_POSTS, payload: data.posts.map(post => ({id: post.post_id, imgSrc: post.thumbnail_img_src}))})
}
export const updateSearchResult = dispatch => dispatch({type: UPDATE_SEARCH_RESULT})
export const updateConditions = dispatch => dispatch({type: UPDATE_CONDITIONS})

// Defin Provider
const {Provider} = searchStore
const SearchProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_TMP_CONDITIONS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, ...payload}}),
    [UPDATE_SUGGESTION_KEYWORDS]: (state, {payload}) => ({...state, suggestionKeywords: payload}),
    [FETCH_POSTS]: (state, {payload}) => ({...state, tmpResult: payload}),
    [UPDATE_SEARCH_RESULT]: state => ({...state, searchResult: state.tmpResult}),
    [UPDATE_CONDITIONS]: state => ({...state, conditions: state.tmpConditions})
  }), initialState)
  console.log("SearchState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {searchStore, SearchProvider}