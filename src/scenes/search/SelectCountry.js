import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateTmpConditionsCountry, fetchPosts} from "../../stores/searchStore"

const countries = [
  {title: "韓国", key: "korea"},
  {title: "中国",  key: "china"},
  {title: "欧米",  key: "america"},
  {title: "その他", key: "other"}
]

const createRows = (countries, dispatch, tmpConditions, navigation) =>
  countries.map(country => ({
    title: country.title,
    key: country.key,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={country.key === tmpConditions.country ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateTmpConditionsCountry(dispatch, country.key)
      fetchPosts(dispatch, tmpConditions)
      navigation.goBack()
    }
  }))


export const SelectCountry = ({navigation}) => {
  const {dispatch, state} = useContext(searchStore)
  const rows = createRows(countries, dispatch, state.tmpConditions, navigation)

  return (
    <ScrollView>
      <List rows={rows} />
    </ScrollView>
  )
}