import React from "react"
import {View, Text, StyleSheet} from "react-native"

const styles = StyleSheet.create({
  inline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  label: {
    color: "#FF7F50",
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