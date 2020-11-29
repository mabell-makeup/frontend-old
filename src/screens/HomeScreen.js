import React from "react"
import {Text, View} from "react-native"
import {StyleSheet} from "react-native"
import {defaultStyle} from "../styles/defaultStyle"
import {API_URI} from "@env"


const styles = StyleSheet.create(defaultStyle)

export const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>ここはHomeです。</Text>
      <Text>{API_URI}</Text>
    </View>
  )
}
