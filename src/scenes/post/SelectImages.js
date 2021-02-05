import React, {useContext, useState, useEffect} from "react"
import {View, Image, Platform, TextInput, Text, SafeAreaView} from "react-native"
import {updatePostData, postStore} from "../../stores/postStore"
import * as ImagePicker from "expo-image-picker"
import {FakeInput} from "../../components/FakeInput"
import {ScrollView} from "react-native-gesture-handler"
import {TrendKeywordsInput} from "../../components/TrendKeywordsInput"
import {List} from "../../components/List"

const styles = {
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    height: "100%"
  },
  captionContainer: {
    flexDirection: "row"
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#999"
  },
  FakeInput: {
    marginTop: 10,
    height: 35
  },
  tag: {
    height: 40,
    backgroundColor: "#eee",
    marginVertical: 1
  }
}

const onChipPress = (navigation, dispatch, preTags) => keyword => () => {
  updatePostData(dispatch, {tags: preTags === "" ? `#${keyword}`: `${preTags} #${keyword}`})
  // navigation.navigate("SelectKeywords")
}

// eslint-disable-next-line max-lines-per-function
export const SelectImages = ({navigation}) => {
  const {dispatch, state: {tags}} = useContext(postStore)
  const [image, setImage] = useState(null)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
    // pickImage()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.captionContainer}>
          <Image source={{uri: image}} style={styles.image} />
          <TextInput placeholder="キャプションを書く"/>
        </View>
        <FakeInput navigation={navigation} icon="pound" linkTo="SelectKeywords" placeholder="タグ付け" style={styles.FakeInput} />
        {tags !== "" && <List rows={tags.split(" ").map(tag => ({title: tag, style: styles.tag}))} />}
        <TrendKeywordsInput onChipPress={onChipPress(navigation, dispatch, tags)} />
        <View>
          <Text>test</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
