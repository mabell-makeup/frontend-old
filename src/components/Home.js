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

export const Home = ({navigation}) => 
  <View style={styles.container}>
    <Button icon="pencil" mode="contained" onPress={() => navigation.navigate("Login")}>Go to Login</Button>
  </View>