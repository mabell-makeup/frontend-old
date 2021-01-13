import React, {useContext} from "react"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"

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

const createItems = (faceTypes, dispatch, tmpConditions) =>
  faceTypes.map(faceType => ({
    label: faceType.title,
    key: faceType.key,
    // eslint-disable-next-line react/display-name
    selected: faceType.key === tmpConditions.faceType,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {faceType: faceType.key})
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const FaceTypeInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const items = createItems(faceTypes, dispatch, tmpConditions)

  return <ChipList items={items} />
}