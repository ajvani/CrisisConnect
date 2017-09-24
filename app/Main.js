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
import { RadioButtons } from 'react-native-radio-buttons'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
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
        issue: null,
        modalVisible: false,
        markers: [],
        dropPin: false,
        modalFormVisible: false, 
      };
    }

    static navigationOptions = {
        title: "Crisis Connect",
    };

    onMapPress(e) {
        if (this.state.dropPin) {
            this.setState({
                markers: [
                    ...this.state.markers,
                    {
                        coordinate: e.nativeEvent.coordinate,
                        key: id++,
                    },
                ],
            });
            this.setState({dropPin: false});
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }

    setModalFormVisible(visible) {
        this.setState({modalFormVisible: visible})
    }

    onPressIssue(e) {
        this.setModalFormVisible(!this.state.modalFormVisible);
        this.setModalVisible(!this.state.modalVisible);
        this.setState({dropPin: true});
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
                    <Text style={styles.title}>Select Your Crisis</Text>
                </Row>

                <Row>
                <Grid>
                <Col>
                <TouchableOpacity 
                    style={styles.issueContainer}
                    onPress={(e) => this.onPressIssue()}
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
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                    <Image
                    source={require('./images/waterdamage.png')}
                    style={styles.issueBtn}
                    />
                </TouchableOpacity>
                </Col>
                </Grid>
                </Row>

                <Row></Row>
            </Grid>
            </View>
                <TouchableHighlight style={styles.exitBtn} onPress={()=>this.setModalVisible(!this.state.modalVisible)}>
                <Text> X </Text></TouchableHighlight>

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
                <Text style={styles.titleForm}>Please Specify Your Emergency</Text>
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
                        color='#000000'
                        coordinate={marker.coordinate}
                        />
                    ))
                }
                </MapView>
            <TouchableOpacity
                style={styles.reportBtn}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
        fontSize: 20,
        fontWeight: 'bold', 
        marginTop: 20,
    },

    issueBtn: {
        zIndex: 3,
        height: 60, 
        width: 60
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