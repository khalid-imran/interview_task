import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {subjects} from "./subjects";

export const students = new Mongo.Collection('student')

Meteor.methods({
    // create student
    addStudent(student) {
        return students.insert(student)
    },
    // delete student
    deleteStudent(student) {
        return students.remove({_id: student._id})
    },
    // edit student
    editStudent(student) {
        return students.update(
            {_id: student._id},
            {$set: {name: student.name, email: student.email, phone: student.phone, dob: student.dob,}})

    },
    // get student
    getStudent() {
        return students.find({}, { sort: { _id: -1 }}).fetch();
    },
    // add subject to student
    addSubjectToStudent(data) {
        let rv;
        rv = students.update(
            {_id: data.student._id},
            {$push: {subjectName: data.subject}})

        return rv;
    },
    // add student to subject
    addStudentToSubject(data) {
        let rv;
        rv = subjects.update(
            {_id: data.subjectID},
            {$push: {studentName: data.student.name}})

        return rv;
    }
});
