<template>
  <div class="row">
    <div class="side-container bg-white col column flex-center">
      <Login></Login>
    </div>
    <div class="gt-sm side-container bg-primary col column flex-center">
      <LoginRightSide :heading="heading"></LoginRightSide>
    </div>
  </div>
</template>

<script>
import Login from 'components/login/LoginLeftSide.vue';
import LoginRightSide from 'components/login/LoginRightSide.vue';
export default {
  components: {
    Login,
    LoginRightSide,
  },
  data() {
    return {
      heading: 'Register',
    };
  },
};
</script>

<style scoped>
.side-container {
  height: 100vh;
  min-height: 500px;
}
</style>
