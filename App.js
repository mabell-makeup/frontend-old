import React, {useMemo} from "react"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {Router} from "./src/Router"
import {ApolloProvider} from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import {API_URI} from "@env"

// デフォルトのテーマを変更可能
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow"
  }
}

console.log(API_URI)

export default function App() {
  const client = useMemo(() => new ApolloClient({uri: API_URI}), [])
  
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <Router />
      </PaperProvider>
    </ApolloProvider>
  )
}
