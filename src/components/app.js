/*eslint-disable strict */ // Disabling check because we can't run strict mode.  Need global vars.

var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;

// Defining jQuery globally is necessary because this is where Bootstrap expects to find it
$ = jQuery = require('jquery');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<Header/>
				<div className="container fluid">
					<RouteHandler/>
				</div>
			</div>
		);
	}
});

module.exports = App;