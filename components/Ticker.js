import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Ticker({ tickerData = [] }) {
  const [
    BID,
    BID_SIZE,
    ASK,
    ASK_SIZE,
    DAILY_CHANGE,
    DAILY_CHANGE_PERC,
    LAST_PRICE,
    VOLUME,
    HIGH,
    LOW
  ] = tickerData;
  return (
    <View style={styles.tickerContainer}>
      <View style={styles.tickerRow}>
        <Text style={styles.tickerText}>BTC/USD</Text>
        <Text style={styles.tickerText}>{BID}</Text>
      </View>
      <View style={styles.tickerRow}>
        <Text style={styles.tickerText}>Vol {VOLUME} BTC</Text>
        <Text style={styles.tickerText}>
          {DAILY_CHANGE} ^ ({DAILY_CHANGE_PERC * 100}%)
        </Text>
      </View>
      <View style={styles.tickerRow}>
        <Text style={styles.tickerText}>LOW {LOW} BTC</Text>
        <Text style={styles.tickerText}>HIGH {HIGH} BTC</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  tickerContainer: {
    backgroundColor: '#000'
  },
  tickerRow: {
    flexDirection: 'row'
  },
  tickerText: {
    color: '#fff'
  }
});

export default Ticker;
