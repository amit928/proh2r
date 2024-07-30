import React, { useEffect, useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor, Dimensions, SafeAreaView
} from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';

export default function HappinessReport() {


    const MAINDATA = {
        "yearly": {
            "happy": [
                {
                    "month": "JANUARY",
                    "count": "4"
                },
                {
                    "month": "FEBRUARY",
                    "count": "1"
                },
                {
                    "month": "MARCH",
                    "count": "0"
                },
                {
                    "month": "APRIL",
                    "count": "0"
                },
                {
                    "month": "MAY",
                    "count": "2"
                },
                {
                    "month": "JUNE",
                    "count": "4"
                },
                {
                    "month": "JULY",
                    "count": "0"
                },
                {
                    "month": "AUGUST",
                    "count": "0"
                },
                {
                    "month": "SEPTEMBER",
                    "count": "0"
                },
                {
                    "month": "OCTOBER",
                    "count": "0"
                },
                {
                    "month": "NOVEMBER",
                    "count": "0"
                },
                {
                    "month": "DECEMBER",
                    "count": "0"
                }
            ],
            "sad": [
                {
                    "month": "JANUARY",
                    "count": "0"
                },
                {
                    "month": "FEBRUARY",
                    "count": "0"
                },
                {
                    "month": "MARCH",
                    "count": "0"
                },
                {
                    "month": "APRIL",
                    "count": "0"
                },
                {
                    "month": "MAY",
                    "count": "3"
                },
                {
                    "month": "JUNE",
                    "count": "5"
                },
                {
                    "month": "JULY",
                    "count": "0"
                },
                {
                    "month": "AUGUST",
                    "count": "0"
                },
                {
                    "month": "SEPTEMBER",
                    "count": "0"
                },
                {
                    "month": "OCTOBER",
                    "count": "0"
                },
                {
                    "month": "NOVEMBER",
                    "count": "0"
                },
                {
                    "month": "DECEMBER",
                    "count": "0"
                }
            ],
            "delighted": [
                {
                    "month": "JANUARY",
                    "count": "20"
                },
                {
                    "month": "FEBRUARY",
                    "count": "8"
                },
                {
                    "month": "MARCH",
                    "count": "0"
                },
                {
                    "month": "APRIL",
                    "count": "0"
                },
                {
                    "month": "MAY",
                    "count": "5"
                },
                {
                    "month": "JUNE",
                    "count": "8"
                },
                {
                    "month": "JULY",
                    "count": "0"
                },
                {
                    "month": "AUGUST",
                    "count": "0"
                },
                {
                    "month": "SEPTEMBER",
                    "count": "0"
                },
                {
                    "month": "OCTOBER",
                    "count": "0"
                },
                {
                    "month": "NOVEMBER",
                    "count": "0"
                },
                {
                    "month": "DECEMBER",
                    "count": "0"
                }
            ],
            "angry": [
                {
                    "month": "JANUARY",
                    "count": "0"
                },
                {
                    "month": "FEBRUARY",
                    "count": "2"
                },
                {
                    "month": "MARCH",
                    "count": "0"
                },
                {
                    "month": "APRIL",
                    "count": "0"
                },
                {
                    "month": "MAY",
                    "count": "9"
                },
                {
                    "month": "JUNE",
                    "count": "24"
                },
                {
                    "month": "JULY",
                    "count": "0"
                },
                {
                    "month": "AUGUST",
                    "count": "0"
                },
                {
                    "month": "SEPTEMBER",
                    "count": "0"
                },
                {
                    "month": "OCTOBER",
                    "count": "0"
                },
                {
                    "month": "NOVEMBER",
                    "count": "0"
                },
                {
                    "month": "DECEMBER",
                    "count": "0"
                }
            ]
        },

    }


    const WINDOW_HEIGHT = Dimensions.get('window').height;
    const WINDOW_WIDTH = Dimensions.get('window').width;

    const [legend, setlegend] = useState({
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
    })
    const [data, setdata] = useState({
        dataSets: [{

            values: [
                4,
                1,
                0,
                0,
                2,
                4,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            label: "HAPPY",

            config: {
                drawValues: false,
                colors: [processColor('red')],
            }
        }, {
            values: [
                5,
                0,
                0,
                0,
                3,
                5,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            label: 'SAD',
            config: {
                drawValues: false,
                colors: [processColor('blue')],
            }
        }, {
            values: [
                6,
                2,
                0,
                0,
                9,
                24,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            label: 'ANGRY',
            config: {
                drawValues: false,
                colors: [processColor('green')],
            }
        },
        {
            values: [
                7,
                8,
                0,
                0,
                5,
                8,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            label: 'DELIGHTED',
            config: {
                drawValues: false,
                colors: [processColor('yellow')],
            }
        }],
        config: {
            barWidth: 0.2,
            group: {
                fromX: 0,
                groupSpace: 0.1,
                barSpace: 0.1,
            },
        }
    })
    const [xAxis, setxAxis] = useState({
        valueFormatter: [
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY",
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER"
        ],
        granularityEnabled: true,
        granularity: 1.3,
        axisMaximum: 5,
        axisMinimum: 0,
        centerAxisLabels: true
    })
    const [marker, setmarker] = useState({
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14,
    })

    const [highlights, sethighlights] = useState([])


    useEffect(() => {


        sethighlights([{ x: 1, y: 40 }, { x: 2, y: 50 }])


    }, [])




    function handleSelect(event) {
        let entry = event.nativeEvent
        console.log(entry)

    }


    return (


        <View style={{ flex: 1 }}>

            <View style={styles.container}>
                <BarChart
                    style={styles.chart}
                    xAxis={xAxis}
                    data={data}
                    legend={legend}
                    drawValueAboveBar={false}
                    onSelect={handleSelect}
                    onChange={(event) => console.log(event.nativeEvent)}
                    highlights={highlights}
                    marker={marker}
                />
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});