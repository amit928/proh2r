import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, StyleSheet,Dimensions} from "react-native";

const propTypes = {
    mapElement: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string
};

const defaultProps = {
    mapElement: (n) => {},
    onSubmitEditing: () => {},
    onChangeText: () => {},
    value: "",
    placeholder: "",
    maxLength: 200,
    keyboardType: "default",
    secureTextEntry: false,
    label: ""
};

const styles = StyleSheet.create({
  inputBox: {
    width:Dimensions.get('window').width-80,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 5,
    height:40,
    paddingHorizontal:16,
    fontSize:16,
    color:'#1F1412',
    marginVertical: 10,
    borderColor:'#D3D3D3',
    borderWidth:1,
    
  }

});

class InputText extends Component {

    state = {
        value: ""
    }
   
    componentDidMount() {
        this.setState({
            value: this.props.value
        });
    }

    onChangeText = (value) => {
        this.setState({
            value
        }, () => {
            this.props.onChangeText(value);
        })
    }

    render() {
        const {placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing} = this.props;
        return (
            <View>
                <TextInput allowFontScaling={false}
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder={placeholder}
                    placeholderTextColor="#A9A9A9"
                    //selectionColor="#999999"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    returnKeyType="next"
                    value={this.state.value}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={this.onChangeText} />
            </View>
        );
    }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;

export default InputText;