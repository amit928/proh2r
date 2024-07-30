import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor, Dimensions
} from 'react-native';

import { BarChart, PieChart } from 'react-native-charts-wrapper';

class StackedBarChartScreen extends React.Component {
  render() {
    const dataPoints = [50, 80, 70, 60, 90, 85, 70, 75, 80];
    const maxDataPoint = Math.max(...dataPoints);
    const minDataPoint = Math.min(...dataPoints);
    const dataRange = maxDataPoint - minDataPoint;

    return (
      <View style={styles.container}>
        {dataPoints.map((dataPoint, index) => (
          <View
            key={index}
            style={[
              styles.dataPoint,
              {
                height: ((dataPoint - minDataPoint) / dataRange) * 100 + '%',
              },
            ]}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 200,
    paddingHorizontal: 10,
  },
  dataPoint: {
    width: 20,
    backgroundColor: '#4287f5',
    borderRadius: 10,
  },
});







export default StackedBarChartScreen;

