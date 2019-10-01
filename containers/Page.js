import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import Ticker from '../components/Ticker';
import TradeTable from '../components/Trade';

function Page(props) {
  console.log('page', props);
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
    </View>
  );
}

export default connect(
  ({ app: { ticker, trade, symbol } }) => ({
    tickerData: ticker[symbol],
    tradeData: trade[symbol],
    symbol
  }),
  dispatch => ({ initSymbol: dispatch.app.initSymbol })
)(Page);
