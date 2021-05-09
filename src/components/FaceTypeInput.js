import React from "react"
import {updateTmpConditions} from "../stores/searchStore"
import {ChipList} from "./ChipList"
import {Image} from "react-native"
import * as thumbnail from "../../assets/faceType"
import {parseMasterData} from "../helper/requestHelper"
import {useDispatch, useSelector} from "react-redux"

const createItems = (faceTypes, dispatch, tmpConditions) =>
  faceTypes.map(faceType => ({
    label: faceType.label,
    key: faceType.key,
    selected: faceType.key === tmpConditions.face_type,
    onPress: () => updateTmpConditions(dispatch, tmpConditions, {face_type: faceType.key}),
    avatar: <Image source={thumbnail[faceType.key]} />
  }))


export const FaceTypeInput = () => {
  const dispatch = useDispatch()
  const {tmpConditions, masterData} = useSelector(({search: {tmpConditions}, app: {masterData}}) => ({tmpConditions, masterData}))
  const faceTypes = parseMasterData(masterData, "face_type")
  const items = createItems(faceTypes, dispatch, tmpConditions)

  return <ChipList items={items} />
}