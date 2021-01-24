import React, {createContext, useReducer} from "react"
import {createReducer} from "../helper/storeHelper"
import {apiRequest} from "../helper/requestHelper"

export const initialState = {
  post: {
    user_id: Number,
    user_name: "",
    user_nickname: "",
    img_src_list: [],
    items: [],
    tags: [],
    description: "",
    page_views: Number,
    favorite: false
  }
}

// Define Store
const postStore = createContext(initialState)

// Define Types
const FETCH_POST_DETAIL = "FETCH_POST_DETAIL"
const UPDATE_FAVORITE_POST = "UPDATE_FAVORITE_POST"

// Define ActionCreator
export const fetchPostDetail = (dispatch, id) => {
  const {error, loading, data} = apiRequest(`{
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
export const updateFavoritePost = (dispatch, post_id, handleFavorite) => {
  const {error, loading, data} = apiRequest(`{
    updateFavoritePost(post_id: ${post_id}, handle: ${handleFavorite}) {
      result
    }
  }`)
  !loading && !error && dispatch({type: UPDATE_FAVORITE_POST, payload: data.result ? handleFavorite : false})
}


// Defin Provider
const {Provider} = postStore
const PostProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer(createReducer(initialState, {
    [FETCH_POST_DETAIL]: (state, {payload}) => ({...state, post: payload}),
    [UPDATE_FAVORITE_POST]: (state, {payload}) => ({...state, post: {...state.post, favorite: payload}})
  }), initialState)
  console.log("PostState is updated:", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {postStore, PostProvider}