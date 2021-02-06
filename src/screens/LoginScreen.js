import React, {useContext} from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {TabScreen} from "./TabScreen"
import {NavigationContainer} from "@react-navigation/native"
import {AuthProvider, authStore, cancelSignup} from "../stores/authStore"
import {Login} from "../scenes/login/Login"
import {CreateUsername} from "../scenes/login/CreateUsername"
import {PostScreen} from "./PostScreen"
import {IconButton} from "react-native-paper"

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
            <Stack.Screen name="CreateUsername" component={CreateUsername} options={({navigation}) => ({headerStyle: styles.header, headerTitle: false, headerLeft: () => <IconButton icon="close" size={40} onPress={handleCancel(navigation, dispatch)} />})} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const LoginScreen = () => <AuthProvider><LoginScreenInner /></AuthProvider>