import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Ticker({ symbol, tickerData = [] }) {
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
        <Text style={{ ...styles.tickerText, ...styles.largeText }}>
          {symbol}
        </Text>
        <Text style={{ ...styles.tickerText, ...styles.largeText }}>{BID}</Text>
      </View>
      <View style={styles.tickerRow}>
        <Text style={styles.tickerText}>
          <Text style={styles.label}>Vol </Text>
          {(VOLUME || 0).toFixed(1)} BTC
        </Text>
        <Text style={styles.tickerText}>
          {DAILY_CHANGE}
          <Text
            style={
              DAILY_CHANGE_PERC > 0 ? { color: 'green' } : { color: 'red' }
            }
          >
            {DAILY_CHANGE_PERC > 0 ? '^' : 'v'}
          </Text>
          ({((DAILY_CHANGE_PERC || 0) * 100).toFixed(1)}%)
        </Text>
      </View>
      <View style={styles.tickerRow}>
        <Text style={styles.tickerText}>
          <Text style={styles.label}>LOW </Text> {LOW}
        </Text>
        <Text style={styles.tickerText}>
          <Text style={styles.label}>HIGH </Text> {HIGH}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  tickerContainer: {
    backgroundColor: '#18262e',
    padding: 9,
    marginTop: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    borderTopWidth: 2,
    borderTopColor: '#000'
  },
  tickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6
  },
  tickerText: {
    color: '#fff'
  },
  largeText: {
    fontSize: 24
  },
  label: {
    color: 'rgba(255, 255, 255, 0.67)'
  }
});

export default Ticker;
