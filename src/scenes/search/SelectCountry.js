import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"


const countries = [
  {title: "韓国", right: props => <Checkbox status={"checked"} color="#333" />, onPress: () => {}},
  {title: "中国", right: props => <Checkbox status={"checked"} color="#333" />, onPress: () => {}},
  {title: "欧米", right: props => <Checkbox status={"checked"} color="#333" />, onPress: () => {}},
  {title: "その他", right: props => <Checkbox status={"checked"} color="#333" />, onPress: () => {}}
]


export const SelectCountry = () => {
  return (
    <ScrollView>
      <List items={countries} />
    </ScrollView>
  )
}