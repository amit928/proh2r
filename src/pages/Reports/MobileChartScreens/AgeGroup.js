import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';
import MyAttandanceRecordHead from '../../ProAttendance/MyAttandanceRecordHead';
import { ScrollView } from 'react-native-gesture-handler';

export default class AgeGroup extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        dataSets: [{
          values: [{
            y: 5, leavesArr: [
              {
                leaveName: "Casual",
                leaveShortName: "CL",
                leaveCount: '2',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
              },
              {
                leaveName: "Planned",
                leaveShortName: "PL",
                leaveCount: '3',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
                
              },

            ]
          }, {
            y: 7, leavesArr: [
              {
                leaveName: "Casual",
                leaveShortName: "CL",
                leaveCount: '4',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
              },
              {
                leaveName: "Planned",
                leaveShortName: "PL",
                leaveCount: '3',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
              },

            ]
          }, {
            y: 4, leavesArr: [
              {
                leaveName: "Casual",
                leaveShortName: "CL",
                leaveCount: '2',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
              },
              {
                leaveName: "Planned",
                leaveShortName: "PL",
                leaveCount: '2',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
              },

            ]
          }, {
            y: 3, leavesArr: [
              // {
              //   leaveName: "Casual",
              //   leaveShortName: "CL",
              //   leaveCount: '2'
              // },
              {
                leaveName: "Planned",
                leaveShortName: "PL",
                leaveCount: '3',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
              },

            ]
          }, {
            y: 2, leavesArr: [
              {
                leaveName: "Casual",
                leaveShortName: "CL",
                leaveCount: '2',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
              },
              // {
              //   leaveName: "Planned",
              //   leaveShortName: "PL",
              //   leaveCount: '3'
              // },

            ]
          }, {
            y: 4.5, leavesArr: [
              {
                leaveName: "Casual",
                leaveShortName: "CL",
                leaveCount: '2',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
              },
              {
                leaveName: "Planned",
                leaveShortName: "PL",
                leaveCount: '3',
                fromDate: '12-Jun-22',
                toDate: '13-Jun-22'
              },

            ]
          }
            // , { y: 3 }, { y: 3 }, { y: 2 }
          ],
          label: '',
          config: {
            colors: [processColor('#7684FF'), processColor('#7684FF'), processColor('#7684FF'), processColor('#7684FF'), processColor('#7684FF'), processColor('#7684FF')
              // , processColor('#7684FF'), processColor('#7684FF'), processColor('#7684FF')
            ],
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
          }
        }],

        config: {
          barWidth: 0.5,
        },

      },
      highlights: [{ x: 3 }, { x: 6 }],
      xAxis: {
        valueFormatter: ['Jan', 'Feb', 'March', 'April', 'May', 'June'
          // , 'Linus', 'Thanos', 'Mark'
        ],
        granularityEnabled: true,
        granularity: 1,
        drawGridLines: false,
        drawAxisLine: false,

      },
      yAxis: {
        left: { drawGridLines: false, },
        right: { drawGridLines: false, },
      },
      leaveArray: []
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent.data?.leavesArr
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null })
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    }
    
    if (event.nativeEvent.data == undefined) {
      


    }
    
    else{
      this.setState({ leaveArray: event.nativeEvent.data?.leavesArr })
    }

    console.log(event.nativeEvent.data)
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
        {/* <View style={{ height: 80 }}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>

        </View> */}


        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            animation={{ durationX: 2000 }}
            legend={this.state.legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{ x: { min: 5, max: 5 } }}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
            highlights={this.state.highlights}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>

        <View style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
          <MyAttandanceRecordHead first='Leave Name' second='From Date' third='To Date'isLeaves />

          {this.state.leaveArray.map((item, index)=>{

            return <MyAttandanceRecordHead first={item?.leaveName + ' Leave' + ` (${item?.leaveCount}) `} isContent={true} second={item?.fromDate} third={item?.toDate
              } isLeaves/>


          })}

          
          
        </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: 450,
    backgroundColor: '#F5FCFF',
    marginTop: 20
  },
  chart: {
    flex: 1
  }
});