import React from "react"
import {StyleSheet, View} from "react-native"
import {WINDOW_HEIGHT, WINDOW_WIDTH} from "../styles/constants"

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
})


export const Overlay = ({children}) =>
  <View style={styles.background}>
    {children}
  </View>
