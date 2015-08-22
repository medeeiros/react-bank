var React = require('react-native');
var {TouchableHighlight, ListView, View, Text} = React;

var styles = require('../styles');
var Transactions = require('./transactions');

module.exports = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
        return {
            dataSource: ds.cloneWithRows(require('../data/accounts.json')),
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
                            <Text style={styles.semibold}>{rowData.alias}</Text>
                            <Text style={[styles.light, {color: '#666', fontSize: 12}]}>{rowData.accountNumber}</Text>
                        </View>

                        <View>
                            <Text style={[styles.semibold]}>{rowData.balance}</Text>
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