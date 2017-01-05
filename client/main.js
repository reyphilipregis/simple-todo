import React, { Component } from 'react';
import ReactDOM 			from 'react-dom';
import App 					from './components/App';
import config				from '../imports/config/config';

Meteor.startup( () => {
	ReactDOM.render( <App />, document.querySelector('.render-target') );
} );
