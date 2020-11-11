import React from "react"
import {View, StyleSheet, Image, Dimensions, ScrollView} from "react-native"
import {Chip} from "react-native-paper"
import {Appbar} from "react-native-paper"
import {Platform} from "react-native"

// TODO: Constantsに移動
const ITEM_WIDTH = Dimensions.get("window").width

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12
  },
  chip: {
    margin: 4
  },
  image: {
    // TODO: もっといい書き方があるはず
    width: ITEM_WIDTH,
    height: 400
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

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"

export const Post = () => {
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content title="Title" subtitle={"Subtitle"} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <Image
        source={{uri: "http://192.168.3.23:3000/img/posts/user3/1.jpg"}}
        style={styles.image}
      />
      <View style={styles.row}>
        {tags.map(tag => <Chip mode = "outlined" style={styles.chip}>
          {tag}
        </Chip>)}
      </View>
    </ScrollView>
  )
} 