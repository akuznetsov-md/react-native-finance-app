import * as React from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "../../theme"
import { Icon } from "../../components/Icon"
import { $textPrimaryLight, TextThemed, ViewThemed } from "../../components"
import { useColorSchemeStyle } from "../../theme/useColorSchemeStyle"
import { AccountDTO } from "../../services/api"
import { formatMoney } from "../../utils/formatMoney"

export interface AccountCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  account: AccountDTO
}

/**
 * Describe your component here
 */
export const AccountCard = observer(function AccountCard(props: AccountCardProps) {
  const { style, account } = props

  const $styles = [$container, style]

  const [activeBalance, setActiveBalance] = React.useState(account.balances[0])

  const $accountNumberStyle = useColorSchemeStyle({
    light: [$accountNumber, $textPrimaryLight],
    dark: $accountNumber,
  })
  const $currencyLabelStyle = useColorSchemeStyle({
    light: [$currencyLabel, $textPrimaryLight],
    dark: [$currencyLabel],
  })

  return (
    <ViewThemed style={$styles}>
      <View style={$accountSummary}>
        <View style={$accountSummaryLeft}>
          <TextThemed style={$accountName}>{account.name}</TextThemed>
          <TextThemed style={$accountNumberStyle} variant="secondary">
            {account.number}
          </TextThemed>
        </View>
        <View style={$accountSummaryRight}>
          <Pressable style={$accountMoreButton} onPress={() => {}}>
            <Icon size={24} icon={"more"} color={"white"} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={[$accountCurrencySwitcher, $currencyList]} horizontal>
        {account.balances.map((balance) => (
          <Pressable
            key={balance.currency.id}
            style={[$currency, activeBalance === balance ? $currencyActive : null]}
            onPress={() => setActiveBalance(balance)}
          >
            <TextThemed
              variant="secondary"
              style={[
                $currencyLabelStyle,
                balance === activeBalance ? $currencyLabelActive : null,
              ].flat()}
            >
              {balance.currency.name}
            </TextThemed>
          </Pressable>
        ))}
      </ScrollView>

      <TextThemed style={$accountBalance}>{formatMoney(activeBalance.amount)}</TextThemed>
      <TextThemed style={$accountBalanceLabel}>Current balance</TextThemed>
    </ViewThemed>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: 15,
  paddingTop: 10,
  paddingBottom: 13,
  borderRadius: 25,
}

const $accountName: TextStyle = {
  fontSize: 22,
  fontFamily: typography.primary.bold,
}
const $accountNumber: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
}
const $accountSummary: ViewStyle = {
  flexDirection: "row",
}
const $accountSummaryLeft: ViewStyle = {
  flex: 1,
}
const $accountSummaryRight: ViewStyle = {
  marginLeft: "auto",
}
const $accountMoreButton: ViewStyle = {
  backgroundColor: "#F76654",
  borderRadius: 20,
  width: 40,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
}
const $accountCurrencySwitcher: ViewStyle = {}
const $accountBalance: TextStyle = {
  lineHeight: 41,
  fontSize: 34,
  fontFamily: typography.primary.bold,
}
const $accountBalanceLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
}

const $currencyList: ViewStyle = {
  paddingVertical: 16,
}
const $currency: ViewStyle = {
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginRight: 10,
}
const $currencyActive: ViewStyle = {
  backgroundColor: "#523CF8",
}
const $currencyLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 15,
  fontFamily: typography.primary.semiBold,
}
const $currencyLabelActive: TextStyle = {
  color: "white",
}
