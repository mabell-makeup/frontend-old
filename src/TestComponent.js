import * as React from "react"
import { Button } from "react-native-paper"

export const TestComponent = () => 
  <Button icon="camera" mode="contained" onPress={() => console.log("Pressed")}>Press me</Button>