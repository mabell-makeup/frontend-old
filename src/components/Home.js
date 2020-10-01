import * as React from "react"
import { Button } from "react-native-paper"
import { Actions } from "react-native-router-flux"
  
export const Home = () => 
  <Button icon="camera" mode="contained" onPress={Actions.register}>Go to register</Button>
