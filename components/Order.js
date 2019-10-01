import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from 'accordion-collapse-react-native';
import { Table, Row, Rows } from 'react-native-table-component';

function OrderData({ orderData = [] }) {
  const tableHead = ['TOTAL', 'PRICE'];
  const tableData = orderData
    .map(data => {
      const isHigher = data[2];
      const time = data[0];
      return [isHigher, time];
    })
    .filter((data, i) => data[0]);
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
              padding: 9,
              borderBottomWidth: 2,
              borderBottomColor: '#000',
              borderTopWidth: 2,
              borderTopColor: '#000'
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
              Order
            </Text>
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
                    rowData[0] > 0
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

export default OrderData;
