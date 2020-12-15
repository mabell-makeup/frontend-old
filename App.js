import React from "react"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"
import {API_URI} from "@env"
import {TouchableWithoutFeedback, Keyboard, StatusBar} from "react-native"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {LoginScreen} from "./src/screens/LoginScreen"
import Amplify from "aws-amplify"

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "ap-northeast-1:f0321010-23b5-41a0-a2d7-1ee43f14662a",
    // REQUIRED - Amazon Cognito Region
    region: "ap-northeast-1",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-northeast-1_IpZmsDjOL",
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "7lfg780nrngsk0ohkklv6d3rgq",
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false
  }
})


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
            <LoginScreen />
          </PaperProvider>
        </DissmissKeyboard>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
