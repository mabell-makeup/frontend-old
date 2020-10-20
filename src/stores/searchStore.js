import React, {createContext, useReducer} from "react"

const initialState = {
  useUserInfo: true
}

// Define Store
const searchStore = createContext(initialState)

// Defin Provider
const {Provider} = searchStore
const SearchProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer((state, action) => {
    console.log(action.type, action.payload)
    switch (action.type) {
      case "UPDATE_USE_USER_INFO":
        return {...state, useUserInfo: action.payload}
      default:
        return {...state}
    }
  }, initialState)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {searchStore, SearchProvider}