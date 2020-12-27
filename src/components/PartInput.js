import React, {useContext} from "react"
import {List} from "./List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateTmpConditionsPart, fetchPosts} from "../stores/searchStore"

const parts = [
  {title: "ベース", key: "baseMake"},
  {title: "リップ", key: "lipMake"},
  {title: "アイ", key: "eyeMake"},
  {title: "アイブロウ", key: "eyebrowMake"},
  {title: "チーク・ハイライト・シェーディング", key:"cheekHighlightShading"}
]

const createRows = (parts, dispatch, tmpConditions) =>
  parts.map(part => ({
    title: part.title,
    key: part.key,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={part.key === tmpConditions.part ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateTmpConditionsPart(dispatch, part.key)
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const PartInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const rows = createRows(parts, dispatch, tmpConditions)

  return <List rows={rows} />
}
