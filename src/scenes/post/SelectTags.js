import React from "react"
import {SafeAreaView, View, Image} from "react-native"
// import * as SelectImages from "expo-image-picker"
import {Text} from "react-native-paper"

const createStyles = () => ({
})


export const SelectTags = ({navigation, route}) => {

  return (
    <SafeAreaView>
      <Text>SelectTags</Text>
      {/* {route.params.images.map(item => <Image style={{height: 40, width: 40}} source={{uri: item.uri}} />)} */}
    </SafeAreaView>
  )
}