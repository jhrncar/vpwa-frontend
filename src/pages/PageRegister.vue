<template>
  <q-page class="row">
    <div class="side-container bg-white col column">
      <RegisterForm />
    </div>
    <div class="gt-sm side-container bg-primary col column">
      <GoLogin />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterForm from 'src/components/register/RegisterForm.vue';
import GoLogin from 'src/components/register/GoLogin.vue';

export default defineComponent({
  name: 'PageRegister',
  components: {
    RegisterForm,
    GoLogin,
  },
});
</script>

<style scoped>
.side-container {
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 600px;
}
</style>
