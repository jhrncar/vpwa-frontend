<template>
  <div class="text-h2 text-dark q-mb-xl">Login</div>

  <q-form class="q-gutter-y-md column" style="width: 50%" @submit="logUser">
    <q-input outlined v-model="nickname" label="Nickname/E-mail" />
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
    <q-btn
      size="lg"
      label="Login"
      type="submit"
      color="primary"
      class="q-mt-md"
    />
  </q-form>

  <q-btn
    no-caps
    flat
    class="lt-md q-mt-sm text-subtitle1 text-dark"
    to="/register"
    ><p>
      Don't have an Account? <span class="text-primary">Register</span>
    </p></q-btn
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      nickname: '',
      password: '',
      isPwd: true,
      rememberMe: 0,
    };
  },
  methods: {
    logUser() {
      void this.$store.dispatch('MainStore/getUser');
      void this.$store.dispatch('MainStore/getChannels');
      void this.$router.push('/');
    },
  },
});
</script>
