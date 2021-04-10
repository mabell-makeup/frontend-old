import React, {useState} from "react"
import {RefreshControl, ScrollView} from "react-native"
import {primary} from "../styles/colors"


export const ScrollViewWithRefresh = ({refreshFunc, children, ...props}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          colors={[primary]}
          tintColor={primary}
          onRefresh={async () => {
            setIsRefreshing(true)
            const promise = refreshFunc()
            setTimeout(() => {
              promise.then(() => setIsRefreshing(false))
            }, 1000) // 最短でも1秒間はローディングを表示する
          }}
        />
      }
      {...props}
    >
      {children}
    </ScrollView>
  )
}