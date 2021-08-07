import React, {useEffect} from "react"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {TouchableWithoutFeedback, Keyboard, StatusBar} from "react-native"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {LoginScreen} from "./src/screens/LoginScreen"
import Amplify from "aws-amplify"
import config from "./src/aws-exports"
import {ErrorModal} from "./src/components/ErrorModal"
import * as colors from "./src/styles/colors"
import {Provider as StoreProvider} from "react-redux"
import store from "./src/stores/rootStore"

Amplify.configure(config)

// デフォルトのテーマを変更可能
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors
  }
}

const DissmissKeyboard = ({children}) =>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>

export default function App() {
  return (
    <SafeAreaProvider>
      <DissmissKeyboard>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="dark-content" />
          <StoreProvider store={store}>
            <LoginScreen />
            {/* <ErrorModal /> */}
          </StoreProvider>
        </PaperProvider>
      </DissmissKeyboard>
    </SafeAreaProvider>
  )
}
