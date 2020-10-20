import React from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {Men} from "./Men"
import {SearchAll} from "./SearchAll"
import {Women} from "./Women"


const screens = [
  {label: "全体", routeName: "SearchAll", component: SearchAll},
  {label: "アイメイク", routeName: "SearchEyeMake", component: Men},
  {label: "リップメイク", routeName: "SearchLipMake", component: Women},
  {label: "ユーザー", routeName: "SearchUser", component: Women}
]

export const Search = () => <TopNavigation screens={screens} />