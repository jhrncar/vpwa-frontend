<template>
  <div class="text-h2 text-white q-ma-md">Register</div>
  <div class="text-h5 text-white q-ma-md">
    Don't have an Account? Register one!
  </div>
  <q-btn
    size="lg"
    class="bg-white text-dark q-ma-lg"
    style="width: 50%"
    label="Register an Account"
    to="/register"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginRightSide',
});
</script>
