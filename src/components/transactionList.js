var React = require('react-native');
var {TouchableHighlight, NavigatorIOS, ScrollView, ListView, TouchableWithoutFeedback, Image, TextInput, View, Text} = React;
var styles = require('../styles');

var colors = ['#bc6412', '#b63c24', '#c12121', '#423c35', '#e35a2d', '#eb7d17', '#fabb1b', '#ffd900', '#b6c320', '#76b812', '#13a581', '#1281ab', '#344cb4', '#70279b', '#9b277e', '#d51371', '#ccae00', '#c89616'];

module.exports = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
        return {
            dataSource: ds.cloneWithRows(require('../data/transactions.json')),
        };
    },

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
                            <Text style={styles.regular}>{rowData.description}</Text>
                            <Text style={[styles.light, {color: '#666', fontSize: 12}]}>{rowData.date}</Text>
                        </View>

                        <View style={{padding: 10}}>
                            <Text style={[styles.regular, {fontSize: 16}]}>{rowData.amount}</Text>
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: '#fff'}} />
                </View>
            </TouchableHighlight>
        )
    }
})