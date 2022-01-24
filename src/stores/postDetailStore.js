import {createReducer} from "../helper/storeHelper"
import {apiRequest, apiRequest2} from "../helper/requestHelper"
import {listPostLikeTypes, listPostViewTypes} from "../graphql/queries"
import {createPostViewType} from "../graphql/mutations"

export const initialState = {
  post: {
    user_id: Number,
    user_name: "",
    nickname: "",
    img_src_list: [],
    item_id_list: [],
    tags: [],
    description: "",
    page_views: Number,
    isLike: false,
    isSaved: false,
    like_count: Number
  },
  products: [],
  postUser: {
    posts: [],
    nickname: ""
  },
  isLoading: false
}

// Define Types
const FETCH_POST_DETAIL = "FETCH_POST_DETAIL"
const FETCH_POST_USER = "FETCH_POST_USER"
const FETCH_PRODUCT_DETAIL = "FETCH_PRODUCT_DETAIL"
const FETCH_USER_POSTS = "FETCH_USER_POSTS"
const UPDATE_POST_DETAIL = "UPDATE_POST_DETAIL"
const UPDATE_LOADING = "UPDATE_LOADING"

// Define ActionCreator
export const fetchPostDetail = async (dispatch, post_id, postUserId, myId) => {
  try {
    dispatch({type: UPDATE_LOADING, payload: true})
    const post = await apiRequest2(`/users/${postUserId}/posts/${post_id}`)
    dispatch({type: FETCH_POST_DETAIL, payload: post})
    await Promise.all([
      fetchPostUser(dispatch, postUserId),
      fetchProductDetails(dispatch, post.product_id),
      // TODO: post_idを引数にリクエストするものは一つにまとめる
      fetchViewCount(dispatch, post_id),
      fetchLikeCount(dispatch, post_id),
      checkLikePost(dispatch, myId, post_id),
      addViewCount(post_id)
    ])
    dispatch({type: UPDATE_LOADING, payload: false})
  } catch (error) {
    console.log("fetch post detail error:", error)
  }
}
export const fetchPostUser = async (dispatch, user_id) => {
  try {
    const user = await apiRequest2(`/users/${user_id}`)
    dispatch({type: FETCH_POST_USER, payload: user})
  } catch (error) {
    console.log("fetch post user error:", error)
  }
}
export const updateLikePost = async (dispatch, user_id, post_id) => {
  try {
    const res = await apiRequest2(`/users/${user_id}/like`, {method: "PATCH", data: {post_id}})
    dispatch({type: UPDATE_POST_DETAIL, payload: {isLike: res.isLike}})
  } catch (error) {
    console.log("error update like: ", error)
  }
  // await fetchLikeCount(dispatch, post_id)
}
export const checkLikePost = async (dispatch, user_id, post_id) => {
  try {
    const res = await apiRequest(listPostLikeTypes, {filter: {user_id: {eq: user_id}, post_id: {eq: post_id}}})
    dispatch({type: UPDATE_POST_DETAIL, payload: {isLike: res.listPostLikeTypes.items.length > 0}})
  } catch (error) {
    console.log("error fetch my posts: ", error)
  }
}
export const updateSavedPost = async (dispatch, user_id, post_id) => {
  try {
    const res = await apiRequest2(`/users/${user_id}/save`, {method: "PATCH", data: {post_id}})
    dispatch({type: UPDATE_POST_DETAIL, payload: {isSaved: res.isSaved}})
  } catch (error) {
    console.log("error update save: ", error)
  }
}
export const fetchProductDetails = async (dispatch, product_id) => {
  try {
    const products = await Promise.all(product_id.map(async product_id => apiRequest2(`/products/${product_id}`)))
    dispatch({type: FETCH_PRODUCT_DETAIL, payload: products})
  } catch (error) {
    console.log("fetch product details error:", error)
  }
}
export const fetchUserPosts = async (dispatch, user_id, nextToken) => {
  try {
    const res = await apiRequest2(`/users/${user_id}/posts`, nextToken ? {data: {nextToken}} : undefined)
    dispatch({type: FETCH_USER_POSTS, payload: res ? res.items.map(post => ({id: post.post_id, imgSrc: post.thumbnail_img})) : []})
  } catch (error) {
    console.log("error fetch user posts: ", error)
  }
}
export const addViewCount = async post_id => {
  try {
    apiRequest(createPostViewType, {input: {post_id}})
  } catch (error) {
    console.log("error add view count: ", error)
  }
}
export const fetchViewCount = async (dispatch, post_id) => {
  try {
    const view = await apiRequest(listPostViewTypes, {filter: {post_id: {eq: post_id}}, limit: 1000000})
    dispatch({type: UPDATE_POST_DETAIL, payload: {page_views: view.listPostViewTypes.items.length}})
  } catch (error) {
    console.log("error fetch view count: ", error)
  }
}
export const fetchLikeCount = async (dispatch, post_id) => {
  try {
    const view = await apiRequest(listPostLikeTypes, {filter: {post_id: {eq: post_id}}, limit: 1000000})
    dispatch({type: UPDATE_POST_DETAIL, payload: {like_count: view.listPostLikeTypes.items.length}})
  } catch (error) {
    console.log("error fetch like count: ", error)
  }
}

// Define Reducer
export const postDetailReducer = createReducer(initialState, {
  [FETCH_POST_DETAIL]: (state, {payload}) => ({...state, post: payload}),
  [FETCH_POST_USER]: (state, {payload}) => ({...state, postUser: payload}),
  [FETCH_USER_POSTS]: (state, {payload}) => ({...state, postUser: {...state.postUser, posts: payload.items, postCount: payload.count}}),
  [FETCH_PRODUCT_DETAIL]: (state, {payload}) => ({...state, products: payload}),
  [UPDATE_POST_DETAIL]: (state, {payload}) => ({...state, post: {...state.post, ...payload}}),
  [UPDATE_LOADING]: (state, {payload}) => ({...state, isLoading: payload})
})
