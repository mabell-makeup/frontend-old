import React from "react"
import {View} from "react-native"
import {ImageList} from "../../components/ImageList"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"

const data = [
  {id: "1", title: "あ"},
  {id: "2", title: "い"},
  {id: "3", title: "う"},
  {id: "4", title: "え"},
  {id: "5", title: "お"},
  {id: "6", title: "か"},
  {id: "7", title: "き"},
  {id: "8", title: "く"},
  {id: "9", title: "け"},
  {id: "10", title: "こ"},
  {id: "11", title: "さ"},
  {id: "12", title: "し"},
  {id: "13", title: "す"},
  {id: "14", title: "せ"}
]

export const Men = () => {
  return (
    <View>
      <ImageList data={data} />
      {/* <UserInfoToggleGroup /> */}
    </View>
  ) 
}