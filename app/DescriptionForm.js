import React, { Component  } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            base: null,
            filter: null,
            attrs: null
        };
    }

    static navigationOptions = {
        title: "Description",
    };

    render() {
        const { params } = this.props.navigation.state;

        return (
            <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    placeholder="Base"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Filter"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Attributes"
                    style={styles.input}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.btn}>
                <Text style={{color:'#fff'}}>Submit</Text>
                </TouchableOpacity>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    wrapper: {
        marginTop: 100,
        padding: 30
    },

    input: {
        padding: 5, 
        fontFamily: "Raleway",
        height: 50,
        backgroundColor: '#f0f0f0'
    },

    btn: {
        margin: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        backgroundColor: '#841594',
        borderColor: '#841594',
        borderRadius: 2
    },

});

