import {createReducer} from "../helper/storeHelper"
import {apiRequest, apiRequest2, encodeQuery} from "../helper/requestHelper"
import {listTagTypes} from "../graphql/queries"
import {createTagType} from "../graphql/mutations"

export const initialState = {
  masterData: {},
  suggestionTags: [],
  suggestionProducts: [],
  error: {
    errorType: false,
    message: ""
  }
}

// Define Types
const FETCH_MASTER_DATA = "FETCH_MASTER_DATA"
const CLEAR_ERROR = "CLEAR_ERROR"
const ADD_ERROR = "ADD_ERROR"
const UPDATE_SUGGESTION_TAGS = "UPDATE_SUGGESTION_TAGS"
const UPDATE_SUGGESTION_PRODUCTS = "UPDATE_SUGGESTION_PRODUCTS"

// Define ActionCreator
export const fetchMasterData = async dispatch => {
  const res = await apiRequest2("/master")
  dispatch({type: FETCH_MASTER_DATA, payload: res.master})
}
export const clearError = async dispatch => dispatch({type: CLEAR_ERROR})
export const addError = (dispatch, error={errorType: "", message: ""}) => {
  dispatch({type: ADD_ERROR, payload: error})
}
export const fetchTrendTags = async dispatch => {
  try {
    const queryString = encodeQuery({order_by: "CREATED_AT_DESC"})
    const res = await apiRequest2(`/tags?${queryString}`)
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: res.items})
  } catch (error) {
    console.log("error fetch trend tags: ", error)
  }
}
export const fetchTags = async (dispatch, text) => {
  try {
    const queryString = encodeQuery({q: text})
    const res = await apiRequest2(`/tags?${queryString}`)
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: res.items})
  } catch (error) {
    console.log("error fetch tags: ", error)
  }
}
export const createTag = async (dispatch, preTags, text, updateTmpTagsFunc) => {
  try {
    await apiRequest(createTagType, {input: {tag_name: text, count: 0}})
    updateTmpTagsFunc(dispatch, preTags, text)
  } catch (error) {
    console.log("error create tag: ", error)
  }
}
export const fetchProducts = async (dispatch, text) => {
  try {
    const queryString = encodeQuery({q: text})
    const res = await apiRequest2(`/products?${queryString}`)
    console.log(res.items)
    await dispatch({type: UPDATE_SUGGESTION_PRODUCTS, payload: res.items})
  } catch (error) {
    console.log("error fetch products: ", error)
  }
}
export const fetchTrendProducts = async dispatch => {
  try {
    const queryString = encodeQuery({order_by: "CREATED_AT_DESC"})
    const res = await apiRequest2(`/products?${queryString}`)
    console.log(res.items)
    await dispatch({type: UPDATE_SUGGESTION_PRODUCTS, payload: res.items})
  } catch (error) {
    console.log("error fetch trend products: ", error)
  }
}


// Define Reducer
export const appReducer = createReducer(initialState, {
  [FETCH_MASTER_DATA]: (state, {payload}) => ({...state, masterData: payload}),
  [CLEAR_ERROR]: state => ({...state, error: initialState.error}),
  [ADD_ERROR]: (state, {payload}) => ({...state, error: payload}),
  [UPDATE_SUGGESTION_TAGS]: (state, {payload}) => ({...state, suggestionTags: payload}),
  [UPDATE_SUGGESTION_PRODUCTS]: (state, {payload}) => ({...state, suggestionProducts: payload})
})
