import React from "react"
import {StyleSheet, Text, TouchableOpacity} from "react-native"
import {IconButton} from "react-native-paper"

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center"
  }
})

export const IconLabel = ({icon="", size=15, color="#666", style={}, textStyle={}, children, ...props}) => {
  return (
    <TouchableOpacity style={{...styles.container, ...style}} {...props}>
      <IconButton icon={icon} size={size} color={color} style={{margin: 0}} />
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  )
}