import React from "react"
import {IconTextInput} from "./IconTextInput"
import {StyleSheet, Text, TouchableOpacity} from "react-native"


export const FakeInput = ({navigation, value="", linkTo="Search", style, ...props}) =>
  <TouchableOpacity onPress={() => navigation.navigate(linkTo)} style={[styles.container, style]}>
    <IconTextInput pointerEvents="none" value={value} right={() => {}} {...props} />
  </TouchableOpacity>


const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
})
