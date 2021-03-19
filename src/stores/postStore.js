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
    makeup_categories: "",
    country: "",
    description: "",
    img_src_list: [],
    thumbnail_img_src: ""
  },
  suggestionTags: [],
  suggestionProducts: []
}

// Define Store
const postStore = createContext(initialState)

// Define Types
const UPDATE_SUGGESTION_TAGS = "UPDATE_SUGGESTION_TAGS"
const UPDATE_SUGGESTION_PRODUCTS = "UPDATE_SUGGESTION_PRODUCTS"
const UPDATE_TMP_POST = "UPDATE_TMP_POST"
const UPDATE_TMP_TAGS = "UPDATE_TMP_TAGS"
const UPDATE_TMP_PRODUCTS = "UPDATE_TMP_PRODUCTS"

// Define ActionCreator
export const createPost = async tmpPost => {
  try {
    const postData = Object.fromEntries(Object.entries(tmpPost).filter(([, value]) => typeof value !== "undefined" && value !== null && value !== ""))
    await apiRequest(createPostType, {input: postData})
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
export const updateTmpPost = (dispatch, preTmpPost, nextCondition, isToggle=true) => {
  Object.entries(nextCondition).map(async ([key, val]) => {
    const isClear = isToggle && preTmpPost[key] === val
    const payload = isClear ? {[key]: initialState.tmpPost[key]} : {[key]: val}
    dispatch({type: UPDATE_TMP_POST, payload})
  })
}
export const updateTmpTags = async (dispatch, preTags, newTag) => {
  const nextTags = preTags.includes(newTag) ? preTags.filter(tag => tag !== newTag) : [...preTags, newTag]
  dispatch({type: UPDATE_TMP_TAGS, payload: nextTags})
}
export const fetchTags = async (dispatch, text) => {
  try {
    const response = await apiRequest(listTagTypes, {limit: 20, filter: {tag_name: {contains: text}}})
    await dispatch({type: UPDATE_SUGGESTION_TAGS, payload: response.listTagTypes.items})
  } catch (error) {
    console.log("error fetch tags: ", error)
  }
}
export const createTag = async (dispatch, preTags, text) => {
  try {
    await apiRequest(createTagType, {input: {tag_name: text, count: 0}})
    updateTmpTags(dispatch, preTags, text)
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
export const updateTmpProducts = async (dispatch, preProducts, newProduct) => {
  const nextProducts = preProducts.map(p => p.product_id).includes(newProduct.product_id) ? preProducts.filter(p => p.product_id !== newProduct.product_id) : [...preProducts, newProduct]
  dispatch({type: UPDATE_TMP_PRODUCTS, payload: nextProducts})
}


// Define Reducer
export const postReducer = createReducer(initialState, {
  [UPDATE_SUGGESTION_TAGS]: (state, {payload}) => ({...state, suggestionTags: payload}),
  [UPDATE_SUGGESTION_PRODUCTS]: (state, {payload}) => ({...state, suggestionProducts: payload}),
  [UPDATE_TMP_POST]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, ...payload}}),
  [UPDATE_TMP_TAGS]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, tags: payload}}),
  [UPDATE_TMP_PRODUCTS]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, products: payload}})
})
