import React, {useState} from "react"
import {Text, View} from "react-native"
import {StyleSheet} from "react-native"
import {defaultStyle} from "../styles/defaultStyle"
import {Button} from "react-native-paper"
import {getMasterType} from "../graphql/queries"
import {apiRequest} from "../helper/requestHelper"

const styles = StyleSheet.create(defaultStyle)

const fetchMaster = async setResponse => {
  const res = await apiRequest(getMasterType, {id: 0}, true, "getMasterType")
  console.log(res)
  setResponse(res)
}

export const HomeScreen = ({navigation}) => {
  const [response, setResponse] = useState("")
  return (
    <View style={styles.container}>
      <Text>ここはHomeです。</Text>
      <Button onPress={() => fetchMaster(setResponse)}>Fetch Test</Button>
      <Text>response: {response.toString()}</Text>
    </View>
  )
}
