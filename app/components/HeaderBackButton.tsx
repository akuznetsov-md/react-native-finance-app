import * as React from "react"
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Icon } from "./Icon"
import { useNavigation } from "@react-navigation/native"

interface HeaderBackButtonProps {
  style?: StyleProp<ViewStyle>
  canGoBack: boolean
}

export const HeaderBackButton = observer(function HeaderBackButton(props: HeaderBackButtonProps) {
  const { style, canGoBack } = props
  const $styles = [$container, style]

  const navigation = useNavigation()

  return (
    <TouchableOpacity style={$styles}>
      <Icon icon="back" size={20} color="white" onPress={canGoBack ? navigation.goBack : null} />
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  width: 48,
  height: 48,
  alignItems: "flex-start",
  justifyContent: "center",
}
