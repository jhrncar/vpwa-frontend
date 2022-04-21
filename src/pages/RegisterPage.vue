<template>
  <div class="row">
    <div class="side-container bg-white col column">
      <Register />
    </div>
    <div class="gt-sm side-container bg-primary col column">
      <div class="text-h2 text-white q-ma-md">Login</div>
      <div class="text-h5 text-white q-ma-md">Already have an Account?</div>
      <q-btn
        size="lg"
        class="bg-white text-dark q-ma-lg"
        style="width: 50%"
        label="Login to an Account"
        :to="{ name: 'login' }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Register from 'src/components/Register.vue'

export default defineComponent({
  name: 'RegisterPage',
  components: {
    Register
  }
})
</script>

<style scoped>
.side-container {
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 600px;
}
</style>
