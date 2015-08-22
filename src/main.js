var React = require('react-native');
var {TabBarIOS, Image, View, Text, StatusBarIOS} = React;
var Swiper = require('react-native-swiper')
var NativeModules = require('NativeModules');

var styles = require('./styles');

var Accounts = require('./components/accounts');
var QuickPay = require('./components/quickpay');
var SnapScan = require('./components/snapScan');
var Transactions = require('./components/transactions');

StatusBarIOS.setStyle(0);

module.exports = React.createClass({
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
                        <Text style={styles.text}>Slide 1</Text>
                      </View>
                      <View style={styles.slide2}>
                        <Text style={styles.text}>Slide 2</Text>
                      </View>
                      <View style={styles.slide3}>
                        <Text style={styles.text}>Slide 3</Text>
                      </View>
                    </Swiper>

                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

});