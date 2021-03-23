import {createReducer, formatMasterData} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {getMasterType, listProductTypes, listTagTypes} from "../graphql/queries"
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
  const masterData = await apiRequest(getMasterType, {id: 0}, true, "getMasterType")
  dispatch({type: FETCH_MASTER_DATA, payload: formatMasterData(masterData)})
}
export const clearError = async dispatch => dispatch({type: CLEAR_ERROR})
export const addError = (dispatch, error={errorType: "", message: ""}) => {
  dispatch({type: ADD_ERROR, payload: error})
}
export const fetchTrendTags = async dispatch => {
  try {
    const response = await apiRequest(listTagTypes, {limit: 20})
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: response.listTagTypes.items})
  } catch (error) {
    console.log("error fetch trend tags: ", error)
  }
}
export const fetchTags = async (dispatch, text) => {
  try {
    const response = await apiRequest(listTagTypes, {limit: 20, filter: {tag_name: {contains: text}}})
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: response.listTagTypes.items})
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
    const response = await apiRequest(listProductTypes, {limit: 20, filter: {product_name: {contains: text}}})
    await dispatch({type: UPDATE_SUGGESTION_PRODUCTS, payload: response.listProductTypes.items})
  } catch (error) {
    console.log("error fetch products: ", error)
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


// Define Reducer
export const appReducer = createReducer(initialState, {
  [FETCH_MASTER_DATA]: (state, {payload}) => ({...state, masterData: payload}),
  [CLEAR_ERROR]: state => ({...state, error: initialState.error}),
  [ADD_ERROR]: (state, {payload}) => ({...state, error: payload}),
  [UPDATE_SUGGESTION_TAGS]: (state, {payload}) => ({...state, suggestionTags: payload}),
  [UPDATE_SUGGESTION_PRODUCTS]: (state, {payload}) => ({...state, suggestionProducts: payload})
})
