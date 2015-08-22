'use strict';

var React = require('react-native');
var NativeModules = require('NativeModules');
var Swiper = require('react-native-swiper')

var {
    requireNativeComponent,
    AppRegistry,
    StyleSheet,
    TabBarIOS,
    Text,
    Image,
    ListView,
    View,
    StatusBarIOS,
    NavigatorIOS,
    ScrollView,
    ActivityIndicatorIOS,
    TouchableHighlight,
    TouchableWithoutFeedback,
    PanResponder,
    LayoutAnimation,
    TextInput
} = React;

var {
    AddressBook
} = NativeModules;


StatusBarIOS.setStyle(0);
var colors = ['#bc6412', '#b63c24', '#c12121', '#423c35', '#e35a2d', '#eb7d17', '#fabb1b', '#ffd900', '#b6c320', '#76b812', '#13a581', '#1281ab', '#344cb4', '#70279b', '#9b277e', '#d51371', '#ccae00', '#c89616'];

var Dimensions = require('Dimensions');

var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;
var SWIPE_RELEASE_POINT = 70;


var Transactions = React.createClass({
    render: function(){
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
                <AccountSelector />
                <TransactionList />
            </View>
        )
    }
})


var selectContactFn;
var QuickPayForm = React.createClass({
    defaultImage: require('image!NoPhoto'),

    componentDidMount: function () {
        selectContactFn = (contact) => {
            var image = {uri: contact.thumbnailPath}
            this.setState({name: contact.firstName + ' ' + contact.lastName, image: (contact.thumbnailPath.length) && image || this.defaultImage})
        }
    },
    getInitialState: function () {
        return {
            name: 'Select Payee',
            image: this.defaultImage
        };
    },

    openContacts: function(){
        this.props.navigator.push({
            title: "Contacts",
            component: Contacts,
            passProps: {},
        });
    },
    render: function(){
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
                <AccountSelector />
                <ScrollView automaticallyAdjustContentInsets={false} style={{flex: 1, padding: 15, borderTopWidth: 0, top: 0, marginTop: 0}}>

                    <TouchableWithoutFeedback onPress={this.openContacts}>
                        <Image
                          style={{width: 140, height: 140, alignSelf: 'center', borderRadius: 70}}
                          source={this.state.image} />
                    </TouchableWithoutFeedback>

                    <Text
                        style={[styles.semibold, {color: '#666', alignSelf: 'center'}]}>
                        {this.state.name}
                    </Text>

                    <TextInput
                        keyboardType="decimal-pad"
                        placeholder="€"
                        style={{height: 50, marginTop: 15, borderColor: '#eee', borderWidth: 1, padding: 15}}
                        onChangeText={(text) => this.setState({input: text})}
                    />

                    <TextInput
                        clearButtonMode="while-editing"
                        placeholder="Description"
                        style={{height: 50, marginTop: 15, borderColor: '#eee', borderWidth: 1, padding: 15}}
                        onChangeText={(text) => this.setState({input: text})}
                    />

                    <TouchableHighlight underlayColor="#00BBFC" style={{backgroundColor: '#009DE0', padding: 15, marginTop: 15, alignItems: 'center'}}>
                        <Text style={[styles.semibold, {color: '#fff'}]}>Submit</Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        )
    }
})

