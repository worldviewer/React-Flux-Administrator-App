"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;

// object-assign is a way to glue two objects together, like this ...
// objectAssign({foo: 0}, {bar: 1});
// => {foo: 0, bar: 1}
// aka, Ponyfill: A polyfill that doesn't overwrite the native method,
// makes ES6 functionality work in ES5

var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		
	}
});

module.exports = AuthorStore;