'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
// var AuthorApi = require('../../api/authorApi.js');
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');
var AuthorList = require('./authorList.js')

var AuthorPage = React.createClass({
	// Note that getInitialState returns an OBJECT!
	getInitialState: function() {
		return {
			authors: AuthorStore.getAllAuthors()
		}
	},

	// This page differs from the manageAuthorPage, because it will update without
	// a page reload ...

	componentWillMount: function() {
		AuthorStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AuthorStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ authors: AuthorStore.getAllAuthors() });
	},

	render: function() {
		return (
			<div>
				<h1>Authors</h1>
				<Link to="addAuthor" className="btn btn-default">Create Author</Link>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorPage;