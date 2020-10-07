import React from "react"
import {View, Text} from "react-native"
import {StyleSheet} from "react-native"
import {defaultStyle} from "../../styles/defaultStyle"

const styles = StyleSheet.create(defaultStyle)

export const NewsFeed = ({navigation}) => 
  <View style={styles.container}>
    <Text>NewsFeed</Text>
  </View>