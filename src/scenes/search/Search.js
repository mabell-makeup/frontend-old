import React from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {SelectConditions} from "./SelectConditions"
import {useDispatch, useSelector} from "react-redux"

const screens = [
  {label: "メイク", routeName: "SearchMakeup", key: "makeup", component: SelectConditions},
  // {label: "ユーザー", routeName: "SearchUser", key: "user", component: SorryPage}
]

const createRows = (screens, dispatch, tmpConditions) => 
  screens.map(({label, routeName, key, component}) => ({
    label,
    routeName,
    key,
    component
    // listeners: {tabPress: () => updateTmpConditions(dispatch, tmpConditions, {target: key})}
  }))

export const Search = () => {
  const dispatch = useDispatch()
  const tmpConditions = useSelector(({search: {tmpConditions}}) => tmpConditions)

  return <TopNavigation items={createRows(screens, dispatch, tmpConditions)} />
}
