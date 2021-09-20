import {createReducer} from "../helper/storeHelper"
import {apiRequest2} from "../helper/requestHelper"

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
  }
}

// Define Types
const UPDATE_TMP_POST = "UPDATE_TMP_POST"
const UPDATE_TMP_POST_TAGS = "UPDATE_TMP_POST_TAGS"
const UPDATE_TMP_POST_PRODUCTS = "UPDATE_TMP_POST_PRODUCTS"
const RESET_TMP_POST = "RESET_TMP_POST"

// Define ActionCreator
export const createPost = async (tmpPost, user_id) => {
  try {
    const postData = Object.fromEntries(Object.entries(tmpPost).filter(([, value]) => typeof value !== "undefined" && value !== null && value !== ""))
    await apiRequest2(`/users/${user_id}/posts`, {method: "POST", data: postData})
  } catch (error) {
    console.log("error create post: ", error)
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
  dispatch({type: UPDATE_TMP_POST_TAGS, payload: nextTags})
}
export const updateTmpProducts = async (dispatch, preProducts, newProduct) => {
  const nextProducts = preProducts.map(p => p.product_id).includes(newProduct.product_id) ? preProducts.filter(p => p.product_id !== newProduct.product_id) : [...preProducts, newProduct]
  dispatch({type: UPDATE_TMP_POST_PRODUCTS, payload: nextProducts})
}
export const resetTmpPost = (dispatch, initialTmpUser) => {
  dispatch({type: RESET_TMP_POST, payload: initialTmpUser})
}

// Define Reducer
export const postReducer = createReducer(initialState, {
  [UPDATE_TMP_POST]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, ...payload}}),
  [UPDATE_TMP_POST_TAGS]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, tags: payload}}),
  [UPDATE_TMP_POST_PRODUCTS]: (state, {payload}) => ({...state, tmpPost: {...state.tmpPost, products: payload}}),
  [RESET_TMP_POST]: (state, {payload}) => ({...state, tmpPost: {...initialState.tmpPost, ...payload}})
})
