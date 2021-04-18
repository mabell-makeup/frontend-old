import React from "react"
import {StyleSheet, Text, View} from "react-native"
import {IconButton} from "react-native-paper"

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center"
  }
})

export const IconLabel = ({icon="", size=15, color="#666", style={}, textStyle={}, children}) => {
  return (
    <View style={{...styles.container, ...style}}>
      <IconButton icon={icon} size={size} color={color} style={{margin: 0}} />
      <Text style={textStyle}>{children}</Text>
    </View>
  )
}