var AccountSelector = React.createClass({

    // _panResponder: {},
    // _index: 0,
    // _length: 2,

    // _handleStartShouldSetPanResponder: function() {
    //     return true;
    // },

    // _handleMoveShouldSetPanResponder: function() {
    //     return true;
    // },

    // _handlePanResponderGrant: function() {},

    // _handlePanResponderMove: function(e, gestureState) {
    //     var gestureDx = gestureState.dx;
    //     var dx = (this._index * SCREEN_WIDTH * -1);
    //     var direction = gestureDx > 0 ? 'right' : 'left';

    //     if(direction == 'right' && this._index === 0 || direction == 'left' && this._index === this._length-1) {
    //         dx += gestureDx * 0.1
    //     } else {

    //         dx += gestureDx
    //     }

    //     this.setState({ dx: dx });
    // },

    // _handlePanResponderEnd: function() {
    //     if (this.state.dx - this._index * SCREEN_WIDTH * -1 > SWIPE_RELEASE_POINT) {
    //         if (this.props.onSwipeRight) {
    //             this.props.onSwipeRight.call();
    //         }
    //         this._index--;
    //     } else if (this.state.dx < -SWIPE_RELEASE_POINT) {
    //         if (this.props.onSwipeLeft) {
    //             this.props.onSwipeLeft.call();
    //         }
    //         this._index++;
    //     }

    //     // alert(this._index)
    //     this._index = Math.max(Math.min(this._index, this._length-1), 0)

    //     LayoutAnimation.configureNext(animations.layout.easeInEaseOut);

    //     // this.refs.mainElement && this.refs.mainElement.setNativeProps({ left: this._index * SCREEN_WIDTH });
    //     this.setState({dx:this._index * SCREEN_WIDTH * -1});

    // },

    // componentWillMount: function() {
    //     this._panResponder = PanResponder.create({
    //         onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
    //         onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    //         onPanResponderGrant: this._handlePanResponderGrant,
    //         onPanResponderMove: this._handlePanResponderMove,
    //         onPanResponderRelease: this._handlePanResponderEnd,
    //         onPanResponderTerminate: this._handlePanResponderEnd,
    //     });
    // },

    // getInitialState: function() {
    //     return { dx: 0 };
    // },

    render: function(){
        return (
            <View style={{marginTop: 64, backgroundColor: '#ECF1F2'}}>

                <Swiper showsButtons={false} showsPagination={false} height={70}>
                    <View style={{flex: 1, width: SCREEN_WIDTH, flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 15, paddingBottom: 15}}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.semibold, {flex: 1}]}>Savings</Text>
                            <Text style={[styles.light, {flex: 1}]}>2810200000</Text>
                        </View>

                        <View>
                            <Text style={[styles.semibold, {fontSize: 18}]}>€ 21.884,00</Text>
                        </View>
                    </View>

                    <View style={{flex: 1, width: SCREEN_WIDTH, flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 15, paddingBottom: 15}}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.semibold, {flex: 1}]}>Other account</Text>
                            <Text style={[styles.light, {flex: 1}]}>2810200000</Text>
                        </View>

                        <View>
                            <Text style={[styles.semibold, {fontSize: 18}]}>€ 8.884,00</Text>
                        </View>
                    </View>
                </Swiper>

                {
                // <View ref={'mainElement'} style={{width: SCREEN_WIDTH * 2, flexDirection: 'row', left: this.state.dx}} {...this._panResponder.panHandlers}>
                //     <View style={{flex: 1, width: SCREEN_WIDTH, flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 15, paddingBottom: 15}}>
                //         <View style={{flex: 1}}>
                //             <Text style={[styles.semibold, {flex: 1}]}>Savings</Text>
                //             <Text style={[styles.light, {flex: 1}]}>2810200000</Text>
                //         </View>

                //         <View>
                //             <Text style={[styles.semibold, {fontSize: 18}]}>€ 21.884,00</Text>
                //         </View>
                //     </View>

                //     <View style={{flex: 1, width: SCREEN_WIDTH, flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 15, paddingBottom: 15}}>
                //         <View style={{flex: 1}}>
                //             <Text style={[styles.semibold, {flex: 1}]}>Other account</Text>
                //             <Text style={[styles.light, {flex: 1}]}>2810200000</Text>
                //         </View>

                //         <View>
                //             <Text style={[styles.semibold, {fontSize: 18}]}>R8 884.00</Text>
                //         </View>
                //     </View>
                // </View>
                }

                <View style={{height: 2, backgroundColor: '#D9E2E6'}} />

            </View>
        )
    }
})

var TransactionList = React.createClass({
    render: function(){
        return (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    contentInset={{bottom:50, top: 1}}
                    style={{flex: 1, borderTopWidth: 0, top: 0, marginTop: 0, justifySelf: 'flex-start'}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
        )
    },

    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(['row 1', 'row 1', 'row 1', 'row 1', 'row 1', 'row 1', 'row 2', 'row 1', 'row 1', 'row 1', 'row 1', 'row 1', 'row 1', 'row 2']),
        };
    },

    selectAccount: function(account) {
        this.props.navigator.push({
            title: "Transactions",
            component: Transactions,
            passProps: {account},
        });
    },

    renderRow: function(rowData){
        return (
            <TouchableHighlight>
                <View>
                    <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
                        <View style={{width: 6, left: 1, backgroundColor: colors[Math.floor(Math.random() * 18)]}} />
                        <View style={{flex: 1, padding: 10}}>
                            <Text style={styles.regular}>Kauai</Text>
                            <Text style={[styles.light, {color: '#666', fontSize: 12}]}>22 Apr</Text>
                        </View>

                        <View style={{padding: 10}}>
                            <Text style={[styles.regular, {fontSize: 16}]}>€ -36,90</Text>
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: '#fff'}} />
                </View>
            </TouchableHighlight>
        )
    }
})

