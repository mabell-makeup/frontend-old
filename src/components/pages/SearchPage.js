import * as React from "react"
import {View, Text} from "react-native"
import {StyleSheet} from "react-native"
import {defaultStyle} from "../../styles/defaultStyle"

const styles = StyleSheet.create(defaultStyle)

export const SearchPage = ({navigation}) => 
  <View style={styles.container}>
    <Text>検索画面</Text>
  </View>