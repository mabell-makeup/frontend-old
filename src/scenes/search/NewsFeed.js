import React, {useContext} from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {parseMasterData} from "../../helper/requestHelper"
import {appStore} from "../../stores/appStore"
import {searchStore, updateSearchResult, updateTmpConditions} from "../../stores/searchStore"
import {Women} from "./Women"


const createItems = (screens, dispatch, tmpConditions, searchResult) => 
  screens.map(({label, key}) => ({
    label,
    routeName: label,
    component: Women,
    key,
    listeners: {focus: () => changeTab(dispatch, tmpConditions, key, searchResult)}
  }))

const changeTab = async (dispatch, tmpConditions, key, searchResult) => {
  await updateTmpConditions(dispatch, tmpConditions, searchResult.length === 0 ? {} : {gender: key})
  updateSearchResult(dispatch)
}

export const NewsFeed = () => {
  const {dispatch, state: {tmpConditions, searchResult}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const genders = parseMasterData(masterData, "gender")
  const items = createItems(genders, dispatch, tmpConditions, searchResult)

  return <TopNavigation items={items} />
}
