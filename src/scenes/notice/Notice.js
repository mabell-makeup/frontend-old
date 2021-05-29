import React from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"

export const Notice = () => {
  return (
    <ScrollView>
      <List rows={[{title: "test"}]} />
    </ScrollView>
  )
}