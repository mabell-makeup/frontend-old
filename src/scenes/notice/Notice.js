import React from "react"
import {useState} from "react"
import {ScrollView, Text} from "react-native"
import {Button} from "react-native-paper"
import {List} from "../../components/List"
import {apiRequest2} from "../../helper/requestHelper"

export const Notice = () => {
  const [res, setRes] = useState(false)
  const onPress = async() => {
    const response = await apiRequest2("/hello")
    setRes(response)
  }
  return (
    <ScrollView>
      <List rows={[{title: "test"}]} />
      <Button style={{width: 200}} onPress={onPress}>HogeHoge</Button>
      <Text>{res ? res.toString() : "Wait"}</Text>
    </ScrollView>
  )
}