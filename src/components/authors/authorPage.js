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

	// componentDidMount: function() {
	// 	if (this.isMounted()) {
	// 		this.setState({ authors:  });
	// 	}
	// },

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