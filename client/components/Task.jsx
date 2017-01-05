import React, { Component } from 'react';
import { Tasks } 			from '../../imports/collections/Tasks';

export default class Task extends Component {
	deleteThisTask() {
		Meteor.call('tasks.remove', this.props.task._id);
	}

	toggleChecked() {
		Meteor.call('tasks.checked', this.props.task._id, this.props.task.checked);
	}

	render() {
		const taskClassName = this.props.task.checked ? 'checked' : '';

		return (
			<li className = { taskClassName }>
				<button className = "delete" onClick = { this.deleteThisTask.bind(this) }>
					&times;
				</button>

				<input
					type = "checkbox"
					readOnly
					checked = { this.props.task.checked }
					onClick = { this.toggleChecked.bind(this) } />

				<span className="text">
		        	<strong>{this.props.task.username}</strong>: {this.props.task.text}
		        </span>
			</li>
		);
	}
}
