import React, {useState} from "react"
import {RefreshControl, ScrollView} from "react-native"


export const ScrollViewWithRefresh = ({refreshFunc, children}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={async () => {
            setIsRefreshing(true)
            await refreshFunc()
            setIsRefreshing(false)
          }}
        />
      }
    >
      {children}
    </ScrollView>
  )
}