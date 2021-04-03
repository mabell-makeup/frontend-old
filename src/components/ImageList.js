import React from "react"
import {FlatList, StyleSheet, Image, TouchableHighlight, View} from "react-native"
import {WINDOW_WIDTH} from "../styles/constants"

const styles = StyleSheet.create({
  imageStyle: {
    width: (WINDOW_WIDTH - 6) / 3,
    height: (WINDOW_WIDTH - 6) / 3,
    resizeMode: "cover"
  },
  imageBackground: {
    backgroundColor: "#333",
    margin: 1
  },
  spinner: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})

const Item = ({item}) => {
  return (
    <TouchableHighlight onPress={item.onPress}>
      <View style={styles.imageBackground}>
        <Image
          // eslint-disable-next-line no-undef
          source={item.imgSrc !== "" ? {uri: item.imgSrc} : require("../../assets/no_image.png")}
          style={styles.imageStyle}
        />
      </View>
    </TouchableHighlight>
  )
}

export const ImageList = ({data, style, onEndReached=()=>{}, scrollEnabled=true}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={(item, idx) => item.id + idx}
      numColumns={3}
      style={style}
      onEndReached={onEndReached}
      scrollEnabled={scrollEnabled}
    />
  )
}

