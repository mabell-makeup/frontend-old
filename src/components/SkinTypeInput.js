import React, {useContext} from "react"
import {searchStore, updateTmpConditions} from "../stores/searchStore"
import {ChipList} from "./ChipList"
import {appStore} from "../stores/appStore"
import {parseMasterData} from "../helper/requestHelper"

const createItems = (skinTypes, dispatch, tmpConditions) =>
  skinTypes.map(skinType => ({
    label: skinType.label,
    key: skinType.key,
    // eslint-disable-next-line react/display-name
    selected: skinType.key === tmpConditions.skin_type,
    onPress: () => updateTmpConditions(dispatch, tmpConditions, {skin_type: skinType.key})
  }))


export const SkinTypeInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const skinTypes = parseMasterData(masterData, "skin_type")
  const items = createItems(skinTypes, dispatch, tmpConditions)

  return <ChipList items={items} />
}