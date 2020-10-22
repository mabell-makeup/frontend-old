import React, {createContext, useReducer} from "react"

const initialState = {
  useUserInfo: true,
  color: ""
}

// Define Store
const searchStore = createContext(initialState)

// Define Types
const UPDATE_USE_USER_INFO = "UPDATE_USE_USER_INFO"
const UPDATE_COLOR = "UPDATE_COLOR"

// Define ActionCreator
export const updateColor = (dispatch, color) => dispatch({type: UPDATE_COLOR, payload: color})

// Defin Provider
const {Provider} = searchStore
const SearchProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer((state, action) => {
    console.log(action.type, action.payload)
    switch (action.type) {
      case UPDATE_USE_USER_INFO:
        return {...state, useUserInfo: action.payload}
      case UPDATE_COLOR:
        return {...state, color: action.payload}
      default:
        return {...state}
    }
  }, initialState)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {searchStore, SearchProvider}