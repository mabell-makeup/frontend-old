import * as React from "react"
import { Button } from "react-native-paper"
import { Actions } from "react-native-router-flux"
  
export const Register = () => 
  <Button icon="camera" mode="contained" onPress={Actions.login}>Go to login</Button>
