import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryPie, VictoryTooltip, Bar } from "victory-native";

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

const sampleData = [
    { x: "Andrew", y: 35 },
    { x: "Peter", y: 40 },
    { x: "Heather", y: 55 },
    { x: "Jennifer", y: 55 },
    { x: "William", y: 55 },
    { x: "Tony", y: 55 },
    { x: "Steve", y: 55 },
    
]

export default class VictoryTest extends React.Component {
    render() {
        return (
            <>

                <View style={{ height: 50 }}></View>
                {/* <VictoryChart domainPadding={{ x: 40, y: 40 }}>
                    <VictoryBar
                        style={{ data: { fill: "#c43a31" } }}
                        data={sampleData}
                        labels={({ datum }) => `y: ${datum.y}`}
                        labelComponent={<VictoryTooltip />}
                        dataComponent={
                            <Bar
                                tabIndex={0}
                                ariaLabel={({ datum }) => `x: ${datum.x}`}
                            />
                        }
                    />
                </VictoryChart> */}
                <VictoryPie
                animate={{
                    duration: 2000
                }}
                colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                data={[
                    { x: "Andrew", y: 35 },
                    { x: "Peter", y: 40 },
                    { x: "Heather", y: 55 },
                    { x: "Jennifer", y: 55 },
                    { x: "William", y: 55 },
                    { x: "Tony", y: 55 },
                    { x: "Steve", y: 55 },
                    
                    //   { x: "Heather", y: 55 },
                    //   { x: "Heather", y: 55 }

                ]}
            />
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});