import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import Ticker from '../components/Ticker';

function Page(props) {
  console.log('page', props);
  return (
    <View>
      <Text>Welcome</Text>
      <Button title="Press me" onPress={props.getTickerData} />
      <Ticker tickerData={props.tickerData} symbol={props.symbol} />
    </View>
  );
}

export default connect(
  ({ app: { ticker, symbol } }) => ({ tickerData: ticker[symbol], symbol }),
  dispatch => ({ getTickerData: dispatch.app.getTickerData })
)(Page);
