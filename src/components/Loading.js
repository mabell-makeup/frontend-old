import * as React from "react"
import {StyleSheet} from "react-native"
import {ActivityIndicator} from "react-native-paper"
import {WINDOW_HEIGHT} from "../styles/constants"
import {Overlay} from "./Overlay"

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    top: WINDOW_HEIGHT / 3,
    left: 0,
    right: 0
  }
})

export const Loading = ({isLoading=false}) =>
  isLoading &&
    <Overlay>
      <ActivityIndicator animating={isLoading} color="tomato" size="large" style={styles.spinner} />
    </Overlay>