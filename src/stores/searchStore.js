import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest, camelToSnake} from "../helper/requestHelper"
import {listPostTypes, listProductTypes, listTagTypes} from "../graphql/queries"
import {items} from "../../mock/db"

export const initialState = {
  conditions: {},
  suggestionTags: [],
  suggestionProducts: [],
  searchResult: [],
  tmpResult: [],
  tmpConditions: {
    base_color: "",
    season: "",
    face_type: "",
    skin_type: "",
    color: "",
    glitter: "",
    country: "",
    makeup_categories: "",
    products: [],
    tags: []
  }
}

// Define Store
const searchStore = createContext(initialState)

// Define Types
const UPDATE_TMP_CONDITIONS = "UPDATE_TMP_CONDITIONS"
const FETCH_POSTS = "FETCH_POSTS"
const UPDATE_SEARCH_RESULT = "UPDATE_SEARCH_RESULT"
const UPDATE_CONDITIONS = "UPDATE_CONDITIONS"
const UPDATE_SUGGESTION_TAGS = "UPDATE_SUGGESTION_TAGS"
const UPDATE_SUGGESTION_PRODUCTS = "UPDATE_SUGGESTION_PRODUCTS"
const UPDATE_TMP_PRODUCTS = "UPDATE_TMP_PRODUCTS"


// Define ActionCreator
/* isToggleがtrueの場合、preTmpConditionsとnextConditionが同じ際、初期値をセットする */
export const updateTmpConditions = async (dispatch, preTmpConditions, nextCondition={}, isToggle=true) => {
  const payload = Object.fromEntries(Object.entries(nextCondition).map(([key, val]) => {
    const isClear = isToggle && preTmpConditions[key] === val
    const newVal = isClear ? initialState.tmpConditions[key] : val
    return [key, newVal]
  }))
  dispatch({type: UPDATE_TMP_CONDITIONS, payload})
  await fetchPosts(dispatch, {...preTmpConditions, ...payload})
}
export const fetchPosts = async (dispatch, tmpConditions) => {
  const filteredConditions = Object.fromEntries(Object.entries({...tmpConditions, products_id: tmpConditions.products.map(p => p.product_id)})
    .filter(([, val]) => Array.isArray(val) ? val.length > 0 : typeof val !== "undefined" && val !== "")
    .map(([key, val]) => (Array.isArray(val) ? ["and", val.map(item => ({[key]: {contains: item}}))] : [key, {eq: val}]))
  )
  const res = Object.keys(filteredConditions).length > 0
    ? await apiRequest(listPostTypes, {filter: filteredConditions})
    : await apiRequest(listPostTypes)
  dispatch({type: FETCH_POSTS, payload: res ? res.listPostTypes.items.map(post => ({id: post.post_id, imgSrc: post.thumbnail_img_src, DateTime: post.DateTime})) : []})
}
export const updateSearchResult = dispatch => {
  dispatch({type: UPDATE_SEARCH_RESULT})
}
export const updateConditions = dispatch => dispatch({type: UPDATE_CONDITIONS})
export const fetchTrendTags = async dispatch => {
  try {
    const response = await apiRequest(listTagTypes, {limit: 20})
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: response.listTagTypes.items})
  } catch (error) {
    console.log("error fetch trend tags: ", error)
  }
}
export const updateSuggestionTags = (dispatch, tags) => dispatch({type: UPDATE_SUGGESTION_TAGS, payload: tags})
export const fetchTags = async (dispatch, text) => {
  try {
    const response = await apiRequest(listTagTypes, {limit: 20, filter: {tag_name: {contains: text}}})
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: response.listTagTypes.items})
  } catch (error) {
    console.log("error fetch tags: ", error)
  }
}
export const fetchTrendProducts = async dispatch => {
  try {
    const response = await apiRequest(listProductTypes, {limit: 20})
    await dispatch({type: UPDATE_SUGGESTION_PRODUCTS, payload: response.listProductTypes.items})
  } catch (error) {
    console.log("error fetch trend products: ", error)
  }
}
export const updateTmpProducts = async (dispatch, product) => dispatch({type: UPDATE_TMP_PRODUCTS, payload: product})
export const fetchProducts = async (dispatch, text) => {
  try {
    const response = await apiRequest(listProductTypes, {limit: 20, filter: {product_name: {contains: text}}})
    await dispatch({type: UPDATE_SUGGESTION_PRODUCTS, payload: response.listProductTypes.items})
  } catch (error) {
    console.log("error fetch products: ", error)
  }
}


// Defin Provider
const {Provider} = searchStore
const SearchProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_TMP_CONDITIONS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, ...payload}}),
    [FETCH_POSTS]: (state, {payload}) => ({...state, tmpResult: payload}),
    [UPDATE_SEARCH_RESULT]: state => ({...state, searchResult: state.tmpResult}),
    [UPDATE_CONDITIONS]: state => ({...state, conditions: state.tmpConditions}),
    [UPDATE_SUGGESTION_TAGS]: (state, {payload}) => ({...state, suggestionTags: payload}),
    [UPDATE_SUGGESTION_PRODUCTS]: (state, {payload}) => ({...state, suggestionProducts: payload}),
    [UPDATE_TMP_PRODUCTS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, products: [...state.tmpConditions.products, payload]}})
  }), initialState)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}


export {searchStore, SearchProvider}