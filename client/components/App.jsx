import React, { Component } from 'react';
import Task 				from './Task';
import { createContainer }  from 'meteor/react-meteor-data';
import { Tasks } 			from '../../imports/collections/Tasks';
import AccountsUIWrapper 	from './AccountsUIWrapper';
import { Meteor } from 'meteor/meteor';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hideCompleted: false,
		};
	}

	renderTasks() {
		let filteredTasks = this.props.tasks;
		if (this.state.hideCompleted) {
			filteredTasks = filteredTasks.filter(task => !task.checked);
		}

		return filteredTasks.map( task => {
			return (
				<Task key = { task._id } task = { task } />
			);
		} );
	}

	handleSubmit(event) {
		event.preventDefault();
		
		const text = this.refs.textInput.value;

	    Meteor.call('tasks.insert', text);

	    this.refs.textInput.value = '';
	}

	toggleHideCompleted() {
		this.setState({
			hideCompleted: !this.state.hideCompleted,
		});
	}

	render() {
		return (
			<div className="container">
				<header>
					<label className = "hide-completed">
						<input
						type = "checkbox"
						readOnly
						checked = {this.state.hideCompleted}
						onClick = {this.toggleHideCompleted.bind(this)} />
						Hide Completed Tasks
					</label>

					<AccountsUIWrapper />

					<h1>Todo List ({ this.props.incompleteCount })</h1>
					<form className = "new-task" onSubmit = { this.handleSubmit.bind(this) } >
					<input
						type = "text"
						ref = "textInput"
						placeholder = "Type to add new tasks" />
					</form>
				</header>

				<ul>
					{ this.renderTasks() }
				</ul>
			</div>
		);
	}
}

export default createContainer( () => {
	Meteor.subscribe('tasks');
	
	return { 
		tasks 		    : Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
		incompleteCount : Tasks.find({ checked: { $ne: true } }).count(),
	};

}, App );
