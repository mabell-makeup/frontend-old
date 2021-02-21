import React from "react"
import {StyleSheet, Text, View} from "react-native"

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  errMsg: {
    color: "red"
  }
})


export const ErrorMessage = ({messages=[]}) => messages.length > 0 &&
  <View style={styles.container}>
    {messages.map((message, idx) => <Text key={idx} style={styles.errMsg}>{message}</Text>)}
  </View>
