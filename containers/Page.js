import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import Ticker from '../components/Ticker';
import TradeTable from '../components/Trade';
import OrderTable from '../components/Order';

function Page(props) {
  useEffect(() => {
    props.initWS();
  }, []);
  return (
    <View style={{ padding: 6 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 18,
          padding: 9
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{props.symbol}</Text>
        <Button title="Press me" onPress={props.initSymbol} />
      </View>
      <Ticker tickerData={props.tickerData} symbol={props.symbol} />
      <TradeTable tradeData={props.tradeData} />
      <OrderTable orderData={props.orderData} />
    </View>
  );
}

export default connect(
  ({ app: { ticker, trades, books, symbol } }) => ({
    tickerData: ticker[symbol],
    tradeData: trades[symbol],
    orderData: books[symbol],
    symbol
  }),
  dispatch => ({
    initSymbol: dispatch.app.initSymbol,
    initWS: dispatch.app.initWS
  })
)(Page);
