import React from "react"
import {View, Text, SafeAreaView} from "react-native"
import {Button} from "react-native-paper"

export const MyPage = ({navigation}) => 
  <SafeAreaView>
    <View>
      <Text>ここはMyPageです。</Text>
      <Button
        icon="pencil-plus-outline"
        size={25}
        mode="outlined"
        onPress={() => navigation.navigate("PostScreen", {screen: "Post"})}
      >
        投稿する
      </Button>
    </View>
  </SafeAreaView>