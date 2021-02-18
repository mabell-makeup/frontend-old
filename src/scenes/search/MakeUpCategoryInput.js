import React, {useContext} from "react"
import {parseMasterData} from "../../helper/requestHelper"
import {appStore} from "../../stores/appStore"
import {searchStore, updateTmpConditions, fetchPosts} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"

const createItems = (makeUpCategories, dispatch, tmpConditions) =>
  makeUpCategories.map(category => ({
    label: category.label,
    key: category.key,
    // eslint-disable-next-line react/display-name
    selected: category.key === tmpConditions.makeUpCategory,
    onPress: () => updateTmpConditions(dispatch, tmpConditions, {makeUpCategory: category.key})
  }))


export const MakeUpCategoryInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const makeUpCategories = parseMasterData(masterData, "makeup_categories")
  const items = createItems(makeUpCategories, dispatch, tmpConditions)

  return <ChipList items={items} />
}
