import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"

const initialState = {
  conditions: {},
  suggestionItems: [],
  searchResult: [],
  tmpResult: [],
  tmpConditions: {
    personalColor: false,
    faceType: false,
    color: "",
    country: "",
    parts: "",
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
// TODO: UPDATE_TMP_CONDITIONSにまとめて、検索条件変更のアクションをつくたほうがいいのでは？？
const UPDATE_TMP_CONDITIONS_PERSONAL_COLOR = "UPDATE_TMP_CONDITIONS_PERSONAL_COLOR"
const UPDATE_TMP_CONDITIONS_FACE_TYPE = "UPDATE_TMP_CONDITIONS_FACE_TYPE"
const UPDATE_TMP_CONDITIONS_COLOR = "UPDATE_TMP_CONDITIONS_COLOR"
const UPDATE_TMP_CONDITIONS_COUNTRY = "UPDATE_TMP_CONDITIONS_COUNTRY"
const UPDATE_TMP_CONDITIONS_PARTS = "UPDATE_TMP_CONDITIONS_PARTS"
const UPDATE_TMP_CONDITIONS_HAIR_STYLE = "UPDATE_TMP_CONDITIONS_HAIR_STYLE"
const UPDATE_TMP_CONDITIONS_ITEMS = "UPDATE_TMP_CONDITIONS_ITEMS"
const UPDATE_TMP_CONDITIONS_KEYWORDS = "UPDATE_TMP_CONDITIONS_KEYWORDS"
const UPDATE_SUGGESTION_ITEMS = "UPDATE_SUGGESTION_ITEMS"
const FETCH_POSTS = "FETCH_POSTS"
const UPDATE_SEARCH_RESULT = "UPDATE_SEARCH_RESULT"
const UPDATE_CONDITIONS = "UPDATE_CONDITIONS"
const FETCH_POST_DETAIL = "FETCH_POST_DETAIL"

// Define ActionCreator
export const updateTmpConditionsPersonalColor = (dispatch, personalColor) => dispatch({type: UPDATE_TMP_CONDITIONS_PERSONAL_COLOR, payload: personalColor})
export const updateTmpConditionsFaceType = (dispatch, faceType) => dispatch({type: UPDATE_TMP_CONDITIONS_FACE_TYPE, payload: faceType})
export const updateTmpConditionsColor = (dispatch, color) => dispatch({type: UPDATE_TMP_CONDITIONS_COLOR, payload: color})
export const updateTmpConditionsCountry = (dispatch, country) => dispatch({type: UPDATE_TMP_CONDITIONS_COUNTRY, payload: country})
export const updateTmpConditionsParts = (dispatch, parts) => dispatch({type: UPDATE_TMP_CONDITIONS_PARTS, payload: parts})
export const updateTmpConditionsHairStyle = (dispatch, hairStyle) => dispatch({type: UPDATE_TMP_CONDITIONS_HAIR_STYLE, payload: hairStyle})
export const updateTmpConditionsKeywords = (dispatch, keywords="") => dispatch({type: UPDATE_TMP_CONDITIONS_KEYWORDS, payload: keywords})
export const updateTmpConditionsItems = (dispatch, selectedItems, itemId) => {
  const newSelectedItems = selectedItems.includes(itemId)
    ? selectedItems.filter(selected => selected !== itemId)
    : [...selectedItems, itemId]
  dispatch({type: UPDATE_TMP_CONDITIONS_ITEMS, payload: newSelectedItems})
}
export const updateSuggestionItems = (dispatch, items) => dispatch({type: UPDATE_SUGGESTION_ITEMS, payload: items})
// eslint-disable-next-line complexity
export const fetchPosts = (dispatch, conditions={}) => {
  const {error, loading, data} = apiRequest(`${`{
    posts(
      ${conditions.keywords ? `keywords: ${conditions.keywords},` : ""}
      ${conditions.personalColor ? `personal_color: ${conditions.personalColor},` : ""}
      ${conditions.faceType ? `face_type: ${conditions.faceType},` : ""}
      ${conditions.color ? `color: ${conditions.color},` : ""}
      ${conditions.country ? `country: ${conditions.country},` : ""}
      ${conditions.parts ? `parts: ${conditions.parts},` : ""}
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
    [UPDATE_TMP_CONDITIONS_PERSONAL_COLOR]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, personalColor: payload}}),
    [UPDATE_TMP_CONDITIONS_FACE_TYPE]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, faceType: payload}}),
    [UPDATE_TMP_CONDITIONS_COLOR]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, color: payload}}),
    [UPDATE_TMP_CONDITIONS_COUNTRY]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, country: payload}}),
    [UPDATE_TMP_CONDITIONS_PARTS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, parts: payload}}),
    [UPDATE_TMP_CONDITIONS_HAIR_STYLE]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, hairStyle: payload}}),
    [UPDATE_TMP_CONDITIONS_ITEMS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, items: payload}}),
    [UPDATE_TMP_CONDITIONS_KEYWORDS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, keywords: payload}}),
    [UPDATE_SUGGESTION_ITEMS]: (state, {payload}) => ({...state, suggestionItems: payload}),
    [FETCH_POSTS]: (state, {payload}) => ({...state, tmpResult: payload}),
    [FETCH_POST_DETAIL]: (state, {payload}) => ({...state, post: payload}),
    [UPDATE_SEARCH_RESULT]: state => ({...state, searchResult: state.tmpResult}),
    [UPDATE_CONDITIONS]: state => ({...state, conditions: state.tmpConditions})
  }), initialState)
  console.log("State is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {searchStore, SearchProvider}