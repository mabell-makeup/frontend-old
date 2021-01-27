import React, {useState} from "react"
import {View, SafeAreaView} from "react-native"
// import * as ImagePicker from "expo-image-picker"
import {IconButton} from "react-native-paper"
import {WINDOW_WIDTH} from "../../styles/constants"
import {TouchableOpacity} from "react-native-gesture-handler"
import {ImagePicker} from "../../components/ImagePicker"

const createStyles = () => ({
  surface: {
    width: WINDOW_WIDTH * 0.8,
    height: WINDOW_WIDTH * 0.8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1
  },
  imageContainer: {
    paddingTop: 20,
    alignItems: "center"
  }
})

// const pickImage = setImage => async () => {
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.All,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1
//   })

//   !result.cancelled && setImage(result.uri)
// }

export const Post = ({navigation}) => {
  const [image, setImage] = useState(null)
  const styles = createStyles()

  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.surface} /* onPress={pickImage(setImage)} */>
          <IconButton icon="image" size={30} color="#666" />
        </TouchableOpacity>
      </View>
      <ImagePicker navigation={navigation} />
    </SafeAreaView>
  )
}