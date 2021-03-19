import {createStore, combineReducers} from "redux"
import {searchReducer} from "./searchStore"
import {postReducer} from "./postStore"
import {postDetailReducer} from "./postDetailStore"
import {authReducer} from "./authStore"
import {appReducer} from "./appStore"


const store = createStore(combineReducers({
  search: searchReducer,
  post: postReducer,
  postDetail: postDetailReducer,
  auth: authReducer,
  app: appReducer
}))

export default store