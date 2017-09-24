import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';

export default class BubbleItem extends Component {
    constructor(props) {
      super(props);
    
      this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                <TouchableOpacity
                    style={styles.touchableBtn}
                    onPress={() => this.props.onPress}
                >
                <Image
                    style={styles.btn}
                    source={this.props.src}
                />
                </TouchableOpacity>
                </View>
                <View>
                <Text style={styles.text}>{this.props.description}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row'
    },

    center: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    touchableBtn: {
        zIndex: 2,
        padding: 4,
        borderRadius: 80, 
        position: 'absolute',
        margin: 10,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        backgroundColor: '#000000'
    },

    btn: {
        zIndex: 3,
        height: 60, 
        width: 60
    }
});