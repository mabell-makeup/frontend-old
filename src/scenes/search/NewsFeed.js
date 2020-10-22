import React from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {Men} from "./Men"
import {Women} from "./Women"

const screens = [
  {label: "Women", routeName: "Women", component: Women},
  {label: "Men", routeName: "Men", component: Men}
]

export const NewsFeed = () => <TopNavigation screens={screens} />
