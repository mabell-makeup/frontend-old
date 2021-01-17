import React from "react"
import {SearchInput} from "../components/SearchInput"
import {TouchableOpacity} from "react-native"


export const FakeSearchInput = ({navigation, value="", linkTo="Search", style, ...props}) =>
  <TouchableOpacity onPress={() => navigation.navigate(linkTo)} style={style}>
    <SearchInput pointerEvents="none" value={value} right={() => {}} {...props} />
  </TouchableOpacity>
