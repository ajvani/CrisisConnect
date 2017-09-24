import React, { Component  } from 'react';

import {
    AppRegistry,
    Modal,
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Button,
    StatusBar,
    Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import BubbleItem from './BubbleItem'

import { SearchBar } from 'react-native-elements'
import { BlurView } from 'react-native-blur'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { SegmentedControls } from 'react-native-radio-buttons'

import Fetch from 'fetch'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 42.293014;
const LONGITUDE = -83.716372;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 1;

export default class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        type: null,
        modalVisible: false,
        markers: [],
        dropPin: false,
        modalFormVisible: false, 
        urgency: null, 
        confirmationMessage: false, 
        description: null, 
      };
      
    }

    static navigationOptions = {
        title: "Crisis Connect",
    };

    log(i) {
        console.log(i); 
    }

    setMarkers(value) {
        console.log('RESETTING TO: ' + value); 
        this.setState({markers: value});
    }

    getMarkers(_callBack) {
        fetch('https://crisis-connect.herokuapp.com/getReports')
        .then(function(res) {
            var result = []
            body = JSON.parse(res._bodyInit).body;
            for (var i = 0; i < body.length; i += 1) {
                if (body[i].urgency == 1) {
                    pinC = '#ffff00'
                } else if (body[i].urgency == 2) {
                    pinC = '#ff8c00'
                } else {
                    pinC = '#d80000'
                }

                markerVal = {
                    coordinate: {
                        "latitude": parseFloat(body[i].latitude),
                        "longitude": parseFloat(body[i].longitude)
                    }, 
                    key: "" + body[i].type + ": (" + parseFloat(body[i].latitude) + "," 
                        + parseFloat(body[i].longitude) + ")",
                    pinColor: pinC
                };

                result.push(markerVal);
                _callBack(result); 
            }
        }, function(err) {
            console.log(err);
        }) 
    }

    onMapPress(e) {
        if (this.state.dropPin) {
            if (this.state.urgency == '!') {
                urg = 1;
                pinC = '#ffff00';
            } else if (this.state.urgency == '!!') {
                urg = 2;
                pinC = '#ff8c00';
            } else {
                urg = 3
                pinC = '#d80000';
            }

            this.setState({
                markers: [
                    ...this.state.markers,
                    {
                        coordinate: e.nativeEvent.coordinate,
                        key: "" + this.state.type + ": (" + e.nativeEvent.coordinate['latitude'] 
                            + "," + e.nativeEvent.coordinate['longitude'] + ")",
                        pinColor: pinC
                    },
                ],
            });

            fetch('https://crisis-connect.herokuapp.com/submitReport', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: this.state.type,
                    latitude: e.nativeEvent.coordinate['latitude'].toString(),
                    longitude: e.nativeEvent.coordinate['longitude'].toString(),
                    description: this.state.description,
                    urgency: urg,
                    state: null
                })
            })

            this.setState({dropPin: false, dropPinMessage: false, confirmationMessage: true});
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }

    setModalFormVisible(visible) {
        this.setState({modalFormVisible: visible})
    }

    onPressIssue(e, issueName) {
        this.setState({type: issueName})
        this.setModalFormVisible(true);
        this.setModalVisible(false);
    }

    onPressForm(e) {
        console.log(this.state.description); 
        console.log(this.state.urgency); 
        if (true) { 
            this.setState({dropPin: true, dropPinMessage: true});
            this.setModalVisible(false); 
            this.setModalFormVisible(false); 
        }
        // push to backend here 
    }

    clear(e) {
        this.setModalVisible(false); 
        this.setModalFormVisible(false); 
        this.setState({type: null, urgency: null, description: null, dropPinMessage: false, dropPin: false});
    }

    setSelectedOption(urgency){
        this.setState({
            urgency
        });
    }

    renderMessage(condition, message) {
        if (condition) {
            return (
                <View style={styles.message}>
                    <Text style={{color: '#ffffff'}}>{message}</Text>
                </View>
            );
        } else {
            return; 
        }
    }

    render() {
        

        return (
            <View style={styles.container}>
            <StatusBar
                barStyle='default'
            />

            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                style={styles.modal}
            >

            <View style={styles.container}>
            <Grid>
                <Row>
                <View style={styles.container}>
                    <Text style={styles.titleForm}>Select Your Crisis</Text>
                </View>
                </Row>

                <Row>
                <Grid>
                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue(e, 'Fire')}
                >
                    <Image
                    source={require('./images/fire.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>

                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue(e, 'Broken Traffic Light')}
                >
                    <Image
                    source={require('./images/brokentrafficlight.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>
                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue(e, 'Car Damage')}
                >
                    <Image
                    source={require('./images/cardamage.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>
                </Grid>
                </Row>

                <Row>
                <Grid>
                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue(e, 'Fallen Tree')}
                >
                    <Image
                    source={require('./images/fallentree.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>
                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue(e, 'Gas Leak')}
                >
                    <Image
                    source={require('./images/gasleak.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>
                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue(e, 'House Damage')}
                >
                    <Image
                    source={require('./images/housedamage.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>
                </Grid>
                </Row> 

                <Row>
                <Grid>
                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue(e, 'Obstacles')}
                >
                    <Image
                    source={require('./images/obstacles.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>
                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue(e, 'Plumbing')}
                >
                    <Image
                    source={require('./images/plumbing.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>
                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue(e, 'Water Damage')}
                >
                    <Image
                    source={require('./images/waterdamage.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>
                </Grid>
                </Row>

                <Row>
                    <TouchableHighlight style={styles.exitBtn} onPress={(e)=>this.clear()}>
                    <Text> X </Text></TouchableHighlight> 
                </Row>
            </Grid>
            </View>

            </Modal>

            <Modal
            animationType="slide"
            visible={this.state.modalFormVisible}
            transparent={false}
            style={styles.modal}
            >
            <View style={styles.container}>
                <Grid>
                <Row>
                <View style={styles.container}>
                <Text style={styles.titleForm}>Please Specify Your Emergency</Text>
                </View>
                </Row>
                <Row>
                <View style={styles.container}>
                <Text style={styles.label}>Urgency</Text>
                <SegmentedControls
                    options={ ["!", "!!", "!!!"] }
                    onSelection={ this.setSelectedOption.bind(this) }
                    selectedOption={ this.state.urgency }
                />
                </View>
                </Row>
                <Row>
                <View style={styles.container}>
                <Text style={styles.label}>Short Description</Text>
                <TextInput 
                    style={styles.inputDescription}
                    multiline={true}
                    placeholder="Description"
                    onChangeText={(text) => this.setState({description: text})}
                ></TextInput>
                </View>
                </Row>
                <Row>
                <View style={styles.container}>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={(e) => this.onPressForm(e)}
                >
                <Text style={{color: '#ffffff', fontSize: 18}}>Submit</Text>
                </TouchableOpacity>
                </View>
                </Row>
                <Row>
                <TouchableHighlight style={styles.exitBtn} onPress={(e)=>this.clear()}>
                <Text> X </Text></TouchableHighlight>
                </Row>
                </Grid>
            </View>
            </Modal>

            <TextInput
                placeholder="Search"
                style={styles.input}
                onChangeText={() => this.openSearchModal()}
            />
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={this.state.region}
                    onPress={(e) => this.onMapPress(e)}
                >
                {
                    this.state.markers.map(marker => (
                        <MapView.Marker
                        title={marker.key}
                        key={marker.key}
                        pinColor={marker.pinColor}
                        coordinate={marker.coordinate}
                        />
                    ))
                }
                </MapView>
            {this.renderMessage(this.state.displayPinMessage,'Please drop a pin for this emergency')}
            {this.renderMessage(this.state.confirmationMessage,'Your Crisis has been reported')}
            <TouchableOpacity
                style={styles.reportBtn}
                onPress={() => this.setModalVisible(true)}
            >
            <Image
                style={styles.btn}
                source={require('./images/report.png')}
            />
            </TouchableOpacity>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        padding: 20
    },

    grid: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
    },

    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1
    },

    wrapper: {
        marginTop: 100,
        padding: 30
    },

    input: {
        padding: 8, 
        zIndex: 2,
        margin: 8,
        height: 50,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#f7f7f7'
    },

    reportBtn: {
        zIndex: 2,
        right: 10,
        bottom: 10,
        borderRadius: 60, 
        position: 'absolute',
        margin: 5,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        shadowColor: '#000000',
        shadowOffset: {
            width: 8,
            height: 8
        },
        shadowRadius: 4
    },

    btn: {
        zIndex: 3,
        height: 60, 
        width: 60
    },

    modalExit: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        height: 50,
        width: 50,
        top: 20,
        right: 20
    },

    exitText: {
        color: '#ffffff',
        fontSize: 24,
    },

    exitBtn: {
        borderWidth: 1, 
        borderColor: '#000000', 
        height: 40, 
        width: 40, 
        right: 10,
        bottom: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },

    contentWrap: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0
    },

    modal: {
        backgroundColor: '#727272'
    },

    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 80,
    },

    titleForm: {
        fontSize: 18,
        fontWeight: 'bold', 
        marginTop: 20,
    },

    issueBtn: {
        zIndex: 3,
        height: 60, 
        width: 60
    },

    label: {
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 18
    },

    inputDescription: {
        borderWidth: 1, 
        width: 300, 
        height: 100,
        fontSize: 16, 
        padding: 4
    },

    submitBtn: {
        alignItems: 'center',
        justifyContent: 'center', 
        width: 300, 
        height: 50, 
        backgroundColor: '#ffa20c',
        marginTop: 50
    },

    message: {
        zIndex: 2, 
        padding: 4, 
        borderRadius: 12,
        width: 200, 
        height: 60, 
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 10, 
        left: 10,
        position: 'absolute'
    },

    issueContainer: {
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
    }
});