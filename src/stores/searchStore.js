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
    lame: false,
    country: "",
    part: "",
    hairStyle: "",
    items: [],
    keywords: ""
  },
  post: {
    user_id: Number,
    user_name: "",
    img_src_list: [],
    items: [],
    tags: [],
    description: "",
    page_views: Number
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
const FETCH_POST_DETAIL = "FETCH_POST_DETAIL"

// Define ActionCreator
export const updateTmpConditions = (dispatch, preTmpConditions, nextCondition) => {
  Object.entries(nextCondition).map(([key, val]) => {
    const isClear = preTmpConditions[key] === val
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
      ${conditions.part ? `part: ${conditions.part},` : ""}
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
export const fetchPostDetail = (dispatch, id) => {
  const {error, loading, data} = apiRequest(`{
    posts(id: ${id}) {
      user_id
      user_name
      img_src_list
      items
      tags
      description
      page_views
    }
  }`)
  !loading && !error && dispatch({type: FETCH_POST_DETAIL, payload: data})
}


// Defin Provider
const {Provider} = searchStore
const SearchProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_TMP_CONDITIONS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, ...payload}}),
    [UPDATE_SUGGESTION_KEYWORDS]: (state, {payload}) => ({...state, suggestionKeywords: payload}),
    [FETCH_POSTS]: (state, {payload}) => ({...state, tmpResult: payload}),
    [FETCH_POST_DETAIL]: (state, {payload}) => ({...state, post: payload}),
    [UPDATE_SEARCH_RESULT]: state => ({...state, searchResult: state.tmpResult}),
    [UPDATE_CONDITIONS]: state => ({...state, conditions: state.tmpConditions})
  }), initialState)
  console.log("State is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {searchStore, SearchProvider}