import * as React from "react"
import {View} from "react-native"
import {StyleSheet} from "react-native"
import {Button} from "react-native-paper"
import {defaultStyle} from "../styles/defaultStyle"
import {Login} from "../scenes/login/Login"

const styles = StyleSheet.create(defaultStyle)

export const LoginScreen = ({navigation}) => 
  <View style={styles.container}>
    <Button icon="home" mode="outlined" onPress={() => navigation.reset({index: 0, routes: [{name: "LoggedIn"}]})}>Login!!</Button>
    <Login />
  </View>