var React = require('react-native');
var {TouchableHighlight, NavigatorIOS, ScrollView, TouchableWithoutFeedback, Image, TextInput, View, Text} = React;

var AccountSelector = require('./accountSelector');
var TransactionList = require('./transactionList');

module.exports = React.createClass({
    render: function(){
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
                <AccountSelector />
                <TransactionList />
            </View>
        )
    }
})
