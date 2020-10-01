import React from "react"
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import { Router, Scene } from "react-native-router-flux"
import { Login } from "./src/components/Login"
import { Register } from "./src/components/Register"
import { Home } from "./src/components/Home"

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
      <Router>
        <Scene>
          <Scene key="login" component={Login} title="Login" />
          <Scene key="register" component={Register} title="Register" />
          <Scene key="home" component={Home} title="Home" />
        </Scene>
      </Router>
    </PaperProvider>
  )
}
