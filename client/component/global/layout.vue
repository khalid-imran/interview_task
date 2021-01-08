<template>
  <div class="layout_body">
    <SideNav></SideNav>
    <div class="main_section">
      <div class="inner-section">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>

import SideNav from "./sideNav";

export default {
  components: {SideNav},
  data() {
    return {}
  },

  methods: {}
}
</script>
<style scoped lang="scss">
@import '../../variables';

.layout_body {
  display: flex;
  width: 100%;
  flex-direction: row;

  .main_section {
    width: calc(100% - 250px);
    background-color: $bg_theme;
    display: block;

    .inner-section {
      padding: 0 10px;
      display: block;
    }
  }
}
</style>
