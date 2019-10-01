import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from 'accordion-collapse-react-native';
import { Table, Row, Rows } from 'react-native-table-component';

function Trade({ tradeData = [] }) {
  const tableHead = ['', 'TIME', 'AMOUNT', 'PRICE'];
  // const tableData = tradeData
  //   .map(data => {
  //     const [id, ...rest] = data;
  //     const time = new Date(data[1]);
  //     if (!time) return;
  //     data[0] = data[2] > 0 ? '^' : 'v';
  //     data[1] = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  //     return data;
  //   })
  //   .filter((data, i) => data.length && i < 20);
  const tableData = tradeData.map(data => {
    const isHigher = data[2] > 0 ? '^' : 'v';
    const time = new Date(data[1]);
    const date = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    const amount = data[2].toFixed(4);
    const price = data[3].toFixed(1);
    return [isHigher, date, amount, price];
  });
  return (
    <View style={{ flex: 1 }}>
      <Collapse
        isCollapsed={true}
        style={{ backgroundColor: '#18262e', marginTop: 16 }}
      >
        <CollapseHeader>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 6
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 21,
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}
            >
              Trade
            </Text>
            <Text style={{ color: '#fff', fontSize: 21 }}>Market</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <ScrollView>
            <Table
              borderStyle={{
                borderColor: '#fff'
              }}
            >
              <Row
                data={tableHead}
                textStyle={{ color: '#fff', textAlign: 'center' }}
              />
              {(tableData || []).map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  style={
                    rowData[2] > 0
                      ? { backgroundColor: 'rgba(157, 194, 74, 0.25)' }
                      : { backgroundColor: 'rgba(225, 86, 86, 0.15)' }
                  }
                  textStyle={{ color: '#fff', textAlign: 'center' }}
                />
              ))}
            </Table>
          </ScrollView>
        </CollapseBody>
      </Collapse>
    </View>
  );
}

export default Trade;
