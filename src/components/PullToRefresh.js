import React, {useState} from "react"
import {RefreshControl} from "react-native"
import {primary} from "../styles/colors"


export const PullToRefresh = ({refreshFunc}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  return (
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
  )
}