import React from "react"
import {IconTextInput} from "./IconTextInput"
import {TouchableOpacity} from "react-native"


export const FakeInput = ({navigation, value="", linkTo="Search", style, ...props}) =>
  <TouchableOpacity onPress={() => navigation.navigate(linkTo)} style={style}>
    <IconTextInput pointerEvents="none" value={value} right={() => {}} {...props} />
  </TouchableOpacity>
