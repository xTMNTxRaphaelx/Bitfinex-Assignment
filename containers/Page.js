import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import Ticker from '../components/Ticker';
import TradeTable from '../components/Trade';
import OrderTable from '../components/Order';

function Page(props) {
  const [showCurrencyModal, setModal] = useState(false);
  useEffect(() => {
    props.initWS();
  }, []);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#2b3940',
          borderBottomWidth: 2,
          paddingTop: 32,
          paddingBottom: 15,
          paddingLeft: 9,
          paddingRight: 9,
          borderBottomColor: '#000'
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 24,
            fontWeight: 'bold',
            color: props.isOnline ? 'green' : 'red'
          }}
        >
          {props.symbol}
        </Text>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: '#2b3940' }}>
        <Ticker tickerData={props.tickerData} symbol={props.symbol} />
        <TradeTable tradeData={props.tradeData} />
        <OrderTable orderData={props.orderData} />
      </ScrollView>
    </View>
  );
}

export default connect(
  ({ app: { isOnline, ticker, trades, books, symbol } }) => ({
    tickerData: ticker[symbol],
    tradeData: trades[symbol],
    orderData: books[symbol],
    isOnline,
    symbol
  }),
  dispatch => ({
    setSymbol: dispatch.app.setSymbol,
    initSymbol: dispatch.app.initSymbol,
    initWS: dispatch.app.initWS
  })
)(Page);
