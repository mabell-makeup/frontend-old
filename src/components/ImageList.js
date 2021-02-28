import React from "react"
import {FlatList, StyleSheet, Image, TouchableHighlight} from "react-native"
import {WINDOW_WIDTH} from "../styles/constants"

const styles = StyleSheet.create({
  imageStyle: {
    width: (WINDOW_WIDTH-6) / 3,
    height: WINDOW_WIDTH / 3,
    margin: 1,
    resizeMode: "cover"
  }
})

const renderItem = ({item}) =>
  <TouchableHighlight onPress={item.onPress}>
    <Image
      // eslint-disable-next-line no-undef
      source={item.imgSrc !== "" ? {uri: item.imgSrc} : require("../../assets/no_image.png")}
      style={styles.imageStyle}
    />
  </TouchableHighlight>

export const ImageList = ({data, style, onEndReached=()=>{}, scrollEnabled=true}) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, idx) => item.id + idx}
      numColumns={3}
      style={style}
      onEndReached={onEndReached}
      scrollEnabled={scrollEnabled}
    />
  )
}

