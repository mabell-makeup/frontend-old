import React, {useContext} from "react"
import {Text} from "react-native-paper"
import {View, StyleSheet} from "react-native"
import {defaultStyle} from "../../styles/defaultStyle"
import {authStore, login} from "../../stores/authStore"

const styles = StyleSheet.create(defaultStyle)

const handleLogin = (dispatch) => () => {
  login(dispatch, true)
}

export const Signup = () => {
  const {dispatch} = useContext(authStore)

  return (
    <View style={styles.container}>
      <Text>ここはSignupです。</Text>
    </View>
  )
}
