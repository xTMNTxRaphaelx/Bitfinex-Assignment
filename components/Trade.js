import React from 'react';
import { Text, View } from 'react-native';

function Trade({ tradeData = [] }) {
  console.log('is trading', tradeData);
  return (
    <View>
      <Text>Trade</Text>
      {tradeData.map(data => {
        return <Text key={data[0]}>{data}</Text>;
      })}
    </View>
  );
}

export default Trade;
