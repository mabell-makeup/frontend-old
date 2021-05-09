import React from "react"
import {View, Text, StyleSheet} from "react-native"
import {primary} from "../styles/colors"

const styles = StyleSheet.create({
  inline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  label: {
    color: primary,
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 10
  }
})

export const TextWithImportantLabel = ({label, children, style}) =>
  <View style={styles.inline}>
    <Text style={style}>{children}</Text>
    {label && <Text style={styles.label}>{label}</Text>}
  </View>