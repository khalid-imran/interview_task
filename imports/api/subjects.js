import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {students} from "./students";

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
    updateStudentSubject(data) {
        let allStd =  students.find({}).fetch()
        allStd.forEach((v) => {
            if (v.subId !== undefined) {
                return students.update(
                    {_id: v._id},
                    {$pull: {subjectName: data.name, subId: data._id}})
            } else {
                return false
            }
        })
    },
    // edit subject
    editSubject(subject) {
        return subjects.update(
            {_id: subject._id},
            {$set: {name: subject.name}})

    },
    // get subject
    getSubject() {
        return subjects.find({}).fetch();
    }
});
