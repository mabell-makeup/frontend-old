import React, {useContext} from "react"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"

const makeUpCategories = [
  {title: "下地", key: "base"},
  {title: "ファンデ", key: "foundation"},
  {title: "フェイスパウダー", key: "facePowder"},
  {title: "アイブロウ", key: "eyebrow"},
  {title: "アイシャドウ", key: "eyeshadow"},
  {title: "アイライン", key: "eyeline"},
  {title: "マスカラ", key: "mascara"},
  {title: "リップ", key: "lip"},
  {title: "チーク", key:"cheek"},
  {title: "ハイライト", key:"highlight"},
  {title: "シェーディング", key:"shading"}
]

const createItems = (makeUpCategories, dispatch, tmpConditions) =>
  makeUpCategories.map(category => ({
    label: category.title,
    key: category.key,
    // eslint-disable-next-line react/display-name
    selected: category.key === tmpConditions.makeUpCategory,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {makeUpCategory: category.key})
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const MakeUpCategoryInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const items = createItems(makeUpCategories, dispatch, tmpConditions)

  return <ChipList items={items} />
}
