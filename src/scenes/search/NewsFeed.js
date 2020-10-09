import React from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {Search} from "./Search"
import {Women} from "./Women"

const categories = [
  {name: "Women", component: Women},
  {name: "Men", component: Search}
]

export const NewsFeed = () => <TopNavigation screens={categories} />
