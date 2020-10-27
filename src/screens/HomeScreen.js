import React from "react"
import {Text, View} from "react-native"
import {StyleSheet} from "react-native"
import {Button} from "react-native-paper"
import {defaultStyle} from "../styles/defaultStyle"
import {API_URI} from "@env"


const styles = StyleSheet.create(defaultStyle)

export const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button icon="pencil" mode="contained" onPress={() => navigation.navigate("Search")}>Go to Search</Button>
      <Text>{API_URI}</Text>
    </View>
  )
}
