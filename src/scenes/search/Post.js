import React from "react"
import {View, StyleSheet} from "react-native"
import {Chip} from "react-native-paper"

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

const tags = [
  "Volvo", 
  "Alpha Sports", 
  "Ford", 
  "Gräf & Stift", 
  "Aston Martin", 
  "BMW", 
  "Tarrant Automobile",
  "Push"
]

export const Post = () => {
  return (
    <View style={styles.row}>
      {tags.map(tag => <Chip mode = "outlined" style={styles.chip}>
        {tag}
      </Chip>)}
    </View>
  )
} 

