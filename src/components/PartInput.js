import React, {useContext} from "react"
import {searchStore, updateTmpConditionsPart, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"

const parts = [
  {title: "ベース", key: "baseMake"},
  {title: "リップ", key: "lipMake"},
  {title: "アイ", key: "eyeMake"},
  {title: "アイブロウ", key: "eyebrowMake"},
  {title: "チーク・ハイライト・シェーディング", key:"cheekHighlightShading"}
]

const createItems = (parts, dispatch, tmpConditions) =>
  parts.map(part => ({
    label: part.title,
    key: part.key,
    // eslint-disable-next-line react/display-name
    selected: part.key === tmpConditions.part,
    onPress: () => {
      updateTmpConditionsPart(dispatch, part.key)
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const PartInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const items = createItems(parts, dispatch, tmpConditions)

  return <ChipList items={items} />
}
