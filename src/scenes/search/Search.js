import React from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {Men} from "./Men"
import {SearchMakeUp} from "./SearchMakeUp"
import {Women} from "./Women"


const screens = [
  {name: "全体", component: SearchMakeUp},
  {name: "アイメイク", component: Men},
  {name: "リップメイク", component: Women},
  {name: "アイテム", component: Men},
  {name: "ユーザー", component: Women}
]

export const Search = () => <TopNavigation screens={screens} />