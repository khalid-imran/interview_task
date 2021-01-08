<template>
  <div>
    <div class="topNavbar">
      <div class="topNav">
        Students
      </div>
    </div>
    <div class="box-wrapper">
      <div class="text-right mb-3">
        <button class="btn btn-primary font-weight-bold btn-sm" @click="openCreateModal()">Add Student</button>
      </div>
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date of birth</th>
          <th>Subjects</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="userData.length > 0" v-for="each in userData" style="vertical-align: middle">
          <td>{{ each.name }}</td>
          <td>{{ each.email }}</td>
          <td>{{ each.phone }}</td>
          <td>{{ each.dob }}</td>
          <td>
            <span v-if="each.subjectName !== undefined"
                  v-for="(eachName, index) in each.subjectName"> {{ eachName }} <span
                v-if="each.subjectName.length != index+1"> ,</span> </span>
          </td>
          <td class="text-right">
            <button class="btn btn-success btn-action" @click="openEditModal(each)" data-toggle="tooltip"
                    data-placement="top" title="Edit"><span class="material-icons">create</span></button>
            <button class="btn btn-warning btn-action" @click="openSubjectModal(each)" data-toggle="tooltip"
                    data-placement="top" title="Add Subject"><span class="material-icons">subject</span></button>
            <button class="btn btn-info btn-action" @click="openDeleteModal(each)"><span class="material-icons"
                                                                                         data-toggle="tooltip"
                                                                                         data-placement="top"
                                                                                         title="Delete">delete</span>
            </button>
          </td>
        </tr>
        <tr v-if="userData.length === 0">
          <td colspan="6">
            <div class="alert-success alert text-center">No Student exist</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add student</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input :class="{'is-invalid': errors.has('name')}" v-validate="'required'" name="name"
                     v-model="userInfo.name" type="text" placeholder="Name" class="form-control">
              <small v-show="errors.has('name')" class="text-danger ">{{
                  errors.first('name')
                }}</small>
            </div>
            <div class="mb-3">
              <input :class="{'is-invalid': errors.has('email')}" v-validate="'required|email'" name="email"
                     v-model="userInfo.email" type="email" placeholder="Email" class="form-control">
              <small v-show="errors.has('email')" class="text-danger ">{{
                  errors.first('email')
                }}</small>
            </div>
            <div class="mb-3">
              <input :class="{'is-invalid': errors.has('phone')}" v-validate="'required'" name="phone"
                     v-model="userInfo.phone" type="text" placeholder="Phone" class="form-control">
              <small v-show="errors.has('phone')" class="text-danger ">{{
                  errors.first('phone')
                }}</small>
            </div>
            <div class="mb-3">
              <flat-pickr
                  :class="{'is-invalid': errors.has('dob')}" v-validate="'required'"
                  v-model="userInfo.dob"
                  class="form-control"
                  placeholder="Date of birth"
                  name="dob">
              </flat-pickr>
              <small v-show="errors.has('dob')" class="text-danger ">{{
                  errors.first('dob')
                }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="createStudent()">Save</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit student</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="eachStudent != null">
            <div class="mb-3">
              <input :class="{'is-invalid': errors.has('name_edit')}" v-validate="'required'" name="name_edit"
                     v-model="eachStudent.name" type="text" placeholder="Name" class="form-control">
              <small v-show="errors.has('name_edit')" class="text-danger ">{{
                  errors.first('name_edit')
                }}</small>
            </div>
            <div class="mb-3">
              <input :class="{'is-invalid': errors.has('email_edit')}" v-validate="'required|email'" name="email_edit"
                     v-model="eachStudent.email" type="email" placeholder="Email" class="form-control">
              <small v-show="errors.has('email_edit')" class="text-danger ">{{
                  errors.first('email_edit')
                }}</small>
            </div>
            <div class="mb-3">
              <input :class="{'is-invalid': errors.has('phone_edit')}" v-validate="'required'" name="phone_edit"
                     v-model="eachStudent.phone" type="text" placeholder="Phone" class="form-control">
              <small v-show="errors.has('phone_edit')" class="text-danger ">{{
                  errors.first('phone_edit')
                }}</small>
            </div>
            <div class="mb-3">
              <flat-pickr
                  :class="{'is-invalid': errors.has('date_of_birth')}" v-validate="'required'"
                  v-model="eachStudent.dob"
                  class="form-control"
                  placeholder="Date of birth"
                  name="date_of_birth">
              </flat-pickr>
              <small v-show="errors.has('date_of_birth')" class="text-danger ">{{
                  errors.first('date_of_birth')
                }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="editStudent()">Update</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="subjectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add subject</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="subjectData.length > 0">
            <div class="mb-3">
              <select class="form-control" id="sub" @change="addSubjectToStudent($event)">
                <option value="" selected>Select Subject</option>
                <option v-for="eachData in subjectData" :value="eachData._id">{{ eachData.name }}</option>
              </select>
            </div>
          </div>
          <div class="modal-body" v-if="subjectData.length === 0">
            <div class="mb-3">
              <div class="alert alert-danger text-center">No new subject for this student</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete student</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-danger font-weight-bold">Do you want to delete this student?</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="deleteStudent()">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor';

export default {
  data() {
    return {
      userInfo: {
        name: '',
        email: '',
        phone: '',
        dob: '',
      },
      userData: [],
      subjectData: [],
      eachStudent: null,
    }
  },
  methods: {
    //open modal for add student
    openCreateModal: function () {
      $('#addModal').modal('show');
    },
    //add student
    createStudent: function () {
      this.$validator.validateAll().then(result => {
        if (result) {
          Meteor.call('checkIfUserExists', this.userInfo,  (error, result) => {
            if (error) {
              console.log(error)
            } else {
              if (result === false) {
                Meteor.call('addStudent', this.userInfo, (error, result) => {
                  if (error) {
                    console.log(error)
                  } else {
                    this.getStudent();
                    this.userInfo.name = '';
                    this.userInfo.email = '';
                    this.userInfo.dob = '';
                    this.userInfo.phone = '';
                    this.$toastr.s("Student added successful");
                    $('#addModal').modal('hide');
                  }
                })
              } else {
                this.$toastr.w("Student exist with this email");
              }
            }
          });
        }
      })
    },
    //open modal for edit subject
    openEditModal: function (data) {
      this.eachStudent = data;
      setTimeout(() => {
        $('#editModal').modal('show');
      }, 500)
    },
    //edit student
    editStudent: function () {
      Meteor.call('editStudent', this.eachStudent, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.getStudent();
          this.$toastr.s("Student updated successful");
          $('#editModal').modal('hide');
        }
      })
    },
    //open modal for delete student
    openDeleteModal: function (data) {
      this.eachStudent = data;
      $('#deleteModal').modal('show');

    },
    //delete student
    deleteStudent: function () {
      Meteor.call('deleteStudent', this.eachStudent, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.getStudent();
          this.$toastr.e("Student deleted successful");
          $('#deleteModal').modal('hide');
          Meteor.call('updateSubjectStudent', this.eachStudent, (error, result) => {
            if (error) {
              console.log(error)
            } else {


            }
          })
        }
      })
    },
    //get student
    getStudent() {
      Meteor.call('getStudent', {}, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.userData = result;
        }
      })
    },
    //get subject
    getSubject() {
      Meteor.call('getSubject', {}, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.subjectData = result;
        }
      })
    },
    //open modal for add subject to student
    openSubjectModal: function (data) {
      //call without function for get data
      Meteor.call('getSubject', {}, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.subjectData = result;
          this.eachStudent = data;
          this.AlreadyHasSub()
        }
      })
      $('#subjectModal').modal('show');
    },
    //add student to subject and subject to student
    addSubjectToStudent: function (e) {
      let subName = $("#sub option:selected").text()
      let subID = $(e.target).val();
      let updateData = {
        student: this.eachStudent,
        subject: subName,
        subjectID: subID,
      }
      if (subID !== '') {
        Meteor.call('addSubjectToStudent', updateData, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            this.getStudent();
            this.$toastr.s("Subject added successful");
            this.subjectData = this.subjectData.filter(item => !subID.includes(item._id));
          }
        })
        Meteor.call('addStudentToSubject', updateData, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            this.getStudent();
          }
        })
      }else {

      }
    },
    AlreadyHasSub: function () {
      if (this.eachStudent.subjectName !== undefined) {
        this.subjectData = this.subjectData.filter(item => !this.eachStudent.subjectName.includes(item.name));
      }
    }
  },
  created() {
    this.getStudent();
    this.getSubject();
  },
  mounted() {

  }
}
</script>

<style lang="scss">
@import '../variables';

.topNavbar {
  display: block;
  padding-top: 10px;

  .topNav {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 15px 10px;
    background-color: $theme-light;
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    justify-content: space-between;
  }
}

.box-wrapper {
  background-color: #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  overflow: auto;
  display: block;
  height: calc(100vh - 80px);

  .table {
    thead {
      tr {
        th {
          color: $ash;
          border-bottom: 1px solid #f2f2f2;
        }
      }
    }
  }

  .btn-action {
    padding: 8px 0;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 5px;
    color: #ffffff;

    span {
      font-size: 18px;
    }
  }
}

.flatpickr-input {
  background-color: #ffffff !important;
}

</style>
