import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {TabScreen} from "./TabScreen"
import {DefaultTheme, NavigationContainer} from "@react-navigation/native"
import {cancelSignup} from "../stores/authStore"
import {Login} from "../scenes/login/Login"
import {RegisterUsername} from "../scenes/login/RegisterUsername"
import {PostScreen} from "./PostScreen"
import {IconButton} from "react-native-paper"
import {RegisterPassword} from "../scenes/login/RegisterPassword"
import {RegisterBirthdate} from "../scenes/login/RegisterBirthdate"
import {RegisterMail} from "../scenes/login/RegisterMail"
import {SendConfirmationMail} from "../scenes/login/SendConfirmationMail"
import {useDispatch, useSelector} from "react-redux"

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
  initialRouteName: "Login",
  screenOptions: {
    headerShown: false
  }
})

const signupScreenOptions = (navigation, dispatch) => ({headerShown: true, headerStyle: styles.header, headerTitle: false, headerLeft: () => <IconButton icon="close" size={40} onPress={handleCancel(navigation, dispatch)} />})

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const is_logged_in = useSelector(({auth: {is_logged_in}}) => is_logged_in)

  return (
    <NavigationContainer theme={{...DefaultTheme, colors: {...DefaultTheme.colors, background: "#fff"}}}>
      <Stack.Navigator {...navigatorProps}>
        {is_logged_in
          ? <>
            <Stack.Screen name="TabScreen" component={TabScreen} />
            <Stack.Screen name="PostScreen" component={PostScreen} />
          </>
          : <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="RegisterUsername" component={RegisterUsername} options={({navigation}) => signupScreenOptions(navigation, dispatch)} />
            <Stack.Screen name="RegisterPassword" component={RegisterPassword} options={({navigation}) => signupScreenOptions(navigation, dispatch)} />
            <Stack.Screen name="RegisterBirthdate" component={RegisterBirthdate} options={({navigation}) => signupScreenOptions(navigation, dispatch)} />
            <Stack.Screen name="RegisterMail" component={RegisterMail} options={({navigation}) => signupScreenOptions(navigation, dispatch)} />
            <Stack.Screen name="SendConfirmationMail" component={SendConfirmationMail} options={{headerShown: true, headerStyle: styles.header, headerTitle: false, headerLeft: () => {}}} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
