import React from "react"
import {Chip} from "react-native-paper"
import {View, StyleSheet} from "react-native"

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    marginVertical: 2
  },
  chip: {
    margin: 4
  },
  chipText: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4,
    marginRight: 4,
    marginVertical: 0.5,
    minWidth: 20,
    textAlign: "center"
  }
})


export const ChipList = ({items=[{label: ""}], style}) =>
  <View style={{...styles.row, ...style}}>
    {items.map(({label, ...props}) => <Chip key={label} mode="outlined" style={styles.chip} textStyle={styles.chipText} {...props}>{label}</Chip>)}
  </View>
