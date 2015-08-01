import React from 'react';
import Router from 'react-router';
import { RouteHandler, Route, Navigation } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { HomePage, NodeMCUPage, DebugPage } from './pages';

var remote = window.require('remote');
var runtime = remote.require('./core/runtime');

var _routes = runtime.routes.map(function (r) {
  var handler = window.require(r.handler);
  return <Route key={r.route} name={r.route} handler={handler}/>;
});

var _navbar = runtime.routes.filter(function (r) {
  return r.navbar;
});

const App = React.createClass({
  mixins: [ Navigation ],

  componentDidMount() {
    var ipc = window.require('ipc');
    ipc.on('transitionTo', function(routeName) {
      //this.transitionTo(routeName, { the: 'params' }, { the: 'query' });
      this.transitionTo(routeName);
    }.bind(this));
  },

  render() {
    var links = _navbar.map(function (r) {
      return (
        <NavItemLink key={r.route} to={r.route}>{r.text}</NavItemLink>
      );
    });
    return (
      <div>
        <Navbar fixedTop fluid>
          <Nav>
            <NavItemLink to="home">
              <i className="fa fa-lg fa-home"></i>
            </NavItemLink>
            <NavItemLink to="nodemcu">
              <i className="fa fa-lg fa-rocket"></i>
            </NavItemLink>
            <NavItemLink to="debug">
              <i className="fa fa-lg fa-bug"></i>
            </NavItemLink>
            {links}
          </Nav>
        </Navbar>

        <RouteHandler />
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="home" path="/" handler={HomePage} />
    <Route name="debug" handler={DebugPage} />
    <Route name="nodemcu" handler={NodeMCUPage} />
    { _routes }
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
