import { Fab } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import { PieChart } from 'react-native-charts-wrapper';

import Nav from '../../components/NavBar';
import FingerprintScanner from 'react-native-fingerprint-scanner';

// let timeCopy = 9
// let intervalID = 0


export default function ChartTesting(props) {

  const [legend, setlegend] = useState({
    enabled: false,
    textSize: 15,
    form: 'CIRCLE',

    horizontalAlignment: "RIGHT",
    verticalAlignment: "CENTER",
    orientation: "VERTICAL",
    wordWrapEnabled: true
  })
  const [data, setdata] = useState({
    dataSets: [{
      values: [{ value: 5, label: 'Rent Information', name: 'Rent Information' },
      { value: 12, label: 'Exemption', name: 'Exemption' },

      { value: 14, label: 'Deduction', name: 'Deduction' },
      { value: 20, label: 'Deduction Under Chaptor VI', name: 'Deduction Under Chaptor VI' },
      { value: 21, label: 'Deduction Under Chaptor VI', name: 'Deduction Under Chaptor VI' },

        // {value: 15, label: 'Desserts'}
      ],
      label: 'Pie dataset',
      config: {
        colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
        valueTextSize: 20,
        valueTextColor: processColor('green'),
        sliceSpace: 5,
        selectionShift: 7,
        // xValuePosition: "OUTSIDE_SLICE",
        // yValuePosition: "OUTSIDE_SLICE",
        valueFormatter: "#.#'%'",
        valueLineColor: processColor('green'),
        valueLinePart1Length: 0.5
      }
    }],
  })
  const [highlights, sethighlights] = useState([{ x: 2 }])
  const [description, setdescription] = useState({
    text: 'This is Pie chart description',
    textSize: 15,
    textColor: processColor('darkgray'),

  })
  const [selectedEntry, setselectedEntry] = useState({})

  const [time, settime] = useState(9)

  const chartData = {
    "employeeTaxDeclarationId": 97,
    "empCode": "009",
    "empName": "Andrew Peter",
    "taxationYear": "2022-2023",
    "total80CDeclarations": 136000,
    "totalSection10Exemptions": 16600,
    "totalChapter6Declarations": 115000,
    "totalPerquisites": 0,
    "totalIncomeLossOnHousingProperty": 0,
    "totalPreviousEmploymentInformation": 0,
    "totalOtherInfo": 0,
    "totalRentDeclaration": 16600
  };

  const { goBack } = props.navigation;

  function handleSelect(event) {
    let entry = event.nativeEvent

    if (Object.keys(event.nativeEvent).length <= 1) {

      return

    }


    if (entry == null) {
      setselectedEntry({})
    } else {
      setselectedEntry(entry.data)
    }

    console.log(event.nativeEvent)
  }

  const timeCopy = useRef(9)
 
  const intervalID = useRef(0)

  function callAutoTimer() {


    intervalID.current = setInterval(() => {

      settime(timeCopy.current - 1)
      timeCopy.current = timeCopy.current - 1
      console.log('s', timeCopy.current)

      if (timeCopy.current <= 0) {

        console.log('Call Function !')
        clearInterval(intervalID.current);

      }

    }, 1000);

  }

  useEffect(() => {

    
      FingerprintScanner
        .isSensorAvailable()
        .then(biometryType => console.log('dddffd', biometryType))
        .catch(error => console.log('fd',error));
    

    callAutoTimer()

    return () => {
      clearInterval(intervalID.current);
      // timeCopy.current = 9
    }
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <Nav
        backHidden={false}
        title={"Chart Testing"}
        backAction={() => goBack()}>
        {' '}
      </Nav>
      <View>
        <Text  allowFontScaling={false} >{'selected: '} {time}</Text>
        <Text  allowFontScaling={false} > {Object.keys(selectedEntry).length >= 1 ? selectedEntry?.name + ": " + selectedEntry?.value : <></>}</Text>
      </View>

      <View style={styles.container}>
        <PieChart
          style={styles.chart}
          logEnabled={true}
          chartBackgroundColor={processColor('white')}
          chartDescription={description}
          data={data}
          legend={legend}
          highlights={highlights}

          extraOffsets={{ left: 5, top: 5, right: 5, bottom: 5 }}

          entryLabelColor={processColor('green')}
          entryLabelTextSize={20}
          entryLabelFontFamily={'HelveticaNeue-Medium'}
          drawEntryLabels={false}

          rotationEnabled={true}
          rotationAngle={45}
          usePercentValues={true}
          styledCenterText={{ text: '', color: processColor('red'), fontFamily: 'HelveticaNeue-Medium', size: 12 }}
          centerTextRadiusPercent={100}
          holeRadius={40}
          holeColor={processColor('#f0f0f0')}
          transparentCircleRadius={20}
          transparentCircleColor={processColor('#f0f0f088')}
          maxAngle={360}
          onSelect={handleSelect}
          onChange={(event) => console.log('event.nativeEvent', event.nativeEvent)}
        />
      </View>
    </View>
  );

}

// export default class ChartTesting extends React.Component {

//   constructor(props) {

//     super(props)

//     this.state = {
//       legend: {
//         enabled: false,
//         textSize: 15,
//         form: 'CIRCLE',

//         horizontalAlignment: "RIGHT",
//         verticalAlignment: "CENTER",
//         orientation: "VERTICAL",
//         wordWrapEnabled: true
//       },
//       data: {
//         dataSets: [{
//           values: [{ value: 115000, label: 'Rent Information', name: 'Rent Information' },
//           { value: 16600, label: 'Exemption', name: 'Exemption' },

//           { value: 136000, label: 'Deduction', name: 'Deduction' },
//           { value: 16600, label: 'Deduction Under Chaptor VI', name: 'Deduction Under Chaptor VI' },

//             // {value: 15, label: 'Desserts'}
//           ],
//           label: 'Pie dataset',
//           config: {
//             colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
//             valueTextSize: 20,
//             valueTextColor: processColor('green'),
//             sliceSpace: 5,
//             selectionShift: 7,
//             // xValuePosition: "OUTSIDE_SLICE",
//             // yValuePosition: "OUTSIDE_SLICE",
//             valueFormatter: "#.#'%'",
//             valueLineColor: processColor('green'),
//             valueLinePart1Length: 0.5
//           }
//         }],
//       },
//       highlights: [{ x: 2 }],
//       description: {
//         text: 'This is Pie chart description',
//         textSize: 15,
//         textColor: processColor('darkgray'),

//       },
//       selectedEntry: ''
//     };
//   }

//   handleSelect(event) {
//     let entry = event.nativeEvent
//     if (entry == null) {
//       this.setState({ ...this.state, selectedEntry: null })
//     } else {
//       this.setState({ ...this.state, selectedEntry: entry.data })
//     }

//     console.log(event.nativeEvent)
//   }



//   render() {

//     const chartData = {
//       "employeeTaxDeclarationId": 97,
//       "empCode": "009",
//       "empName": "Andrew Peter",
//       "taxationYear": "2022-2023",
//       "total80CDeclarations": 136000,
//       "totalSection10Exemptions": 16600,
//       "totalChapter6Declarations": 115000,
//       "totalPerquisites": 0,
//       "totalIncomeLossOnHousingProperty": 0,
//       "totalPreviousEmploymentInformation": 0,
//       "totalOtherInfo": 0,
//       "totalRentDeclaration": 16600
//     };

//     const { goBack } = this.props.navigation;

//     return (
//       <View style={{ flex: 1 }}>
//         <Nav
//           backHidden={false}
//           title={"Chart Testing"}
//           backAction={() => goBack()}>
//           {' '}
//         </Nav>
//         <View>
//           <Text  allowFontScaling={false} >selected:</Text>
//           <Text  allowFontScaling={false} > { this.state.selectedEntry != '' ? this.state.selectedEntry ?.name + ": " + this.state.selectedEntry?.value : null}</Text>
//         </View>

//         <View style={styles.container}>
//           <PieChart
//             style={styles.chart}
//             logEnabled={true}
//             chartBackgroundColor={processColor('white')}
//             chartDescription={this.state.description}
//             data={this.state.data}
//             legend={this.state.legend}
//             highlights={this.state.highlights}

//             extraOffsets={{ left: 5, top: 5, right: 5, bottom: 5 }}

//             entryLabelColor={processColor('green')}
//             entryLabelTextSize={20}
//             entryLabelFontFamily={'HelveticaNeue-Medium'}
//             drawEntryLabels={false}

//             rotationEnabled={true}
//             rotationAngle={45}
//             usePercentValues={true}
//             styledCenterText={{ text: 'Tax Declaration', color: processColor('red'), fontFamily: 'HelveticaNeue-Medium', size: 12 }}
//             centerTextRadiusPercent={100}
//             holeRadius={40}
//             holeColor={processColor('#f0f0f0')}
//             transparentCircleRadius={20}
//             transparentCircleColor={processColor('#f0f0f088')}
//             maxAngle={350}
//             onSelect={this.handleSelect.bind(this)}
//             onChange={(event) => console.log('event.nativeEvent', event.nativeEvent)}
//           />
//         </View>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});