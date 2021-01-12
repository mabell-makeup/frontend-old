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
  },
  chipText: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4,
    marginRight: 2,
    marginTop: 1,
    marginBottom: 1
  }
})


export const ChipList = ({items=[{label: ""}]}) =>
  <View style={styles.row}>
    {items.map(({label, ...props}) => <Chip key={label} mode="outlined" style={styles.chip} textStyle={styles.chipText} {...props}>{label}</Chip>)}
  </View>
