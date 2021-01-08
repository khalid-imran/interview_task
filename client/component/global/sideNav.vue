<template>
  <div class="sidenav">
    <div class="sideHeader">
      <h4 class="title"><i class="material-icons">view_week</i><span>Student App</span></h4>
    </div>
    <div class="sideMenu">
      <div class="mainOptions">
        <router-link :to="'/student'"><i class="material-icons ">supervised_user_circle</i><span>Student</span></router-link>
        <router-link :to="'/subjects'"><i class="material-icons">subject</i><span>Subjects</span></router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';
.router-link-active {
  background:  $light-green;
  transition: 500ms;
  opacity: 1;
  color: $theme;
}

.sidenav {
  width: 250px;
  background-color: #ffffff;
  height: 100vh;
  display: inline-block;

  .sideHeader {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 94px;

    .title {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      color: $theme;

      .material-icons {
        font-size: 35px;
        margin-right: 5px;
        color: $light-blue;
      }
    }
  }
  .sideMenu{
    .mainOptions {
      display: block;
      padding: 0 6px;

      a {
        display: flex;
        align-items: center;
        font-family: 'Nunito', sans-serif;
        font-size: 14px;
        font-weight: bold;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 5px;
        text-decoration: none;
        color: $black_theme;
        opacity: .7;
        transition: 500ms;

        .material-icons {
          margin-right: 10px;
          margin-left: 10px;
        }

        &:hover {
          background: $light-green;
          transition: 500ms;
          opacity: 1;
          color: $theme;
        }
      }
    }
  }
}

</style>
