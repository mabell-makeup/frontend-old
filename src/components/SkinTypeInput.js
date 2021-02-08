import React, {useContext} from "react"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"
import {appStore} from "../stores/appStore"
import {parseMasterData} from "../helper/requestHelper"

const createItems = (skinTypes, dispatch, tmpConditions) =>
  skinTypes.map(skinType => ({
    label: skinType.label,
    key: skinType.key,
    // eslint-disable-next-line react/display-name
    selected: skinType.key === tmpConditions.skinType,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {skinType: skinType.key})
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const SkinTypeInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const skinTypes = parseMasterData(masterData, "skin_type")
  const items = createItems(skinTypes, dispatch, tmpConditions)

  return <ChipList items={items} />
}