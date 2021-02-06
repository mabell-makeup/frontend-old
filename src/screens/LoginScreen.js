import React, {useContext} from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {TabScreen} from "./TabScreen"
import {NavigationContainer} from "@react-navigation/native"
import {AuthProvider, authStore, cancelSignup} from "../stores/authStore"
import {Login} from "../scenes/login/Login"
import {RegisterUsername} from "../scenes/login/RegisterUsername"
import {PostScreen} from "./PostScreen"
import {IconButton} from "react-native-paper"
import {RegisterPassword} from "../scenes/login/RegisterPassword"
import {RegisterBirthdate} from "../scenes/login/RegisterBirthdate"
import {RegisterMail} from "../scenes/login/RegisterMail"
import {SendConfirmationMail} from "../scenes/login/SendConfirmationMail"

const styles = {
  header: {
    shadowRadius: 0,
    shadowOffset: {
      height: 0
    },
    shadowColor: "transparent",
    elevation:0 ,
    borderBottomWidth: 0,
    height: 80
  }
}

const handleCancel = (navigation, dispatch) => () => {
  navigation.navigate("Login")
  cancelSignup(dispatch)
}

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "Login"
})

const signupScreenOptions = (navigation, dispatch) => ({headerStyle: styles.header, headerTitle: false, headerLeft: () => <IconButton icon="close" size={40} onPress={handleCancel(navigation, dispatch)} />})

const LoginScreenInner = () => {
  const {dispatch, state: {isLoggedIn}} = useContext(authStore)

  return (
    <NavigationContainer>
      <Stack.Navigator {...navigatorProps}>
        {isLoggedIn
          ? <>
            <Stack.Screen name="TabScreen" component={TabScreen} />
            <Stack.Screen name="PostScreen" component={PostScreen} />
          </>
          : <>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="RegisterUsername" component={RegisterUsername} options={({navigation}) => signupScreenOptions(navigation, dispatch)} />
            <Stack.Screen name="RegisterPassword" component={RegisterPassword} options={({navigation}) => signupScreenOptions(navigation, dispatch)} />
            <Stack.Screen name="RegisterBirthdate" component={RegisterBirthdate} options={({navigation}) => signupScreenOptions(navigation, dispatch)} />
            <Stack.Screen name="RegisterMail" component={RegisterMail} options={({navigation}) => signupScreenOptions(navigation, dispatch)} />
            <Stack.Screen name="SendConfirmationMail" component={SendConfirmationMail} options={{headerStyle: styles.header, headerTitle: false, headerLeft: () => {}}} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const LoginScreen = () => <AuthProvider><LoginScreenInner /></AuthProvider>