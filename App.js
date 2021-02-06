import React from "react"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"
import {API_URI, IDENTITY_POOL_ID, REGION, USER_POOL_ID, USER_POOL_WEB_CLIENT_ID} from "@env"
import {TouchableWithoutFeedback, Keyboard, StatusBar} from "react-native"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {LoginScreen} from "./src/screens/LoginScreen"
import Amplify from "aws-amplify"
import {AppProvider} from "./src/stores/appStore"

Amplify.configure({
  Auth: {
    // REQUIRED
    identityPoolId: IDENTITY_POOL_ID,
    // REQUIRED
    region: REGION,
    // OPTIONAL
    userPoolId: USER_POOL_ID,
    // OPTIONAL
    userPoolWebClientId: USER_POOL_WEB_CLIENT_ID,
    // OPTIONAL
    mandatorySignIn: false
  }
})


// デフォルトのテーマを変更可能
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF7F50",
    accent: "yellow",
    background: "#fff"
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
            <AppProvider>
              <StatusBar barStyle="dark-content" />
              <LoginScreen />
            </AppProvider>
          </PaperProvider>
        </DissmissKeyboard>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
