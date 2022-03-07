<template>
  <div class="text-h2 text-dark q-mb-xl">Login</div>

  <q-form class="q-gutter-md column" style="width: 50%">
    <q-input outlined v-model="nickname" label="Nickname/e-mail" />
    <q-input
      v-model="password"
      outlined
      :type="isPwd ? 'password' : 'text'"
      label="Password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-checkbox
      class="text-dark"
      v-model="rememberMe"
      left-label
      label="Remember me"
      color="primary"
      :model-value="false"
    />
  </q-form>
  <q-btn
    size="lg"
    label="Login"
    type="submit"
    color="primary"
    class="q-mt-md"
    style="width: 50%"
  />
  <a href="/register" style="text-decoration: none">
    <p class="lt-md text-dark q-mt-md cursor-pointer">
      Don't have an Account? Create one!
    </p>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginLeftSide',
  data() {
    return {
      nickname: '',
      password: '',
      isPwd: 1,
      rememberMe: 0,
    };
  },
});
</script>
