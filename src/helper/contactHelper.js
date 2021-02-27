import {Alert, Linking} from "react-native"

export const openContactPage = async () => {
  const supported = await Linking.canOpenURL("https://forms.gle/BJ1aSdUmn5ukG35c7")
  if (supported) {
    await Linking.openURL("https://forms.gle/BJ1aSdUmn5ukG35c7")
  } else {
    Alert.alert(
      "Error",
      "ページを開けませんでした",
      [{text: "閉じる"}],
      {cancelable: false}
    )
  }
}
