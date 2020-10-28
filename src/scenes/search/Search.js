import React, {useContext} from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {SelectConditions} from "./SelectConditions"
import {searchStore, updateConditionsParts, fetchPosts} from "../../stores/searchStore"


const screens = [
  {label: "全体", routeName: "SelectAll", key: "all"},
  {label: "ベース", routeName: "SearchBaseMake", key: "baseMake"},
  {label: "リップ", routeName: "SearchLipMake", key: "lipMake"},
  {label: "アイ", routeName: "SearchEyeMake", key: "eyeMake"},
  {label: "アイブロウ", routeName: "SearchEyebrowMake", key: "eyebrowMake"},
  {label: "チーク・ハイライト・シェーディング", routeName: "SearchCheekHighlightShading", key:"cheekHighlightShading"}
]

const createRows = (screens, dispatch, conditions) => 
  screens.map(screen => ({
    label: screen.label,
    routeName: screen.routeName,
    key: screen.key,
    component: SelectConditions,
    listeners: {tabPress: () => {
      updateConditionsParts(dispatch, screen.key)
      fetchPosts(dispatch, conditions)
    }}
  }))

export const Search = () => {
  const {dispatch, state: {conditions}} = useContext(searchStore)

  return <TopNavigation items={createRows(screens, dispatch, conditions)} />
}
