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
        <Text style={{ ...styles.tickerText, ...styles.largeText }}>
          BTC/USD
        </Text>
        <Text style={{ ...styles.tickerText, ...styles.largeText }}>{BID}</Text>
      </View>
      <View style={styles.tickerRow}>
        <Text style={styles.tickerText}>
          Vol {(VOLUME || 0).toFixed(1)} BTC
        </Text>
        <Text style={styles.tickerText}>
          {DAILY_CHANGE} ^ ({((DAILY_CHANGE_PERC || 0) * 100).toFixed(1)}%)
        </Text>
      </View>
      <View style={styles.tickerRow}>
        <Text style={styles.tickerText}>LOW {LOW}</Text>
        <Text style={styles.tickerText}>HIGH {HIGH}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  tickerContainer: {
    backgroundColor: '#2b3940',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
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
    fontSize: 18
  }
});

export default Ticker;
