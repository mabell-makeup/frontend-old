import React from "react"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {BottomNavigation} from "./src/components/BottomNavigation"
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"
import {API_URI} from "@env"
import {TouchableWithoutFeedback, Keyboard, StatusBar} from "react-native"
import {SafeAreaProvider} from "react-native-safe-area-context"

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
      <SafeAreaProvider>
        <DissmissKeyboard>
          <PaperProvider theme={theme}>
            <StatusBar barStyle="dark-content" />
            <BottomNavigation />
          </PaperProvider>
        </DissmissKeyboard>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
