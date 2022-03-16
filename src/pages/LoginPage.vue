<template>
  <div class="row">
    <div class="side-container bg-white col column">
      <Login />
    </div>
    <div class="gt-sm side-container bg-primary col column">
      <div class="text-h2 text-white q-ma-md">Register</div>
      <div class="text-h5 text-white q-ma-md">Don't have an Account?</div>
      <q-btn
        size="lg"
        class="bg-white text-dark q-ma-lg"
        style="width: 50%"
        label="Register an Account"
        to="/register"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from 'components/Login.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    Login,
  },
});
</script>

<style scoped>
.side-container {
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 500px;
}
</style>
