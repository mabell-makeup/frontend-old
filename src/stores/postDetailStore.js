import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"
import {getPostType, getUserType} from "../graphql/queries"

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
  items: [],
  postUser: {

  }
}

// Define Store
const postDetailStore = createContext(initialState)

// Define Types
const FETCH_POST_DETAIL = "FETCH_POST_DETAIL"
const FETCH_POST_USER = "FETCH_POST_USER"
const UPDATE_FAVORITE_POST = "UPDATE_FAVORITE_POST"
const FETCH_ITEMS = "FETCH_ITEMS"

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
export const fetchItems = async (dispatch, productIdList) => {
  const data = await apiRequest(`{
    fetchItems(productId:hogehoge) {
      items: {
        id
        name
        brand_name
        category
        price
        release_date
      }
    }
  }`)
  dispatch({type: FETCH_ITEMS, payload: data})
}


// Defin Provider
const {Provider} = postDetailStore
const PostDetailProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [FETCH_POST_DETAIL]: (state, {payload}) => ({...state, post: payload}),
    [FETCH_POST_USER]: (state, {payload}) => ({...state, postUser: payload}),
    [UPDATE_FAVORITE_POST]: (state, {payload}) => ({...state, post: {...state.post, favorite: payload}}),
    [FETCH_ITEMS]: (state, {payload}) => ({...state, items: payload})
  }), initialState)
  console.log("PostDetailState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postDetailStore, PostDetailProvider}