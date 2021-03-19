import React from "react"
import {parseMasterData} from "../../helper/requestHelper"
import {updateTmpConditions} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"
import {useDispatch, useSelector} from "react-redux"

const createItems = (makeupCategories, dispatch, tmpConditions) =>
  makeupCategories.map(category => ({
    label: category.label,
    key: category.key,
    // eslint-disable-next-line react/display-name
    selected: category.key === tmpConditions.makeup_categories,
    onPress: () => updateTmpConditions(dispatch, tmpConditions, {makeup_categories: category.key})
  }))


export const MakeUpCategoryInput = () => {
  const dispatch = useDispatch()
  const {tmpConditions, masterData} = useSelector(({search: {tmpConditions}, app: {masterData}}) => ({tmpConditions, masterData}))
  const makeupCategories = parseMasterData(masterData, "makeup_categories")
  const items = createItems(makeupCategories, dispatch, tmpConditions)

  return <ChipList items={items} />
}
