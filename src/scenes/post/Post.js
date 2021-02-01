import React, {useState} from "react"
import {View, SafeAreaView} from "react-native"
// import * as ImagePicker from "expo-image-picker"
import {IconButton} from "react-native-paper"
import {TouchableOpacity} from "react-native-gesture-handler"
import {ImagePicker} from "../../components/ImagePicker"
import {Carousel} from "../../components/Carousel"

const createStyles = () => ({
  surface: {
    width: 320,
    height: 320,
    marginBottom: 20,
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
  carousel: {
    width: 320,
    height: 340
  },
  imageContainer: {
    margin: 20,
    alignItems: "center"
  }
})


export const Post = ({navigation}) => {
  const [images, setImages] = useState([])
  const styles = createStyles()

  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        {images.length > 0
          ? <View style={styles.carousel}><Carousel data={images.map(item => item.uri)} /></View>
          : <TouchableOpacity style={styles.surface}><IconButton icon="image" size={30} color="#666" /></TouchableOpacity>
        }
      </View>
      <ImagePicker navigation={navigation} setImages={setImages} />
    </SafeAreaView>
  )
}