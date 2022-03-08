<template>
  <q-page class="row">
    <div class="side-container bg-white col column">
      <LoginForm></LoginForm>
    </div>
    <div class="gt-sm side-container bg-primary col column">
      <GoRegister></GoRegister>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from 'src/components/login/LoginForm.vue';
import GoRegister from 'src/components/login/GoRegister.vue';

export default defineComponent({
  name: 'PageLogin',
  components: {
    LoginForm,
    GoRegister,
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
