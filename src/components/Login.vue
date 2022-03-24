<template>
  <div class="text-h2 text-dark q-mb-xl">Login</div>

  <q-form class="q-gutter-y-md column" style="width: 50%" @submit="logUser">
    <q-input
      outlined
      v-model="nickname"
      label="Nickname/E-mail"
      hide-bottom-space
      :error-message="getErrorMessage('nickname')"
      :error="v$.nickname.$error"
    />
    <q-input
      v-model="password"
      outlined
      :type="isPwd ? 'password' : 'text'"
      label="Password"
      hide-bottom-space
      :error-message="getErrorMessage('password')"
      :error="v$.password.$error"
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
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      nickname: '',
      password: '',
      isPwd: true,
      rememberMe: 0,
    };
  },
  validations() {
    return {
      nickname: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30),
      },
    };
  },
  methods: {
    async logUser() {
      this.v$.$touch;
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        //TODO vsetko bude tu, len zatial nech nemusime furt vyplnat
      }
      void this.$store.dispatch('MainStore/getUser');
      void this.$store.dispatch('MainStore/getChannels');
      void this.$router.push('/');
    },
    getErrorMessage(id: string): string {
      let a = undefined;
      try {
        a = this.v$.$errors.reduce((previousValue, currentValue) =>
          currentValue.$property == id ? currentValue : previousValue
        ).$message;
      } catch (error) {}
      if (typeof a == 'string') {
        return a;
      } else {
        return '';
      }
    },
  },
});
</script>