var AccountsList = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(['row 1', 'row 1', 'row 1', 'row 1', 'row 1', 'row 1', 'row 2']),
        };
    },

    selectAccount: function(account) {
        this.props.navigator.push({
            title: "Transactions",
            component: Transactions,
            passProps: {account},
        });
    },

    renderRow: function(rowData){
        return (
            <TouchableHighlight onPress={this.selectAccount}>
                <View>
                    <View style={{flexDirection: 'row', padding: 10, backgroundColor: '#fff'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.semibold}>Savings</Text>
                            <Text style={[styles.light, {color: '#666', fontSize: 12}]}>138581239</Text>
                        </View>

                        <View>
                            <Text style={[styles.semibold]}>€ 21.884,00</Text>
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: '#ddd'}} />
                </View>
            </TouchableHighlight>
        )
    },

    render: function(){
        return (
                <ListView
                    style={[{backgroundColor: '#E5E8E8'}]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
        )
    }
})

var Accounts = React.createClass({
    render: function() {
        return (
            <NavigatorIOS ref="accounts" style={styles.natigator} initialRoute={{component: AccountsList, title: 'Accounts'}} />
        );
    }
})

var QuickPay = React.createClass({
    render: function() {
        return (
            <NavigatorIOS ref="quickpay" style={styles.natigator} initialRoute={{component: QuickPayForm, title: 'Quick Pay'}} />
        );
    }
})

var SnapScan = require('./camera');

var Contacts = React.createClass({

    // getInitialState() {
    //     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    //     return {
    //         dataSource: ds.cloneWithRows([])
    //     };
    // },

    selectContact: function(contact){
        selectContactFn(contact);
        this.props.navigator.pop();
    },

    componentWillMount: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        AddressBook.checkPermission((err, permission) => {
          // AddressBook.PERMISSION_AUTHORIZED || AddressBook.PERMISSION_UNDEFINED || AddressBook.PERMISSION_DENIED
          if(permission === AddressBook.PERMISSION_UNDEFINED){
            AddressBook.requestPermission((err, permission) => {
              AddressBook.getContacts((err, contacts) => {
                  this.setState({
                      dataSource: ds.cloneWithRows(contacts)
                  })
                })
            })
          }
          if(permission === AddressBook.PERMISSION_AUTHORIZED){
            AddressBook.getContacts((err, contacts) => {
                this.setState({
                    dataSource: ds.cloneWithRows(contacts)
                })
              })
          }
          if(permission === AddressBook.PERMISSION_DENIED){
            //handle permission denied
          }
        })
    },


    renderRow(contact) {
        return (
            <TouchableHighlight underlayColor="#ccc" onPress={() => {this.selectContact(contact)}}>
                <View>
                    <View style={{padding: 15}}>
                        <Text>{contact.firstName} {contact.lastName}</Text>
                    </View>
                    <View style={{height: 1, backgroundColor: '#ddd'}} />
                </View>
            </TouchableHighlight>
        )
    },

    render() {
        var view;
        if(this.state) {
            view = <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    pageSize={30}
                    initialListSize={1000}
                    renderSeparator={() => true} />
        } else {
            view = <ActivityIndicatorIOS
                    animating={true}
                    style={styles.natigator}
                    size="large"/>
        }

        return view;
    }
})


var Capitec = React.createClass({
    getInitialState: function() {
        return {
            selectedTab: 'accounts',
            notifCount: 1
        };
    },

    render: function() {
        return (
            <TabBarIOS tintColor="black" barTintColor="#3abeff">
                <TabBarIOS.Item
                    icon={require('image!accountsNormal')}
                    title="Accounts"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    selected={this.state.selectedTab === 'accounts'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'accounts',
                        });
                    }}>
                    <Accounts />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    icon={require('image!quickpayNormal')}
                    title="Quick Pay"
                    selected={this.state.selectedTab === 'quickpay'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'quickpay'
                        });
                    }}>

                    <View style={styles.natigator}>
                        <QuickPay />
                    </View>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    icon={require('image!snapscanNormal')}
                    title="Snap & Scan"
                    selected={this.state.selectedTab === 'snapscan'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'snapscan',
                        });
                    }}>
                    <SnapScan />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    systemIcon="more"
                    selected={this.state.selectedTab === 'more'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'more',
                            presses: this.state.presses + 1
                        });
                    }}>

                    <Swiper style={styles.wrapper} showsButtons={true}>
                      <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                      </View>
                      <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                      </View>
                      <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                      </View>
                    </Swiper>

                </TabBarIOS.Item>
            </TabBarIOS>
        );
    },

});


var styles = StyleSheet.create({
    regular: {
        fontFamily: 'OpenSans'
    },
    semibold: {
        fontFamily: 'OpenSans-Semibold'
    },

    light: {
        fontFamily: 'OpenSans-Light'
    },

    bold: {
        fontFamily: 'OpenSans-Bold'
    },
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    natigator: {
        flex: 1
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },


    wrapper: {
      },
      slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
      },
      slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
      },
      text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
      }

});

var animations = {
  layout: {
    easeInEaseOut: {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.left,
      },
      update: {
        delay: 0,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};


AppRegistry.registerComponent('backbase', () => Capitec);