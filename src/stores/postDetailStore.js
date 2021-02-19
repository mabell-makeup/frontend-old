import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {getPostType, getProductType, getUserType, listPostTypes, listPostViewTypes} from "../graphql/queries"
import {createPostViewType} from "../graphql/mutations"

export const initialState = {
  post: {
    user_id: Number,
    user_name: "",
    user_nickname: "",
    img_src_list: [],
    item_id_list: [],
    tags: [],
    description: "",
    page_views: Number,
    favorite: false
  },
  products: [],
  postUser: {
    posts: []
  }
}

// Define Store
const postDetailStore = createContext(initialState)

// Define Types
const FETCH_POST_DETAIL = "FETCH_POST_DETAIL"
const FETCH_POST_USER = "FETCH_POST_USER"
const UPDATE_FAVORITE_POST = "UPDATE_FAVORITE_POST"
const FETCH_PRODUCT_DETAIL = "FETCH_PRODUCT_DETAIL"
const FETCH_USER_POSTS = "FETCH_USER_POSTS"
const UPDATE_POST_DETAIL = "UPDATE_POST_DETAIL"

// Define ActionCreator
export const fetchPostDetail = async (dispatch, post_id, DateTime) => {
  try {
    const post = await apiRequest(getPostType, {post_id, DateTime})
    dispatch({type: FETCH_POST_DETAIL, payload: post.getPostType})
    const user = await apiRequest(getUserType, {user_id: post.getPostType.user_id})
    dispatch({type: FETCH_POST_USER, payload: user.getUserType})
    fetchViewCount(dispatch, post.getPostType.post_id)
    addViewCount(post.getPostType.post_id)
  } catch (error) {
    console.log("fetch post detail error:", error)
  }
}
export const updateFavoritePost = async (dispatch, post_id, handleFavorite) => {
  const data = await apiRequest(`{
    updateFavoritePost(post_id: ${post_id}, handle: ${handleFavorite}) {
      result
    }
  }`)
  dispatch({type: UPDATE_FAVORITE_POST, payload: data.result ? handleFavorite : false})
}
export const fetchProductDetails = async (dispatch, products_id) => {
  try {
    const products = await Promise.all(products_id.map(async product_id => apiRequest(getProductType, {product_id})))
    dispatch({type: FETCH_PRODUCT_DETAIL, payload: products.map(p => p.getProductType)})
  } catch (error) {
    console.log("fetch product details error:", error)
  }
}
export const fetchUserPosts = async (dispatch, user_id) => {
  try {
    const res = await apiRequest(listPostTypes, {filter: {user_id: {eq: user_id}}})
    dispatch({type: FETCH_USER_POSTS, payload: res ? res.listPostTypes.items.map(post => ({id: post.post_id, imgSrc: post.thumbnail_img_src})) : []})
  } catch (error) {
    console.log("error fetch my posts: ", error)
  }
}
export const addViewCount = post_id => {
  try {
    apiRequest(createPostViewType, {input: {post_id}})
  } catch (error) {
    console.log("error add view count: ", error)
  }
}
export const fetchViewCount = async (dispatch, post_id) => {
  try {
    const view = await apiRequest(listPostViewTypes, {filter: {post_id: {eq: post_id}}})
    dispatch({type: UPDATE_POST_DETAIL, payload: {page_views: view.listPostViewTypes.items.length}})
  } catch (error) {
    console.log("error fetch view count: ", error)
  }
}

// Defin Provider
const {Provider} = postDetailStore
const PostDetailProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [FETCH_POST_DETAIL]: (state, {payload}) => ({...state, post: payload}),
    [FETCH_POST_USER]: (state, {payload}) => ({...state, postUser: payload}),
    [FETCH_USER_POSTS]: (state, {payload}) => ({...state, postUser: {...state.postUser, posts: payload}}),
    [UPDATE_FAVORITE_POST]: (state, {payload}) => ({...state, post: {...state.post, favorite: payload}}),
    [FETCH_PRODUCT_DETAIL]: (state, {payload}) => ({...state, products: payload}),
    [UPDATE_POST_DETAIL]: (state, {payload}) => ({...state, post: {...state.post, ...payload}})
  }), initialState)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postDetailStore, PostDetailProvider}