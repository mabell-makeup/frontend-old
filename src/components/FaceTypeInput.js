import React, {useContext} from "react"
import {List} from "./List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateTmpConditionsFaceType, fetchPosts} from "../stores/searchStore"

const faceTypes = [
  {title: "フレッシュ", key: "fresh"},
  {title: "キュート",  key: "cute"},
  {title: "ソフトエレガント",  key: "softElegant"},
  {title: "アクティブキュート", key: "activeCute"},
  {title: "クール", key: "cool"},
  {title: "フェミニン", key: "feminine"},
  {title: "クールカジュアル", key: "coolCasual"},
  {title: "エレガント", key: "elegant"}
]

const createRows = (faceTypes, dispatch, tmpConditions) =>
  faceTypes.map(faceType => ({
    title: faceType.title,
    key: faceType.key,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={faceType.key === tmpConditions.faceType ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateTmpConditionsFaceType(dispatch, faceType.key)
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const FaceTypeInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const rows = createRows(faceTypes, dispatch, tmpConditions)

  return <List rows={rows} />
}