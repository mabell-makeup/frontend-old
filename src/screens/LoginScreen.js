import React, {useContext} from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {TabScreen} from "./TabScreen"
import {NavigationContainer} from "@react-navigation/native"
import {AuthProvider, authStore} from "../stores/authStore"
import {Login} from "../scenes/login/Login"
import {Signup} from "../scenes/login/Signup"
import {PostScreen} from "./PostScreen"

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "Login",
  screenOptions: {
    headerShown: false
  }
})

const LoginScreenInner = () => {
  const {state: {isLoggedIn}} = useContext(authStore)

  return (
    <NavigationContainer>
      <Stack.Navigator {...navigatorProps}>
        {isLoggedIn
          ? <>
            <Stack.Screen name="TabScreen" component={TabScreen} />
            <Stack.Screen name="PostScreen" component={PostScreen} />
          </>
          : <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const LoginScreen = () => <AuthProvider><LoginScreenInner /></AuthProvider>