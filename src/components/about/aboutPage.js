"use strict";

var React = require('react');
var Router = require('react-router');

var About = React.createClass({
	statics: {
		willTransitionTo: function(transition, params, query, callback) {
			if (!confirm("Are you sure you want to read this page?")) {
				transition.redirect('home');
			} else {
				callback();
			}
		},

		willTransitionFrom: function(transition, component) {
			if (!confirm("Are you sure you want to leave this page?")) {
				transition.redirect('about');
			}
		}
	},
	render: function() {
		return (
			<div>
				<h1>About</h1>
				<p>This application uses the following technologies:</p>
				<ul>
					<li>React</li>
					<li>React Router</li>
					<li>Flux</li>
					<li>Node</li>
					<li>Gulp</li>
					<li>Browserify</li>
					<li>Bootstrap</li>
				</ul>
			</div>
		);
	}
});

module.exports = About;