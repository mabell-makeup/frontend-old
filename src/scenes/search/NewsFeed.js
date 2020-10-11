import React from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {Men} from "./Men"
import {Women} from "./Women"

const screens = [
  {name: "Women", component: Women},
  {name: "Men", component: Men}
]

export const NewsFeed = () => <TopNavigation screens={screens} />