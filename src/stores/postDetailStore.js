import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"

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
  items: []
}

// Define Store
const postDetailStore = createContext(initialState)

// Define Types
const FETCH_POST_DETAIL = "FETCH_POST_DETAIL"
const UPDATE_FAVORITE_POST = "UPDATE_FAVORITE_POST"
const FETCH_ITEMS = "FETCH_ITEMS"

// Define ActionCreator
export const fetchPostDetail = async (dispatch, id) => {
  const {error, loading, data} = await apiRequest(`{
    post(id: ${id}) {
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
export const updateFavoritePost = async (dispatch, post_id, handleFavorite) => {
  const {error, loading, data} = await apiRequest(`{
    updateFavoritePost(post_id: ${post_id}, handle: ${handleFavorite}) {
      result
    }
  }`)
  !loading && !error && dispatch({type: UPDATE_FAVORITE_POST, payload: data.result ? handleFavorite : false})
}
export const fetchItems = async (dispatch, productIdList) => {
  const {error, loading, data} = await apiRequest(`{
    fetchItems(productId: ${productIdList.toString()}) {
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
  !loading && !error && dispatch({type: FETCH_ITEMS, payload: data.items})
}


// Defin Provider
const {Provider} = postDetailStore
const PostDetailProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [FETCH_POST_DETAIL]: (state, {payload}) => ({...state, post: payload}),
    [UPDATE_FAVORITE_POST]: (state, {payload}) => ({...state, post: {...state.post, favorite: payload}}),
    [FETCH_ITEMS]: (state, {payload}) => ({...state, items: payload})
  }), initialState)
  console.log("PostDetailState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postDetailStore, PostDetailProvider}