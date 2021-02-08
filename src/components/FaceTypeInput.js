import React, {useContext} from "react"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"
import {Image} from "react-native"
import * as thumbnail from "../../assets/faceType"
import {appStore} from "../stores/appStore"
import {parseMasterData} from "../helper/requestHelper"

const createItems = (faceTypes, dispatch, tmpConditions) =>
  faceTypes.map(faceType => ({
    label: faceType.label,
    key: faceType.key,
    // eslint-disable-next-line react/display-name
    selected: faceType.key === tmpConditions.faceType,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {faceType: faceType.key})
      fetchPosts(dispatch, tmpConditions)
    },
    avatar: <Image source={thumbnail[faceType.key]} />
  }))


export const FaceTypeInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const faceTypes = parseMasterData(masterData, "face_type")
  const items = createItems(faceTypes, dispatch, tmpConditions)

  return <ChipList items={items} />
}