import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {getPostType, getProductType, getUserType} from "../graphql/queries"

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
  postUser: {}
}

// Define Store
const postDetailStore = createContext(initialState)

// Define Types
const FETCH_POST_DETAIL = "FETCH_POST_DETAIL"
const FETCH_POST_USER = "FETCH_POST_USER"
const UPDATE_FAVORITE_POST = "UPDATE_FAVORITE_POST"
const FETCH_PRODUCT_DETAIL = "FETCH_PRODUCT_DETAIL"

// Define ActionCreator
export const fetchPostDetail = async (dispatch, post_id, DateTime) => {
  try {
    const post = await apiRequest(getPostType, {post_id, DateTime})
    dispatch({type: FETCH_POST_DETAIL, payload: post.getPostType})
    const user = await apiRequest(getUserType, {user_id: post.getPostType.user_id})
    dispatch({type: FETCH_POST_USER, payload: user.getUserType})
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

// Defin Provider
const {Provider} = postDetailStore
const PostDetailProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [FETCH_POST_DETAIL]: (state, {payload}) => ({...state, post: payload}),
    [FETCH_POST_USER]: (state, {payload}) => ({...state, postUser: payload}),
    [UPDATE_FAVORITE_POST]: (state, {payload}) => ({...state, post: {...state.post, favorite: payload}}),
    [FETCH_PRODUCT_DETAIL]: (state, {payload}) => ({...state, products: payload})
  }), initialState)
  console.log("PostDetailState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postDetailStore, PostDetailProvider}