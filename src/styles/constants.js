import {Dimensions, Platform} from "react-native"

export const WINDOW_WIDTH = Dimensions.get("window").width
export const WINDOW_HEIGHT = Dimensions.get("window").height

export const TAG_SEARCH_PLACE_HOLDER = "メイクをさがす"
export const PRODUCT_SEARCH_PLACE_HOLDER = "つやぷるリップ etc..."

export const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"