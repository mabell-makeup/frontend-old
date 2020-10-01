import React from "react"
import { Router, Scene } from "react-native-router-flux"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Home } from "./components/Home"

export const AppRouter = () => 
  <Router>
    <Scene>
      <Scene key="login" component={Login} title="Login" />
      <Scene key="register" component={Register} title="Register" />
      <Scene key="home" component={Home} title="Home" />
    </Scene>
  </Router>
