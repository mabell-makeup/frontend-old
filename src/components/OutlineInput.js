import React, {useContext} from "react"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"
import {Image} from "react-native"
import * as thumbnail from "../../assets/outlineThumbnail"

const outlines = [
  {title: "丸顔", key: "round"},
  {title: "面長",  key: "long"},
  {title: "逆三角",  key: "invertedTriangle"},
  {title: "ひし形", key: "diamond"},
  {title: "ベース型", key: "base"},
  {title: "八角形", key: "octagon"},
  {title: "卵型", key: "egg"}
]

const createItems = (outlines, dispatch, tmpConditions) =>
  outlines.map(outline => ({
    label: outline.title,
    key: outline.key,
    // eslint-disable-next-line react/display-name
    selected: outline.key === tmpConditions.outline,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {outline: outline.key})
      fetchPosts(dispatch, tmpConditions)
    },
    avatar: <Image source={thumbnail[outline.key]} />
  }))


export const OutlineInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const items = createItems(outlines, dispatch, tmpConditions)

  return <ChipList items={items} />
}