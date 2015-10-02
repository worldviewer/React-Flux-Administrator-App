"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

// object-assign is a way to glue two objects together, like this ...
// objectAssign({foo: 0}, {bar: 1});
// => {foo: 0, bar: 1}
// aka, Ponyfill: A polyfill that doesn't overwrite the native method,
// makes ES6 functionality work in ES5

var assign = require('object-assign');

var CHANGE_EVENT = 'change';

// Private variable, not exported out of the module, all interactions
// with the data in the store must go through the public AuthorStore
// API functions below _authors
var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllAuthors: function() {
		return _authors;
	},

	getAuthorById: function(id) {
		return _.find(_authors, {id: id});
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_authors = action.initialData.authors;
			AuthorStore.emitChange();
			break;
		case ActionTypes.CREATE_AUTHOR:
			_authors.push(action.author);
			AuthorStore.emitChange();
			break;
		default:
			// no op
	}
});

module.exports = AuthorStore;