import React, {useContext} from "react"
import {appStore} from "../stores/appStore"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"

const createItems = (makeUpCategories, dispatch, tmpConditions) =>
  makeUpCategories.map(category => ({
    label: category.label,
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
  const {state: {masterData}} = useContext(appStore)
  const makeUpCategories = Object.entries(masterData.makeup_categories).map(([label, key]) => ({label, key}))
  const items = createItems(makeUpCategories, dispatch, tmpConditions)

  return <ChipList items={items} />
}
