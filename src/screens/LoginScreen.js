import * as React from "react"
import {View} from "react-native"
import {StyleSheet} from "react-native"
import {Button} from "react-native-paper"
import {defaultStyle} from "../styles/defaultStyle"

const styles = StyleSheet.create(defaultStyle)

export const LoginScreen = ({navigation}) => 
  <View style={styles.container}>
    <Button icon="home" mode="outlined" onPress={() => navigation.navigate("Home")}>Go to home</Button>
  </View>