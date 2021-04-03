import React from "react"
import {updateTmpConditions} from "../stores/searchStore"
import {ChipList} from "./ChipList"
import {parseMasterData} from "../helper/requestHelper"
import {useDispatch, useSelector} from "react-redux"

const createItems = (skinTypes, dispatch, tmpConditions) =>
  skinTypes.map(skinType => ({
    label: skinType.label,
    key: skinType.key,
    selected: skinType.key === tmpConditions.skin_type,
    onPress: () => updateTmpConditions(dispatch, tmpConditions, {skin_type: skinType.key})
  }))


export const SkinTypeInput = () => {
  const dispatch = useDispatch()
  const {tmpConditions, masterData} = useSelector(({search: {tmpConditions}, app: {masterData}}) => ({tmpConditions, masterData}))
  const skinTypes = parseMasterData(masterData, "skin_type")
  const items = createItems(skinTypes, dispatch, tmpConditions)

  return <ChipList items={items} />
}