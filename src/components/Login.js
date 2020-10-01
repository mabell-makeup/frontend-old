import * as React from "react"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import { Button } from "react-native-paper"
import { Actions } from "react-native-router-flux"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export const Login = () => 
  <View style={styles.container}>
    <Button icon="home" mode="outlined" onPress={Actions.home}>Go to home</Button>
  </View>