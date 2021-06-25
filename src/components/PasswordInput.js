import React, {useState} from "react"
import {StyleSheet} from "react-native"
import {TextInput} from "react-native-paper"

const styles = StyleSheet.create({
  input: {
    maxHeight: 50,
    width: 300,
    margin: 10
  }
})

export const PasswordInput = ({
  onChangeText, isError, label="パスワード"
}) => {
  const [viewPassword, setViewPassword] = useState(true)

  return <TextInput 
    style={styles.input} 
    mode="outlined"
    label={label}
    right={<TextInput.Icon name={viewPassword ? "eye-off" : "eye"}
      color={viewPassword ? "#999" : "#555"}
      onPress={() => setViewPassword(!viewPassword)}
    />}
    onChangeText={onChangeText}
    error={isError}
    secureTextEntry={viewPassword}
  />
}

