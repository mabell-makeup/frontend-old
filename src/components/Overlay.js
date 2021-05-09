import React from "react"
import {StyleSheet, View} from "react-native"

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  }
})


export const Overlay = ({children}) =>
  <View style={styles.background}>
    {children}
  </View>
