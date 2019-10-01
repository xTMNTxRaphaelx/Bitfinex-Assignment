import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import Ticker from '../components/Ticker';
import TradeTable from '../components/Trade';

function Page(props) {
  console.log('page', props);
  return (
    <View>
      <Text>Welcome</Text>
      <Button title="Press me" onPress={props.initSymbol} />
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
