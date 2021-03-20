import React from "react"
import {parseMasterData} from "../helper/requestHelper"
import {ChipList} from "./ChipList"
import {useSelector} from "react-redux"

const createItems = (makeUpCategories, tmpState, onPress) =>
  makeUpCategories.map(({label, key}) => ({
    label,
    key,
    selected: key === tmpState.makeup_categories,
    onPress: onPress(key)
  }))


export const MakeUpCategoryInput = ({tmpState={}, onPress=category=>category}) => {
  const {masterData} = useSelector(({post: {tmpState}, app: {masterData}}) => ({tmpState, masterData}))
  const makeUpCategories = parseMasterData(masterData, "makeup_categories")
  const items = createItems(makeUpCategories, tmpState, onPress)

  return <ChipList items={items} />
}
