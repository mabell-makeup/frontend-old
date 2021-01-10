import React from "react"
import {SearchInput} from "../components/SearchInput"
import {TouchableOpacity} from "react-native"


export const FakeSearchInput = ({navigation, value="", linkTo="Search", ...props}) =>
  <TouchableOpacity onPress={() => navigation.navigate(linkTo)} {...props}>
    <SearchInput pointerEvents="none" value={value} right={() => {}} />
  </TouchableOpacity>
