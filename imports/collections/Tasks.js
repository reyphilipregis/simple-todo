import { Mongo }  from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
	Meteor.publish( 'tasks', function () {
	  	return Tasks.find({ owner : this.userId });
	} );
}

Meteor.methods( {
	'tasks.insert' : function(text) {
		if (!this.userId) {
	    	throw new Meteor.Error('not-authorized');
	    }

		return Tasks.insert({
			text,
			createdAt : new Date(),
			owner 	  : this.userId,
			username  : Meteor.users.findOne(this.userId).username,
			checked   : false
	    });
	},

	'tasks.remove' : function(id) {
		if (!this.userId) {
	    	throw new Meteor.Error('not-authorized');
	    }

		return Tasks.remove(id);
	},

	'tasks.checked' : function(id, checked) {
		return Tasks.update(id, {
			$set: { checked: !checked },
		});
	}
} );

export const Tasks = new Mongo.Collection('tasks');
