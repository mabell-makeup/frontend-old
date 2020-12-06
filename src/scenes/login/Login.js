import React, {useContext} from "react"
import {Button} from "react-native-paper"
import {View, StyleSheet} from "react-native"
import {defaultStyle} from "../../styles/defaultStyle"
import {authStore, login} from "../../stores/authStore"

const styles = StyleSheet.create(defaultStyle)

export const Login = ({navigation}) => {
  const {dispatch} = useContext(authStore)

  return (
    <View style={styles.container}>
      <Button icon="home" mode="outlined" onPress={() => login(dispatch, true)}>Login!!</Button>
      <Button icon="pencil" mode="outlined" onPress={() => navigation.navigate("Signup")}>Signup!!</Button>
    </View>
  )
}
