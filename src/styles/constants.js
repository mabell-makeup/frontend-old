import {Dimensions, Platform} from "react-native"

export const WINDOW_WIDTH = Dimensions.get("window").width
export const WINDOW_HEIGHT = Dimensions.get("window").height

export const KEYWORD_SEARCH_PLACE_HOLDER = "秋 ハロウィーン etc..."

export const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"