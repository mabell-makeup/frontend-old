import React from "react"
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator} from "react-native"
import * as ImageManipulator from "expo-image-manipulator"
import ImageBrowser from "./ImageBrowser"

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  emptyStay:{
    textAlign: "center"
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF"
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff"
  }
})

const imagesCallback = navigation => callback => {
  navigation.setOptions({
    headerRight: () => <ActivityIndicator size="small" color={"#0580FF"}/>
  })

  callback.then(async (photos) => {
    const cPhotos = []
    for(let photo of photos) {
      const pPhoto = await processImageAsync(photo.uri)
      cPhotos.push({
        uri: pPhoto.uri,
        name: photo.filename,
        type: "image/jpg"
      })
    }
    navigation.navigate("Main", {photos: cPhotos})
  })
    .catch((e) => console.log(e))
}

const processImageAsync = async uri => {
  const file = await ImageManipulator.manipulateAsync(
    uri,
    [{resize: {width: 1000}}],
    {compress: 0.8, format: ImageManipulator.SaveFormat.JPEG}
  )
  return file
}

const DoneButton = onSubmit => 
  <TouchableOpacity title={"Done"} onPress={onSubmit}>
    <Text onPress={onSubmit}>Done</Text>
  </TouchableOpacity>

const updateHandler = navigation => (count, onSubmit) => {
  count > 0
    ? navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => <DoneButton count={count} onSubmit={onSubmit} />
    })
    : navigation.setOptions({title: false, headerRight: false})
}

const SelectedComponent = number => (
  <View style={styles.countBadge}>
    <Text style={styles.countBadgeText}>{number}</Text>
  </View>
)

const EmptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>

export const ImagePicker = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBrowser
        max={4}
        onChange={updateHandler(navigation)}
        callback={imagesCallback(navigation)}
        renderSelectedComponent={SelectedComponent}
        emptyStayComponent={EmptyStayComponent}
      />
    </View>
  )
}

