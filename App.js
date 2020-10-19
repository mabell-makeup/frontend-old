import React from "react"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {BottomNavigation} from "./src/components/BottomNavigation"
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"
import {API_URI} from "@env"
import {TouchableWithoutFeedback, Keyboard} from "react-native"

// デフォルトのテーマを変更可能
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow"
  }
}

const apolloDefaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  }
}

const DissmissKeyboard = ({children}) =>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>

export default function App() {
  const client = new ApolloClient({uri: API_URI, cache: new InMemoryCache(), defaultOptions: apolloDefaultOptions})
  
  return (
    <ApolloProvider client={client}>
      <DissmissKeyboard>
        <PaperProvider theme={theme}>
          <BottomNavigation />
        </PaperProvider>
      </DissmissKeyboard>
    </ApolloProvider>
  )
}
