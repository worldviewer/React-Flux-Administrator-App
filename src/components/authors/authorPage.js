'use strict';

var React = require('react');
var AuthorApi = require('../../api/authorApi.js');
var AuthorList = require('./authorList.js')

var AuthorPage = React.createClass({
	// Note that getInitialState returns an OBJECT!
	getInitialState: function() {
		return {
			authors: []
		}
	},

	componentDidMount: function() {
		if (this.isMounted()) {
			this.setState({ authors: AuthorApi.getAllAuthors() });
		}
	},

	render: function() {
		return (
			<div>
				<h1>Authors</h1>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorPage;