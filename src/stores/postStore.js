import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {createPostType, createTagType} from "../graphql/mutations"
import {listProductTypes, listTagTypes} from "../graphql/queries"

export const initialState = {
  tmpPost: {
    base_color: "",
    color: "",
    face_type: "",
    glitter: "",
    products: [],
    season: "",
    skin_type: "",
    tags: [],
    makeup_categories: ""
  },
  suggestionTags: [],
  suggestionProducts: []
}

// Define Store
const postStore = createContext(initialState)

// Define Types
const UPDATE_SUGGESTION_TAGS = "UPDATE_SUGGESTION_TAGS"
const UPDATE_SUGGESTION_ITEMS = "UPDATE_SUGGESTION_ITEMS"
const UPDATE_TMP_POST = "UPDATE_TMP_POST"
const UPDATE_TMP_TAGS = "UPDATE_TMP_TAGS"
const UPDATE_TMP_ITEMS = "UPDATE_TMP_ITEMS"

// Define ActionCreator
export const createPost = async tmpPost => {
  try {
    await apiRequest(createPostType, {input: tmpPost})
  } catch (error) {
    console.log("error create post: ", error)
  }
}
export const fetchTrendTags = async dispatch => {
  try {
    const response = await apiRequest(listTagTypes, {limit: 20})
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: response.listTagTypes.items})
  } catch (error) {
    console.log("error fetch trend tags: ", error)
  }
}
/* isToggleがtrueの場合、preTmpConditionsとnextConditionが同じ際、初期値をセットする */
export const updateTmpPost = (dispatch, preTmpPost, nextCondition, isToggle=true) => {
  Object.entries(nextCondition).map(async ([key, val]) => {
    const isClear = isToggle && preTmpPost[key] === val
    const payload = isClear ? {[key]: initialState.tmpPost[key]} : {[key]: val}
    dispatch({type: UPDATE_TMP_POST, payload})
  })
}
export const updateTmpTags = async (dispatch, tag) => dispatch({type: UPDATE_TMP_TAGS, payload: tag})
export const fetchTags = async (dispatch, text) => {
  try {
    const response = await apiRequest(listTagTypes, {limit: 20, filter: {tag_name: {contains: text}}})
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: response.listTagTypes.items})
  } catch (error) {
    console.log("error fetch tags: ", error)
  }
}
export const createTag = async (dispatch, text) => {
  try {
    await apiRequest(createTagType, {input: {tag_name: text, count: 0}})
    updateTmpTags(dispatch, text)
  } catch (error) {
    console.log("error create tag: ", error)
  }
}
export const fetchProducts = async (dispatch, text) => {
  try {
    const response = await apiRequest(listProductTypes, {limit: 20, filter: {product_name: {contains: text}}})
    await dispatch({type: UPDATE_SUGGESTION_ITEMS, payload: response.listProductTypes.items})
  } catch (error) {
    console.log("error fetch products: ", error)
  }
}
export const fetchTrendProducts = async dispatch => {
  try {
    const response = await apiRequest(listProductTypes, {limit: 20})
    await dispatch({type: UPDATE_SUGGESTION_ITEMS, payload: response.listProductTypes.items})
  } catch (error) {
    console.log("error fetch trend products: ", error)
  }
}
export const updateTmpProducts = async (dispatch, product) => dispatch({type: UPDATE_TMP_ITEMS, payload: product})


// Defin Provider
const {Provider} = postStore
const PostProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [UPDATE_SUGGESTION_TAGS]: (state, {payload}) => ({...state, suggestionTags: payload}),
    [UPDATE_SUGGESTION_ITEMS]: (state, {payload}) => ({...state, suggestionProducts: payload}),
    [UPDATE_TMP_POST]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, ...payload}}),
    [UPDATE_TMP_TAGS]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, tags: [...state.tmpPost.tags, payload]}}),
    [UPDATE_TMP_ITEMS]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, products: [...state.tmpPost.products, payload]}})
  }), initialState)
  console.log("PostState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postStore, PostProvider}