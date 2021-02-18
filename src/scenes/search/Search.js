import React, {useContext} from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {SelectConditions} from "./SelectConditions"
import {searchStore, updateTmpConditions, fetchPosts} from "../../stores/searchStore"

const screens = [
  {label: "メイク", routeName: "SearchMakeup", key: "makeup"},
  {label: "ユーザー", routeName: "SearchUser", key: "user"}
]

const createRows = (screens, dispatch, tmpConditions) => 
  screens.map(screen => ({
    label: screen.label,
    routeName: screen.routeName,
    key: screen.key,
    component: SelectConditions,
    listeners: {tabPress: () => updateTmpConditions(dispatch, tmpConditions, {target: screen.key})}
  }))

export const Search = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)

  return <TopNavigation items={createRows(screens, dispatch, tmpConditions)} />
}
