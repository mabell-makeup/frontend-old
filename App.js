import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import { TestComponent } from "./src/TestComponent"

// デフォルトのテーマを変更可能
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow"
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <TestComponent />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  )
}
