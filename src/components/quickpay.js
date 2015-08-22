var React = require('react-native');
var {NavigatorIOS} = React;

var AccountSelector = require('../components/accountSelector');
var QuickPayForm = require('../components/quickpayForm');

var styles = require('../styles');

module.exports = React.createClass({
    render: function() {
        return (
            <NavigatorIOS ref="quickpay" style={styles.natigator} initialRoute={{component: QuickPayForm, title: 'Quick Pay'}} />
        );
    }
})