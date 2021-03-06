"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

// For cleaner URL's without hash, use this ...
// Router.run(routes, Router.HistoryLocation, function(Handler) {
Router.run(routes, function(Handler) {
	React.render(<Handler/>, document.getElementById('app'));
});