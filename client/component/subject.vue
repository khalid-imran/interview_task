<template>
  <div>
    <div class="topNavbar">
      <div class="topNav">
        Subjects
      </div>
    </div>
    <div class="box-wrapper">
      <div class="text-right mb-3">
        <button class="btn btn-primary font-weight-bold btn-sm" @click="openCreateModal()">Add Subject</button>
      </div>
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Students</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="subjectData.length > 0" v-for="each in subjectData" style="vertical-align: middle">
          <td>{{each.name}}</td>
          <td> <span v-if="each.studentName !== undefined" v-for="(eachName, index) in each.studentName"> {{eachName}} <span v-if="each.studentName.length != index+1"> ,</span> </span></td>
          <td class="text-right">
            <button class="btn btn-success btn-action" @click="openEditModal(each)" data-toggle="tooltip" data-placement="top" title="Edit"><span class="material-icons">create</span></button>
            <button class="btn btn-info btn-action" @click="openDeleteModal(each)"><span class="material-icons" data-toggle="tooltip" data-placement="top" title="Delete">delete</span></button>
          </td>
        </tr>
        <tr  v-if="subjectData.length === 0">
          <td colspan="3">
            <div class="alert-success alert text-center">No Subject exist</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add subject</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input :class="{'is-invalid': errors.has('name')}" v-validate="'required'" name="name" v-model="subject.name" type="text" placeholder="Subject Name" class="form-control">
              <small v-show="errors.has('name')" class="text-danger ">{{
                  errors.first('name')
                }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="createSubject()">Save</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" v-if="eachSubject != null">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >Edit subject</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input :class="{'is-invalid': errors.has('nameEE')}" v-validate="'required'" name="nameEE"  v-model="eachSubject.name" type="text" placeholder="Subject Name" class="form-control">
              <small v-show="errors.has('nameEE')" class="text-danger ">{{
                  errors.first('nameEE')
                }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="editSubject()">Update</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >Delete student</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-danger font-weight-bold">Do you want to delete this subject?</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="deleteSubject()">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subject:{
        name: ''
      },
      subjectData: [],
      eachSubject: null,
    }
  },
  methods: {
    //open modal for add subject
    openCreateModal: function () {
      $('#addModal').modal('show');
    },
    // add subject
    createSubject: function () {
      this.$validator.validateAll().then(result => {
        if (result) {
          Meteor.call('addSubject', this.subject, (error, result) => {
            if (error) {
              console.log(error)
            } else {
              this.getSubject();
              this.$toastr.s("Subject added successful");
              $('#addModal').modal('hide');
            }
          })
        }
      })
    },
    //open modal for edit subject
    openEditModal: function (data) {
      this.eachSubject = data;
      setTimeout(() => {
        $('#editModal').modal('show');
      }, 500)
    },
    // edit subject
    editSubject: function () {
      Meteor.call('editSubject', this.eachSubject, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.getSubject();
          this.$toastr.s("Subject edited successful");
          $('#editModal').modal('hide');
        }
      })
    },
    //open modal for delete subject
    openDeleteModal: function (data) {
      this.eachSubject = data;
      $('#deleteModal').modal('show');
    },
    // delete subject
    deleteSubject: function () {
      Meteor.call('deleteSubject', this.eachSubject, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.getSubject();
          this.$toastr.e("Subject deleted successful");
          $('#deleteModal').modal('hide');
          Meteor.call('updateStudentSubject', this.eachSubject, (error, result) => {
            if (error) {
              console.log(error)
            } else {


            }
          })
        }
      })
    },
    // get subject
    getSubject() {
      Meteor.call('getSubject', {}, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.subjectData = result;
        }
      })
    }
  },
  created() {
    this.getSubject();
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
.box-wrapper{
  background-color: #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  overflow: auto;
  display: block;
  height: calc(100vh - 80px);
  .btn-action{
    padding: 8px 0;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 5px;
    color: #ffffff;
    span{
      font-size: 18px;
    }
  }
  .table{
    thead{
      tr{
        th{
          color:$ash;
          border-bottom: 1px solid #f2f2f2;
        }
      }
    }
  }
}


</style>
