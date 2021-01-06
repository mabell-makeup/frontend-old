import React from "react"
import {Chip} from "react-native-paper"
import {View, StyleSheet} from "react-native"

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12
  },
  chip: {
    margin: 4
  }
})


export const ChipList = ({items=[{label: ""}]}) =>
  <View style={styles.row}>
    {items.map(({label, ...props}) => <Chip key={label} mode="outlined" style={styles.chip} {...props}>{label}</Chip>)}
  </View>
