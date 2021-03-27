import React from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {parseMasterData} from "../../helper/requestHelper"
import {updateSearchResult, updateTmpConditions} from "../../stores/searchStore"
import {SearchResult} from "./SearchResult"
import {useDispatch, useSelector} from "react-redux"


const createItems = (screens, dispatch, tmpConditions) => 
  screens.map(({label, key}) => ({
    label,
    routeName: label,
    component: SearchResult,
    key,
    listeners: {focus: () => changeTab(dispatch, tmpConditions, key)}
  }))

const changeTab = async (dispatch, tmpConditions, key) => {
  await updateTmpConditions(dispatch, tmpConditions, {gender: key}, false)
  updateSearchResult(dispatch)
}

export const NewsFeed = () => {
  const dispatch = useDispatch()
  const {tmpConditions, masterData} = useSelector(({search: {tmpConditions}, app: {masterData}}) => ({tmpConditions, masterData}))
  const genders = parseMasterData(masterData, "gender")
  const items = createItems(genders, dispatch, tmpConditions)

  return <TopNavigation items={items} />
}
