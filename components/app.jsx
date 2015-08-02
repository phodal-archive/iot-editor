import React from 'react';
import Router from 'react-router';
import { RouteHandler, Route, Navigation } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { HomePage, NodeMCUPage, DebugPage } from './pages';
let mui = require('material-ui'),
	AppBar = mui.AppBar;
var ThemeManager = require('material-ui/lib/styles/theme-manager')();

ThemeManager.setTheme(ThemeManager.types.LIGHT);

var remote = window.require('remote');
var runtime = remote.require('./core/runtime');

var _routes = runtime.routes.map(function (r) {
	var handler = window.require(r.handler);
	return <Route key={r.route} name={r.route} handler={handler}/>;
});

const App = React.createClass({
	mixins: [Navigation],
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

	render() {
		return (
			<div>
				<AppBar
					title="Menu"
					iconClassNameRight="muidocs-icon-navigation-expand-more" />

				<RouteHandler />
			</div>
		);
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
