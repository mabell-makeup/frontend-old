import React, {useMemo} from "react"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {BottomNavigation} from "./src/components/BottomNavigation"
import {ApolloProvider} from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
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

const DissmissKeyboard = ({children}) =>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>

export default function App() {
  const client = useMemo(() => new ApolloClient({uri: API_URI}), [])
  
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
