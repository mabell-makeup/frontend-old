import React from "react"
import {TouchableWithoutFeedback, Keyboard} from "react-native"
import {TopNavigation} from "../../components/TopNavigation"
import {Men} from "./Men"
import {Women} from "./Women"


// TODO: DissmissKeyboardでApp全体をラップしたほうがいいのかも
const DissmissKeyboard = ({children}) =>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>

const screens = [
  {name: "全体", component: Women},
  {name: "アイメイク", component: Men},
  {name: "リップメイク", component: Women},
  {name: "アイテム", component: Men},
  {name: "ユーザー", component: Women}
]

export const Search = () => {
  return (
    <DissmissKeyboard>
      <TopNavigation screens={screens} />
    </DissmissKeyboard>
  )
}