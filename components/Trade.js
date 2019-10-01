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
  const tableHead = ['TIME', 'AMOUNT', 'PRICE'];
  const tableData = tradeData.map(data => {
    const [id, ...rest] = data;
    const time = new Date(rest[0]);
    rest[0] = time.toTimeString();
    return rest;
  });
  return (
    <Collapse style={{ backgroundColor: '#18262e', marginTop: 16 }}>
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
            <Row data={tableHead} textStyle={{ color: '#fff' }} />
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                style={
                  rowData[1] > 0
                    ? { backgroundColor: 'green' }
                    : { backgroundColor: 'red' }
                }
                textStyle={{ color: '#fff' }}
              />
            ))}
            <Rows textStyle={{ color: '#fff' }} data={tableData} />
          </Table>
        </ScrollView>
      </CollapseBody>
    </Collapse>
  );
}

export default Trade;
