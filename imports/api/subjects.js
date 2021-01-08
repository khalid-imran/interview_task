import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const subjects = new Mongo.Collection('subject')

Meteor.methods({
    // create subject
    addSubject(subject) {
        return subjects.insert(subject)
    },
    // delete subject
    deleteSubject(subject) {
        return subjects.remove({_id: subject._id})
    },
    // edit subject
    editSubject(subject) {
        return subjects.update(
            {_id: subject._id},
            {$set: {name: subject.name}})

    },
    // get subject
    getSubject() {
        return subjects.find({}, { sort: { _id: -1 }}).fetch();
    }
});
