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
  console.log('is trading', tradeData);
  const tableHead = ['TIME', 'AMOUNT', 'PRICE'];
  const tableData = tradeData.map(data => {
    const [id, ...rest] = data;
    return rest;
  });
  return (
    <Collapse>
      <CollapseHeader>
        <View>
          <Text>Trade</Text>
        </View>
      </CollapseHeader>
      <CollapseBody>
        <ScrollView>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} />
            <Rows data={tableData} />
          </Table>
        </ScrollView>
      </CollapseBody>
    </Collapse>
  );
}

export default Trade;
