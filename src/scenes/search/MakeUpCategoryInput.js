import React, {useContext} from "react"
import {parseMasterData} from "../../helper/requestHelper"
import {appStore} from "../../stores/appStore"
import {searchStore, updateTmpConditions} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"

const createItems = (makeupCategories, dispatch, tmpConditions) =>
  makeupCategories.map(category => ({
    label: category.label,
    key: category.key,
    // eslint-disable-next-line react/display-name
    selected: category.key === tmpConditions.makeup_categories,
    onPress: () => updateTmpConditions(dispatch, tmpConditions, {makeup_categories: category.key})
  }))


export const MakeUpCategoryInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const makeupCategories = parseMasterData(masterData, "makeup_categories")
  const items = createItems(makeupCategories, dispatch, tmpConditions)

  return <ChipList items={items} />
}
