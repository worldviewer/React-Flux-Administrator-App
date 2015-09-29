// Defining jQuery globally is necessary because this is where Bootstrap expects to find it
$ = jQuery = require('jquery');

var React = require('react');
var Home = require('./components/homePage.js');
var About = require('./components/about/aboutPage.js');
var Header = require('./components/common/header.js');
var Authors = require('./components/authors/authorPage.js');

var App = React.createClass({
	render: function() {
		var Child;

		switch (this.props.route) {
			case 'about': Child = About; break;
			case 'authors': Child = Authors; break;
			default: Child = Home;
		}

		return (
			<div>
				<Header/>
				<Child/>
			</div>
		);
	}
});

function render() {
	var route = window.location.hash.substr(1);
	React.render(<App route={route} />, document.getElementById('app'));
}

window.addEventListener('hashchange', render);
render();