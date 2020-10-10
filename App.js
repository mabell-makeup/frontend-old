import React from "react"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper"
import {BottomNavigation} from "./src/components/BottomNavigation"

// デフォルトのテーマを変更可能
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow"
  }
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <BottomNavigation />
    </PaperProvider>
  )
}
