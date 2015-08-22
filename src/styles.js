var React = require('react-native');
var StyleSheet = React.StyleSheet;

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

module.exports = styles;