import React, {useEffect} from "react"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {TouchableWithoutFeedback, Keyboard, StatusBar} from "react-native"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {LoginScreen} from "./src/screens/LoginScreen"
import {AppProvider} from "./src/stores/appStore"
import Amplify from "aws-amplify"
import config from "./src/aws-exports"
import {ErrorModal} from "./src/components/ErrorModal"
import * as ScreenOrientation from "expo-screen-orientation"

Amplify.configure(config)

// デフォルトのテーマを変更可能
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#9E649C",
    accent: "yellow"
  }
}

const DissmissKeyboard = ({children}) =>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT).catch(error => console.log("error orientation lock:", error))
  }, [])

  return (
    <SafeAreaProvider>
      <DissmissKeyboard>
        <PaperProvider theme={theme}>
          <AppProvider>
            <StatusBar barStyle="dark-content" />
            <LoginScreen />
            <ErrorModal />
          </AppProvider>
        </PaperProvider>
      </DissmissKeyboard>
    </SafeAreaProvider>
  )
}
