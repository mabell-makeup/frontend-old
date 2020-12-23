import React, {useContext} from "react"
import {List} from "./List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateTmpConditionsPersonalColor, fetchPosts} from "../stores/searchStore"

const personalColors = [
  {title: "イエベ春", key: "yellowSpring"},
  {title: "ブルベ夏",  key: "blueSummer"},
  {title: "イエベ秋",  key: "yellowAutumn"},
  {title: "ブルベ冬", key: "blueWinter"}
]

const createRows = (personalColors, dispatch, tmpConditions) =>
  personalColors.map(personalColor => ({
    title: personalColor.title,
    key: personalColor.key,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={personalColor.key === tmpConditions.personalColor ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateTmpConditionsPersonalColor(dispatch, personalColor.key)
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const PersonalColorInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const rows = createRows(personalColors, dispatch, tmpConditions)

  return <List rows={rows} />
}