import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Modal } from 'react-native';
import { connect } from 'react-redux';
import Ticker from '../components/Ticker';
import TradeTable from '../components/Trade';
import OrderTable from '../components/Order';

function Page(props) {
  const [showCurrencyModal, setModal] = useState(false);
  useEffect(() => {
    props.initWS();
  }, []);
  function changeToBTC(target) {
    props.setSymbol('tLTCUSD');
  }
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
        <Button onPress={e => setModal(true)} title="Edit" />
        <Button title="Load" onPress={props.initSymbol} />
      </View>
      <Ticker tickerData={props.tickerData} symbol={props.symbol} />
      <TradeTable tradeData={props.tradeData} />
      <OrderTable orderData={props.orderData} />
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={showCurrencyModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View>
          <Button onPress={e => props.setSymbol('tBTCUSD')} title="BTC/USD" />
          <Button onPress={e => props.setSymbol('tLTCUSD')} title="LTC/USD" />
          <Button onPress={e => props.setSymbol('tETHUSD')} title="ETH/USD" />
          <Button
            title="Click To Close Modal"
            onPress={() => {
              setModal(!showCurrencyModal);
            }}
          />
        </View>
      </Modal>
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
    setSymbol: dispatch.app.setSymbol,
    initSymbol: dispatch.app.initSymbol,
    initWS: dispatch.app.initWS
  })
)(Page);
