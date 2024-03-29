import {createReducer} from "../helper/storeHelper"
import {apiRequest, apiRequest2, encodeQuery} from "../helper/requestHelper"
import {countPosts} from "../graphql/queries"

export const initialState = {
  conditions: {},
  searchResult: {0: [], 1: []},
  tmpResult: {0: [], 1: []},
  post_count: 0,
  tmpConditions: {
    base_color: "",
    season: "",
    face_type: "",
    skin_type: "",
    color: "",
    glitter: "",
    country: "",
    makeup_categories: "",
    products: [],
    tags: [],
    gender: 0
  },
  nextToken: ""
}

// Define Types
const UPDATE_TMP_CONDITIONS = "UPDATE_TMP_CONDITIONS"
const FETCH_POSTS = "FETCH_POSTS"
const UPDATE_POSTS = "UPDATE_POSTS"
const UPDATE_SEARCH_RESULT = "UPDATE_SEARCH_RESULT"
const UPDATE_CONDITIONS = "UPDATE_CONDITIONS"
const UPDATE_TMP_TAGS = "UPDATE_TMP_TAGS"
const UPDATE_TMP_PRODUCTS = "UPDATE_TMP_PRODUCTS"
const UPDATE_RESULT_COUNT = "UPDATE_RESULT_COUNT"
const UPDATE_NEXT_TOKEN = "UPDATE_NEXT_TOKEN"
const RESET_TMP_CONDITIONS = "RESET_TMP_CONDITIONS"


// Define ActionCreator
/* isToggleがtrueの場合、preTmpConditionsとnextConditionが同じ際、初期値をセットする */
export const updateTmpConditions = async (dispatch, preTmpConditions, nextCondition={}, isToggle=true) => {
  const payload = Object.fromEntries(Object.entries(nextCondition).map(([key, val]) => {
    const isClear = isToggle && preTmpConditions[key] === val
    const newVal = isClear ? initialState.tmpConditions[key] : val
    return [key, newVal]
  }))
  dispatch({type: UPDATE_TMP_CONDITIONS, payload})
  await fetchPosts(dispatch, {...preTmpConditions, ...payload})
}
export const fetchPosts = async (dispatch, tmpConditions, nextToken) => {
  try {
    const queryParams = encodeQuery(tmpConditions)
    const res = await apiRequest2(`/search?${queryParams}`)
    await dispatch({type: FETCH_POSTS, payload: {gender: tmpConditions.gender, items: res ? res.items : []}})
  } catch (e) {
    console.log("error fetch posts: ", e)
  }
}
export const updateSearchResult = async dispatch => {
  updateConditions(dispatch)
  dispatch({type: UPDATE_SEARCH_RESULT})
}
const updateConditions = dispatch => dispatch({type: UPDATE_CONDITIONS})
export const updateTmpTags = async (dispatch, preTags, newTag) => {
  const nextTags = preTags.includes(newTag) ? preTags.filter(tag => tag !== newTag) : [...preTags, newTag]
  dispatch({type: UPDATE_TMP_TAGS, payload: nextTags})
}
export const updateTmpProducts = async (dispatch, preProducts, newProduct) => {
  const nextProducts = preProducts.map(p => p.product_id).includes(newProduct.product_id) ? preProducts.filter(p => p.product_id !== newProduct.product_id) : [...preProducts, newProduct]
  dispatch({type: UPDATE_TMP_PRODUCTS, payload: nextProducts})
}
export const fetchPostCount = async (dispatch, filteredConditions) => {
  try {
    const res = await apiRequest(countPosts, {filter: filteredConditions, limit: 1000000})
    dispatch({type: UPDATE_RESULT_COUNT, payload: res ? res.listPostTypes.items.length : 0})
  } catch (error) {
    console.log("error fetch post count: ", error)
  }
}
export const resetTmpConditions = async (dispatch) => {
  dispatch({type: RESET_TMP_CONDITIONS})
  await fetchPosts(dispatch, {})
  updateSearchResult(dispatch)
}

// Define Reducer
export const searchReducer = createReducer(initialState, {
  [UPDATE_TMP_CONDITIONS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, ...payload}}),
  [FETCH_POSTS]: (state, {payload: {gender, items}}) => ({...state, tmpResult: {...state.tmpResult, [gender]: items}}),
  [UPDATE_POSTS]: (state, {payload: {gender, items}}) => ({...state, tmpResult: {...state.tmpResult, [gender]: items}}),
  [UPDATE_SEARCH_RESULT]: state => ({...state, searchResult: state.tmpResult}),
  [UPDATE_CONDITIONS]: state => ({...state, conditions: state.tmpConditions}),
  [UPDATE_TMP_TAGS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, tags: payload}}),
  [UPDATE_TMP_PRODUCTS]: (state, {payload}) => ({...state, tmpConditions: {...state.tmpConditions, products: payload}}),
  [UPDATE_RESULT_COUNT]: (state, {payload}) => ({...state, post_count: payload}),
  [UPDATE_NEXT_TOKEN]: (state, {payload}) => ({...state, nextToken: payload}),
  [RESET_TMP_CONDITIONS]: state => ({...state, tmpConditions: initialState.tmpConditions})
})
