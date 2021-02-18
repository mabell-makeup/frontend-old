import React, {useContext} from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {SelectConditions} from "./SelectConditions"
import {searchStore, updateTmpConditions} from "../../stores/searchStore"
import {SorryPage} from "../../components/SorryPage"

const screens = [
  {label: "メイク", routeName: "SearchMakeup", key: "makeup", component: SelectConditions},
  {label: "ユーザー", routeName: "SearchUser", key: "user", component: SorryPage}
]

const createRows = (screens, dispatch, tmpConditions) => 
  screens.map(({label, routeName, key, component}) => ({
    label,
    routeName,
    key,
    component,
    listeners: {tabPress: () => updateTmpConditions(dispatch, tmpConditions, {target: key})}
  }))

export const Search = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)

  return <TopNavigation items={createRows(screens, dispatch, tmpConditions)} />
}
