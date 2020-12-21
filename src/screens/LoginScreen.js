import React, {useContext} from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {AuthScreen} from "./AuthScreen"
import {NavigationContainer} from "@react-navigation/native"
import {AuthProvider, authStore} from "../stores/authStore"
import {Login} from "../scenes/login/Login"
import {Signup} from "../scenes/login/Signup"

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
          ? <Stack.Screen name="AuthScreen" component={AuthScreen} />
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