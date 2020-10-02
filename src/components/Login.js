import * as React from "react"
import {View} from "react-native"
import {StyleSheet} from "react-native"
import {Button} from "react-native-paper"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export const Login = ({navigation}) => 
  <View style={styles.container}>
    <Button icon="home" mode="outlined" onPress={() => navigation.navigate("Home")}>Go to home</Button>
  </View>