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

export const openReportInappropriateContentPage = async (post_id) => {
  const supported = await Linking.canOpenURL(`https://docs.google.com/forms/d/e/1FAIpQLSdK7ioFpUb-dAnxuZtnYMNeZI9air8J_aP18omlH7is9T6MhQ/viewform?usp=pp_url&entry.2005620554=${post_id}`)
  if (supported) {
    await Linking.openURL(`https://docs.google.com/forms/d/e/1FAIpQLSdK7ioFpUb-dAnxuZtnYMNeZI9air8J_aP18omlH7is9T6MhQ/viewform?usp=pp_url&entry.2005620554=${post_id}`)
  } else {
    Alert.alert(
      "Error",
      "ページを開けませんでした",
      [{text: "閉じる"}],
      {cancelable: false}
    )
  }
}