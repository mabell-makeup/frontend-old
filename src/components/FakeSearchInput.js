import React from "react"
import {SearchInput} from "../components/SearchInput"
import {TouchableOpacity} from "react-native"


export const FakeSearchInput = ({navigation, value="", linkTo="Search"}) =>
  <TouchableOpacity style={{height: 50}} onPress={() => navigation.navigate(linkTo)}>
    <SearchInput pointerEvents="none" value={value} />
  </TouchableOpacity>
