import React from 'react';
import Router from 'react-router';
import { RouteHandler, Route, Navigation } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { HomePage, NodeMCUPage, DebugPage } from './pages';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
var Link = Router.Link;

let { Mixins, Styles } = require('material-ui');

let { Spacing, Colors } = Styles;
let { StyleResizable, StylePropable } = Mixins;
let FileFolder = require('material-ui/lib/svg-icons/file/folder');


let mui = require('material-ui');
let {
    AppCanvas,
    FontIcon,
    FlatButton,
    Avatar,
    SvgIcon
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

    propTypes: {
        menuItems: React.PropTypes.array
    },

    contextTypes: {
        router: React.PropTypes.func
    },
    componentDidMount() {
        var ipc = window.require('ipc');
        ipc.on('transitionTo', function (routeName) {
            //this.transitionTo(routeName, { the: 'params' }, { the: 'query' });
            this.transitionTo(routeName);
        }.bind(this));
    },

    getStyles(){
        let styles = {
            secondaryNav: {
                position: 'absolute',
                margin: '0',
                padding: '0',
                left: '0px',
                top: '0px',
                minHeight: '800px',
                height: '100%',
                borderBottom: 'none',
                display: 'block',
                width: '64px'
            },

            content: {
                marginLeft: '62px',
                borderLeft: 'solid 1px ' + Colors.grey300,
                boxSizing: 'border-box',
                minHeight: '800px',
                height: '100%',
                maxWidth: (Spacing.desktopKeylineIncrement * 14) + 'px'
            }
        };

        return styles;
    },


    render() {
        let styles = this.getStyles();

        return (
            <AppCanvas>
                <div style={styles.content}>
                    <RouteHandler />
                </div>
                <div style={styles.secondaryNav}>
                    <ul className="nav navbar-nav">
                    <li><Link to="home" className="fa fa-home"></Link></li>
                    <li><Link to="debug" className="fa fa-bug"></Link></li>
                    <li><Link to="nodemcu" className="fa fa-diamond"></Link></li>
                    </ul>
                </div>
            </AppCanvas>
        );
    },
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
