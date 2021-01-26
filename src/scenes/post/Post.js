import React, {useEffect, useState} from "react"
import {View, Text, SafeAreaView, Platform} from "react-native"
import * as ImagePicker from "expo-image-picker"

const pickImage = setImage => async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  })

  console.log(result)

  if (!result.cancelled) {
    setImage(result.uri)
  }
}

export const Post = () => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("写真へアクセスする権限がありません。お使いの端末の設定から、写真へのアクセスを許可してください。")
        }
      }
    })()
  }, [])

  return (
    <SafeAreaView>
      <View><Text onPress={pickImage(setImage)}>ここはPostです。</Text></View>
      {console.log(image)}
    </SafeAreaView>
  )
}