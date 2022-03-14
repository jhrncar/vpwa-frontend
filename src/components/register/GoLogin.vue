<template>
  <div class="text-h2 text-white q-ma-md">Login</div>
  <div class="text-h5 text-white q-ma-md">Already have an Account? Login</div>
  <q-btn
    size="lg"
    class="bg-white text-dark q-ma-lg"
    style="width: 50%"
    label="Login to an Account"
    to="/login"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GoLogin',
});
</script>
