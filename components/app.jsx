import React from 'react';
import Router from 'react-router';
import { RouteHandler, Route, Navigation } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { HomePage, NodeMCUPage, DebugPage } from './pages';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

let { Mixins, Styles } = require('material-ui');

let { Spacing, Colors } = Styles;
let { StyleResizable, StylePropable } = Mixins;

let mui = require('material-ui');
let {
    AppCanvas,
    }
    = mui;

var ThemeManager = require('material-ui/lib/styles/theme-manager')();

ThemeManager.setTheme(ThemeManager.types.LIGHT);

var remote = window.require('remote');
var runtime = remote.require('./core/runtime');

var _routes = runtime.routes.map(function (r) {
    var handler = window.require(r.handler);
    return <Route key={r.route} name={r.route} handler={handler}/>;
});


let menuItems = [
    { route: 'appbar', text: 'AppBar'},
    { route: 'avatars', text: 'Avatars'},
    { route: 'buttons', text: 'Buttons'},
    { route: 'cards', text: 'Cards'},
    { route: 'date-picker', text: 'Date Picker'}
];

const App = React.createClass({
    mixins: [Navigation, StyleResizable, StylePropable],
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    componentDidMount() {
        var ipc = window.require('ipc');
        ipc.on('transitionTo', function (routeName) {
            //this.transitionTo(routeName, { the: 'params' }, { the: 'query' });
            this.transitionTo(routeName);
        }.bind(this));
    },

    getStyles(){
        let subNavWidth = Spacing.desktopKeylineIncrement * 3 + 'px';
        let styles = {
            root: {
                paddingTop: '0px'
            },
            rootWhenMedium: {
                position: 'relative'
            },
            secondaryNav: {
                overflow: 'hidden'
            },
            content: {
                boxSizing: 'border-box',
            },
            secondaryNavWhenMedium: {
                borderTop: 'none',
                position: 'absolute',
                width: subNavWidth
            },
            contentWhenMedium: {
                marginLeft: subNavWidth,
                borderLeft: 'solid 1px ' + Colors.grey300,
                minHeight: '800px'
            }
        };

        if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
            this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
            styles.root = this.mergeStyles(styles.root, styles.rootWhenMedium);
            styles.secondaryNav = this.mergeStyles(styles.secondaryNav, styles.secondaryNavWhenMedium);
            styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
        }

        return styles;
    },


    render() {
        let styles = this.getStyles();

        return (
            <div style={styles.root}>
                <div style={styles.content}>
                    <RouteHandler />
                </div>
                <div style={styles.secondaryNav}>
                    <Menu
                        ref="menuItems"
                        zDepth={0}
                        menuItems={menuItems}
                        selectedIndex={this._getSelectedIndex()}
                        onItemTap={this._onMenuItemClick} />
                </div>
            </div>
        );
    },

    _getSelectedIndex() {
        let currentItem;

        for (let i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
        }
    },

    _onMenuItemClick(e, index, item) {
        this.context.router.transitionTo(item.route);
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="home" path="/" handler={HomePage}/>
        <Route name="debug" handler={DebugPage}/>
        <Route name="nodemcu" handler={NodeMCUPage}/>
        { _routes }
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});
