import React from "react"
import {View, Text, TouchableWithoutFeedback, Keyboard} from "react-native"
import {StyleSheet} from "react-native"
import {defaultStyle} from "../../styles/defaultStyle"

const styles = StyleSheet.create(defaultStyle)

const DissmissKeyboard = ({children}) =>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>

export const Search = () => {
  return (
    <DissmissKeyboard>
      <View style={styles.container}>
        <Text>検索画面</Text>
      </View>
    </DissmissKeyboard>
  )
}