var React = require('react-native');
var {NavigatorIOS} = React;

var styles = require('../styles');
var AccountsList = require('./accountsList');

module.exports = React.createClass({
    render: function() {
        return (
            <NavigatorIOS ref="accounts" style={styles.natigator} initialRoute={{component: AccountsList, title: 'Accounts'}} />
        );
    }
})