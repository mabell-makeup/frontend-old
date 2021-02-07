import React from "react"
import {Text, StyleSheet} from "react-native"
import {ScrollView} from "react-native-gesture-handler"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
})


export const UserInfoSetting = ({navigation}) => {

  return (
    <ScrollView style={styles.container}>
      <Text>UserInfoSetting</Text>
    </ScrollView>
  )
}
