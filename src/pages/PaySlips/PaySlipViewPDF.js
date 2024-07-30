import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
import NavBar from '../../components/NavBar';

const PaySlipViewPDF = (props) => {

    console.log(props.route.params);

    const {pdfURL, paySlipDate} = props.route.params
    const { goBack } = props.navigation;

    const source = { uri: pdfURL, cache: true };
    // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf' };
    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
    //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};
    return (
        <View style={styles.container}>
            <NavBar
                title={paySlipDate}
                backAction={() => goBack()}
            />
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
        </View>
    )

}

export default PaySlipViewPDF

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        // marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80,
    }
});