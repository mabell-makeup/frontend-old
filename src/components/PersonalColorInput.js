import React, {useContext} from "react"
import {searchStore, updateTmpConditionsPersonalColor, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"

const personalColors = [
  {title: "イエベ春", key: "yellowSpring"},
  {title: "ブルベ夏",  key: "blueSummer"},
  {title: "イエベ秋",  key: "yellowAutumn"},
  {title: "ブルベ冬", key: "blueWinter"}
]

const createItems = (personalColors, dispatch, tmpConditions) =>
  personalColors.map(personalColor => ({
    label: personalColor.title,
    key: personalColor.key,
    // eslint-disable-next-line react/display-name
    selected: personalColor.key === tmpConditions.personalColor,
    onPress: () => {
      updateTmpConditionsPersonalColor(dispatch, personalColor.key)
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const PersonalColorInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const items = createItems(personalColors, dispatch, tmpConditions)

  return <ChipList items={items} />
}