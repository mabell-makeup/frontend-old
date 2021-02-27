import React from "react"
import {FlatList, StyleSheet, Image, Dimensions, TouchableHighlight} from "react-native"

const ITEM_WIDTH = Dimensions.get("window").width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  imageStyle: {
    width: (ITEM_WIDTH-6) / 3,
    height: ITEM_WIDTH / 3,
    margin: 1,
    resizeMode: "cover"
  }
})

const renderItem = ({item}) =>
  <TouchableHighlight onPress={item.onPress}>
    <Image
      // eslint-disable-next-line no-undef
      source={item.imgSrc !== "" ? {uri: item.imgSrc} : require("../../assets/no_image.png")}
      key={item.imgSrc}
      style={styles.imageStyle}
    />
  </TouchableHighlight>

export const ImageList = ({data, style}) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={3}
      style={style}
    />
  )
}

